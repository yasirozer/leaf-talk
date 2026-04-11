import { useConversationStore } from '@/store/conversation-store';
import { Provider, PROVIDER_MODELS, PROVIDER_LABELS } from '@/types';
import { Key, Cpu, Globe, Tag, ExternalLink } from 'lucide-react';

export function SettingsView() {
  const store = useConversationStore();
  const { provider, apiKey, model, customBaseUrl, customModelId } = store.providerSettings;

  const isCustom = provider === 'custom';

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scanline">
      <div className="max-w-lg mx-auto py-10 px-4 space-y-8">
        <div>
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-1">ENCRYPTION_SETTINGS</h2>
          <p className="text-[11px] text-dim tracking-wider uppercase">Configure AI provider and authentication keys.</p>
        </div>

        {/* Provider */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-foreground">
            <Cpu size={13} className="text-primary" /> PROVIDER
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PROVIDER_LABELS) as Provider[]).map(p => (
              <button
                key={p}
                onClick={() => store.setProviderSettings({
                  provider: p,
                  model: PROVIDER_MODELS[p][0] || '',
                })}
                className={`px-4 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase border transition-all ${
                  provider === p
                    ? 'border-primary bg-primary/10 text-primary glow-green'
                    : 'border-border surface-2 text-dim hover:text-foreground hover:border-primary/30'
                }`}
              >
                {PROVIDER_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Base URL */}
        {isCustom && (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-foreground">
              <Globe size={13} className="text-primary" /> BASE_URL
            </label>
            <input
              type="url"
              value={customBaseUrl || ''}
              onChange={e => store.setProviderSettings({ customBaseUrl: e.target.value })}
              placeholder="https://openrouter.ai/api/v1"
              className="w-full px-3 py-2.5 rounded surface-2 border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-dim"
            />
            <p className="text-[9px] text-dim tracking-wider uppercase">OpenAI-compatible API endpoint (OpenRouter, Together, Ollama).</p>
          </div>
        )}

        {/* Custom Model ID */}
        {isCustom && (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-foreground">
              <Tag size={13} className="text-primary" /> MODEL_ID
            </label>
            <input
              type="text"
              value={customModelId || ''}
              onChange={e => store.setProviderSettings({ customModelId: e.target.value, model: e.target.value })}
              placeholder="openai/gpt-4o or anthropic/claude-3.5-sonnet"
              className="w-full px-3 py-2.5 rounded surface-2 border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-dim"
            />

            <a
              href="https://openrouter.ai/models"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] text-primary hover:underline tracking-wider uppercase font-bold"
            >
              <ExternalLink size={11} /> BROWSE_MODELS // OPENROUTER
            </a>

            <p className="text-[9px] text-dim tracking-wider uppercase">Model identifier as required by your provider.</p>
          </div>
        )}

        {/* Model (for built-in providers) */}
        {!isCustom && (
          <div className="space-y-3">
            <label className="text-[11px] font-bold tracking-widest uppercase text-foreground">MODEL</label>
            <div className="flex flex-wrap gap-2">
              {PROVIDER_MODELS[provider].map(m => (
                <button
                  key={m}
                  onClick={() => store.setProviderSettings({ model: m })}
                  className={`px-3 py-2 rounded text-[10px] font-mono tracking-wider border transition-all ${
                    model === m
                      ? 'border-primary bg-primary/10 text-primary glow-green'
                      : 'border-border surface-2 text-dim hover:text-foreground hover:border-primary/30'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* API Key */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-foreground">
            <Key size={13} className="text-primary" /> API_KEY
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={e => store.setProviderSettings({ apiKey: e.target.value })}
            placeholder={isCustom ? 'Enter authentication key' : `Enter ${PROVIDER_LABELS[provider]} key`}
            className="w-full px-3 py-2.5 rounded surface-2 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-dim font-mono"
          />
          <p className="text-[9px] text-dim tracking-wider uppercase">Stored locally. Never transmitted to external servers.</p>
        </div>

        {!apiKey && (
          <div className="p-3 rounded border border-accent/30 bg-accent/5">
            <p className="text-[10px] text-accent tracking-wider uppercase font-bold">⚠ AUTHENTICATION KEY REQUIRED TO INITIALIZE AI MODELS.</p>
          </div>
        )}

        {isCustom && customBaseUrl && (
          <div className="p-3 rounded border border-primary/30 bg-primary/5">
            <p className="text-[10px] text-primary tracking-wider uppercase font-bold">✓ ENDPOINT CONFIGURED. COMPATIBLE: OPENROUTER, TOGETHER AI, OLLAMA, LITELLM.</p>
          </div>
        )}
      </div>
    </div>
  );
}