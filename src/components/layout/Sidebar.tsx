import { useConversationStore } from '@/store/conversation-store';
import { Plus, Star, Trash2, MessageSquare } from 'lucide-react';

export function Sidebar() {
  const store = useConversationStore();
  const conversations = store.conversations;

  return (
    <div className="w-60 flex flex-col h-full surface-1 border-r border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide uppercase text-dim">Conversations</span>
        <button
          onClick={() => store.createConversation()}
          className="p-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <Plus size={14} className="text-muted-foreground" />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-2 space-y-1">
        {conversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => store.setActiveConversation(conv.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left group transition-all ${
              store.activeConversationId === conv.id
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
            }`}
          >
            <MessageSquare size={13} className="flex-shrink-0 opacity-40" />
            <span className="flex-1 text-xs truncate">{conv.title}</span>
            <div className="hidden group-hover:flex gap-1">
              <button
                onClick={e => { e.stopPropagation(); store.toggleFavorite(conv.id); }}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
              >
                <Star size={10} className={conv.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-dim'} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); store.deleteConversation(conv.id); }}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
              >
                <Trash2 size={10} className="text-dim hover:text-accent" />
              </button>
            </div>
          </button>
        ))}
        {conversations.length === 0 && (
          <p className="text-[10px] text-dim text-center py-8">No conversations yet</p>
        )}
      </div>
    </div>
  );
}
