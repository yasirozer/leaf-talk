import { useConversationStore } from '@/store/conversation-store';
import { Provider, PROVIDER_MODELS, PROVIDER_LABELS } from '@/types';
import { Key, Cpu, Globe, Tag, ExternalLink } from 'lucide-react';

export function SettingsView() {
  const store = useConversationStore();
  const { provider, apiKey, model, customBaseUrl, customModelId } = store.providerSettings;

  const isCustom = provider === 'custom';

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-lg mx-auto py-10 px-4 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Settings</h2>
          <p className="text-sm text-dim font-medium">Configure your AI provider and API key.</p>
        </div>

        {/* Provider */}
        <div className="p-5 bg-secondary/50 border border-border space-y-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Cpu size={14} className="text-primary" /> Provider
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PROVIDER_LABELS) as Provider[]).map(p => (
              <button
                key={p}
                onClick={() => store.setProviderSettings({
                  provider: p,
                  model: PROVIDER_MODELS[p][0] || '',
                })}
                className={`px-4 py-2.5 text-xs font-semibold border transition-all ${
                  provider === p
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-dim hover:text-foreground'
                }`}
              >
                {PROVIDER_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Base URL */}
        {isCustom && (
          <div className="p-5 bg-secondary/50 border border-border space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Globe size={14} className="text-primary" /> Base URL
            </label>
            <input
              type="url"
              value={customBaseUrl || ''}
              onChange={e => store.setProviderSettings({ customBaseUrl: e.target.value })}
              placeholder="https://openrouter.ai/api/v1"
              className="w-full px-4 py-3 bg-card border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-dim"
            />
            <p className="text-[10px] text-dim">Enter the base URL of any OpenAI-compatible API (e.g. OpenRouter, Together, Ollama).</p>
          </div>
        )}

        {/* Custom Model ID */}
        {isCustom && (
          <div className="p-5 bg-secondary/50 border border-border space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Tag size={14} className="text-primary" /> Model ID
            </label>
            <input
              type="text"
              value={customModelId || ''}
              onChange={e => store.setProviderSettings({ customModelId: e.target.value, model: e.target.value })}
              placeholder="openai/gpt-4o or anthropic/claude-3.5-sonnet"
              className="w-full px-4 py-3 bg-card border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-dim"
            />

            <a
              href="https://openrouter.ai/models"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline"
            >
              <ExternalLink size={11} /> Browse all models on OpenRouter
            </a>

            <p className="text-[10px] text-dim">The model identifier as required by your provider.</p>
          </div>
        )}

        {/* Model (for built-in providers) */}
        {!isCustom && (
          <div className="p-5 bg-secondary/50 border border-border space-y-4">
            <label className="text-sm font-medium">Model</label>
            <div className="flex flex-wrap gap-2">
              {PROVIDER_MODELS[provider].map(m => (
                <button
                  key={m}
                  onClick={() => store.setProviderSettings({ model: m })}
                  className={`px-4 py-2 text-xs font-mono font-semibold border transition-all ${
                    model === m
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-dim hover:text-foreground'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* API Key */}
        <div className="p-5 bg-secondary/50 border border-border space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Key size={14} className="text-primary" /> API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={e => store.setProviderSettings({ apiKey: e.target.value })}
            placeholder={isCustom ? 'Enter your API key' : `Enter your ${PROVIDER_LABELS[provider]} API key`}
            className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-dim"
          />
          <p className="text-[10px] text-dim">Your API key is stored locally in your browser and never sent to our servers.</p>
        </div>

        {!apiKey && (
          <div className="p-4 border border-accent/30 bg-accent/5">
            <p className="text-xs text-accent">⚠ Add an API key to start chatting with AI models.</p>
          </div>
        )}

        {isCustom && customBaseUrl && (
          <div className="p-4 border border-primary/30 bg-primary/5">
            <p className="text-xs text-primary">✓ Using OpenAI-compatible endpoint. Works with OpenRouter, Together AI, Ollama, LiteLLM, and more.</p>
          </div>
        )}
      </div>
    </div>
  );
}
