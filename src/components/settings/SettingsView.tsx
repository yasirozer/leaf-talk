import { useConversationStore } from '@/store/conversation-store';
import { Provider, PROVIDER_MODELS, PROVIDER_LABELS } from '@/types';
import { Key, Cpu } from 'lucide-react';

export function SettingsView() {
  const store = useConversationStore();
  const { provider, apiKey, model } = store.providerSettings;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-lg mx-auto py-10 px-4 space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-1">Settings</h2>
          <p className="text-sm text-dim">Configure your AI provider and API key.</p>
        </div>

        {/* Provider */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Cpu size={14} className="text-primary" /> Provider
          </label>
          <div className="flex gap-2">
            {(Object.keys(PROVIDER_LABELS) as Provider[]).map(p => (
              <button
                key={p}
                onClick={() => store.setProviderSettings({ provider: p, model: PROVIDER_MODELS[p][0] })}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                  provider === p
                    ? 'border-primary bg-primary/10 text-primary glow-green'
                    : 'border-border surface-2 text-dim hover:text-foreground'
                }`}
              >
                {PROVIDER_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Model */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Model</label>
          <div className="flex flex-wrap gap-2">
            {PROVIDER_MODELS[provider].map(m => (
              <button
                key={m}
                onClick={() => store.setProviderSettings({ model: m })}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  model === m
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border surface-2 text-dim hover:text-foreground'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* API Key */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Key size={14} className="text-primary" /> API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={e => store.setProviderSettings({ apiKey: e.target.value })}
            placeholder={`Enter your ${PROVIDER_LABELS[provider]} API key`}
            className="w-full px-3 py-2.5 rounded-lg surface-2 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-dim"
          />
          <p className="text-[10px] text-dim">Your API key is stored locally in your browser and never sent to our servers.</p>
        </div>

        {!apiKey && (
          <div className="p-3 rounded-lg border border-accent/30 bg-accent/5">
            <p className="text-xs text-accent">⚠ Add an API key to start chatting with AI models.</p>
          </div>
        )}
      </div>
    </div>
  );
}
