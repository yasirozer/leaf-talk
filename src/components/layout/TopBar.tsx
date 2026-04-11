import { useConversationStore } from '@/store/conversation-store';
import { MessageSquare, Network, Settings, Power, Share2, MoreVertical } from 'lucide-react';
import { PROVIDER_LABELS } from '@/types';

export function TopBar() {
  const store = useConversationStore();
  const { provider, model } = store.providerSettings;
  const conv = store.conversations.find(c => c.id === store.activeConversationId);

  const tabs = [
    { id: 'chat' as const, label: 'TERMINAL' },
    { id: 'tree' as const, label: 'NETWORK' },
    { id: 'settings' as const, label: 'ENCRYPTION' },
  ];

  return (
    <div className="h-11 border-b border-border flex items-center justify-between px-4 surface-1">
      <div className="flex items-center gap-0.5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => store.setActiveView(tab.id)}
            className={`px-4 py-2 text-[11px] font-medium tracking-widest uppercase transition-colors ${
              store.activeView === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-dim hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {conv && (
          <span className="text-[9px] text-dim font-mono tracking-wider uppercase">
            SESSION_ID: {conv.id.slice(0, 8).toUpperCase()}
          </span>
        )}
        <div className="flex items-center gap-1.5 text-[9px] text-dim font-mono">
          <span className="px-2 py-1 rounded border border-border surface-2 tracking-wider uppercase">
            {PROVIDER_LABELS[provider]} · {model || 'NO_MODEL'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:surface-2 transition-colors">
            <Settings size={13} className="text-dim" />
          </button>
          <button className="p-1.5 rounded hover:surface-2 transition-colors">
            <Power size={13} className="text-dim" />
          </button>
        </div>
      </div>
    </div>
  );
}