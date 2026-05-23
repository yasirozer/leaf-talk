import { useConversationStore } from '@/store/conversation-store';
import { Plus, Star, Trash2, MessageSquare } from 'lucide-react';

export function Sidebar() {
  const store = useConversationStore();
  const conversations = store.conversations;

  return (
    <div
      className="flex h-full w-60 shrink-0 flex-col rounded-br-[28px]"
      style={{ background: 'var(--surface-container-low)' }}
    >
      {/* Header — same height as TopBar for aligned divider */}
      <div
        className="flex h-11 shrink-0 items-center justify-between border-b px-3"
        style={{ borderColor: 'var(--outline-ghost)' }}
      >
        <span className="lt-label text-dim">Conversations</span>
        <button
          onClick={() => store.createConversation()}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          <Plus size={14} className="text-sidebar-foreground" />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
        {conversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => store.setActiveConversation(conv.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left group transition-colors ${
              store.activeConversationId === conv.id
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            <MessageSquare size={13} className="flex-shrink-0 opacity-50" />
            <span className="flex-1 text-xs truncate">{conv.title}</span>
            <div className="hidden group-hover:flex gap-0.5">
              <button
                onClick={e => { e.stopPropagation(); store.toggleFavorite(conv.id); }}
                className="p-0.5 rounded hover:bg-sidebar-accent"
              >
                <Star size={10} className={conv.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-dim'} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); store.deleteConversation(conv.id); }}
                className="p-0.5 rounded hover:bg-sidebar-accent"
              >
                <Trash2 size={10} className="text-dim hover:text-accent" />
              </button>
            </div>
          </button>
        ))}
        {conversations.length === 0 && (
          <p className="text-[10px] text-dim text-center py-6">No conversations yet</p>
        )}
      </div>
    </div>
  );
}
