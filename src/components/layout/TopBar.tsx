import { useConversationStore } from '@/store/conversation-store';
import { MessageSquare, Network, Settings } from 'lucide-react';
import { PROVIDER_LABELS } from '@/types';

export function TopBar() {
  const store = useConversationStore();
  const { provider, model } = store.providerSettings;

  const tabs = [
    { id: 'chat' as const, icon: MessageSquare, label: 'Chat' },
    { id: 'tree' as const, icon: Network, label: 'Tree' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' },
  ];

  return (
    <div
      className="flex h-11 shrink-0 items-center justify-between border-b px-4"
      style={{
        background: 'var(--surface-container-lowest)',
        borderColor: 'var(--outline-ghost)',
      }}
    >
      <div className="flex items-center gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => store.setActiveView(tab.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              store.activeView === tab.id ? 'tab-active' : 'tab-inactive'
            }`}
          >
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] text-dim">
        <span className="surface-2 text-on-void max-w-[200px] truncate rounded-md border border-border px-2 py-1 font-mono text-[10px]">
          {PROVIDER_LABELS[provider]} · {model || 'no model'}
        </span>
      </div>
    </div>
  );
}
