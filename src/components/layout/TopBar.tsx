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
    <div className="h-12 surface-2 border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => store.setActiveView(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
              store.activeView === tab.id
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-dim hover:text-foreground'
            }`}
          >
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] text-dim">
        <span className="px-3 py-1.5 bg-secondary border border-border font-mono truncate max-w-[200px]">
          {PROVIDER_LABELS[provider]} · {model || 'no model'}
        </span>
      </div>
    </div>
  );
}
