import { useConversationStore } from '@/store/conversation-store';
import { Plus, Star, Trash2, MessageSquare } from 'lucide-react';

export function Sidebar() {
  const store = useConversationStore();
  const conversations = store.conversations;

  return (
    <div className="w-60 flex flex-col h-full surface-1 border-r border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-neon">■ Branches</span>
        <button
          onClick={() => store.createConversation()}
          className="p-2 hover:bg-secondary transition-colors border border-border hover:border-primary/40"
        >
          <Plus size={14} className="text-neon" />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-2 space-y-0.5 pt-2">
        {conversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => store.setActiveConversation(conv.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left group transition-all border-l-2 ${
              store.activeConversationId === conv.id
                ? 'border-l-primary bg-secondary text-neon'
                : 'border-l-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
            }`}
          >
            <MessageSquare size={12} className="flex-shrink-0 opacity-40" />
            <span className="flex-1 text-xs font-medium tracking-wide truncate">{conv.title}</span>
            <div className="hidden group-hover:flex gap-1">
              <button
                onClick={e => { e.stopPropagation(); store.toggleFavorite(conv.id); }}
                className="p-1 hover:bg-muted transition-colors"
              >
                <Star size={10} className={conv.isFavorite ? 'text-primary fill-primary' : 'text-dim'} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); store.deleteConversation(conv.id); }}
                className="p-1 hover:bg-muted transition-colors"
              >
                <Trash2 size={10} className="text-dim hover:text-destructive" />
              </button>
            </div>
          </button>
        ))}
        {conversations.length === 0 && (
          <p className="text-[10px] text-dim text-center py-8 tracking-wide uppercase">No sessions active</p>
        )}
      </div>
    </div>
  );
}
