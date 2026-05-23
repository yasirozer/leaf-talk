import { Provider, Message } from '@/types';

interface StreamCallbacks {
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

const PROVIDER_URLS: Record<Provider, string> = {
  openai: 'https://api.openai.com/v1/chat/completions',
  anthropic: 'https://api.anthropic.com/v1/messages',
  google: 'https://generativelanguage.googleapis.com/v1beta/models/',
  custom: '',
};

function messagesToOpenAIFormat(messages: Message[]) {
  return messages.map(m => ({ role: m.role, content: m.content }));
}

function messagesToAnthropicFormat(messages: Message[]) {
  const system = messages.find(m => m.role === 'system')?.content;
  const msgs = messages.filter(m => m.role !== 'system').map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));
  return { system, messages: msgs };
}

function messagesToGoogleFormat(messages: Message[]) {
  const system = messages.find(m => m.role === 'system')?.content;
  const contents = messages.filter(m => m.role !== 'system').map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  return { system, contents };
}

async function streamOpenAI(apiKey: string, model: string, messages: Message[], cb: StreamCallbacks, signal?: AbortSignal) {
  const resp = await fetch(PROVIDER_URLS.openai, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages: messagesToOpenAIFormat(messages), stream: true }),
    signal,
  });
  if (!resp.ok) { cb.onError(`OpenAI error: ${resp.status}`); return; }
  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith('data: ')) continue;
      const json = line.slice(6);
      if (json === '[DONE]') { cb.onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) cb.onToken(content);
      } catch {}
    }
  }
  cb.onDone();
}

async function streamAnthropic(apiKey: string, model: string, messages: Message[], cb: StreamCallbacks, signal?: AbortSignal) {
  const { system, messages: msgs } = messagesToAnthropicFormat(messages);
  const body: any = { model, messages: msgs, max_tokens: 4096, stream: true };
  if (system) body.system = system;
  const resp = await fetch(PROVIDER_URLS.anthropic, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(body),
    signal,
  });
  if (!resp.ok) { cb.onError(`Anthropic error: ${resp.status}`); return; }
  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith('data: ')) continue;
      try {
        const parsed = JSON.parse(line.slice(6));
        if (parsed.type === 'content_block_delta') {
          cb.onToken(parsed.delta?.text || '');
        }
        if (parsed.type === 'message_stop') { cb.onDone(); return; }
      } catch {}
    }
  }
  cb.onDone();
}

async function streamGoogle(apiKey: string, model: string, messages: Message[], cb: StreamCallbacks, signal?: AbortSignal) {
  const { system, contents } = messagesToGoogleFormat(messages);
  const body: any = { contents, generationConfig: { maxOutputTokens: 4096 } };
  if (system) body.systemInstruction = { parts: [{ text: system }] };
  const url = `${PROVIDER_URLS.google}${model}:streamGenerateContent?alt=sse`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify(body),
    signal,
  });
  if (!resp.ok) { cb.onError(`Google error: ${resp.status}`); return; }
  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith('data: ')) continue;
      try {
        const parsed = JSON.parse(line.slice(6));
        const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) cb.onToken(text);
      } catch {}
    }
  }
  cb.onDone();
}

export async function streamCompletion(
  provider: Provider,
  apiKey: string,
  model: string,
  messages: Message[],
  callbacks: StreamCallbacks,
  signal?: AbortSignal,
  customBaseUrl?: string
) {
  try {
    switch (provider) {
      case 'openai': await streamOpenAI(apiKey, model, messages, callbacks, signal); break;
      case 'anthropic': await streamAnthropic(apiKey, model, messages, callbacks, signal); break;
      case 'google': await streamGoogle(apiKey, model, messages, callbacks, signal); break;
      case 'custom': {
        if (!customBaseUrl) { callbacks.onError('Custom base URL is required'); return; }
        await streamCustomOpenAI(apiKey, model, messages, callbacks, signal, customBaseUrl);
        break;
      }
    }
  } catch (e: any) {
    if (e.name !== 'AbortError') callbacks.onError(e.message);
  }
}

async function streamCustomOpenAI(apiKey: string, model: string, messages: Message[], cb: StreamCallbacks, signal?: AbortSignal, baseUrl?: string) {
  const url = baseUrl!.replace(/\/+$/, '') + '/chat/completions';
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages: messagesToOpenAIFormat(messages), stream: true }),
    signal,
  });
  if (!resp.ok) { cb.onError(`API error: ${resp.status}`); return; }
  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith('data: ')) continue;
      const json = line.slice(6);
      if (json === '[DONE]') { cb.onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) cb.onToken(content);
      } catch {}
    }
  }
  cb.onDone();
}
