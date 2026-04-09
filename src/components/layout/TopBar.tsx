import { useConversationStore } from '@/store/conversation-store';
import { MessageSquare, Network, Settings } from 'lucide-react';
import { PROVIDER_LABELS } from '@/types';

export function TopBar() {
  const store = useConversationStore();
  const { provider, model } = store.providerSettings;

  const tabs = [
    { id: 'chat' as const, icon: MessageSquare, label: 'Chat' },
    { id: 'tree' as const, icon: Network, label: 'Tree' },
    { id: 'settings' as const, icon: Settings, label: 'Config' },
  ];

  return (
    <div className="h-11 surface-2 border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => store.setActiveView(tab.id)}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase transition-all border-b-2 ${
              store.activeView === tab.id
                ? 'border-b-primary text-neon bg-primary/5'
                : 'border-b-transparent text-dim hover:text-foreground'
            }`}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] text-dim">
        <span className="px-3 py-1.5 border border-border font-mono tracking-wider truncate max-w-[200px]">
          {PROVIDER_LABELS[provider]} · {model || 'no model'}
        </span>
      </div>
    </div>
  );
}
