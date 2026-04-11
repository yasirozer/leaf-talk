import { useConversationStore } from '@/store/conversation-store';
import { Plus, Star, Trash2, MessageSquare, GitBranch, BarChart3, FolderOpen, Archive, LogOut } from 'lucide-react';

export function Sidebar() {
  const store = useConversationStore();
  const conversations = store.conversations;

  const navItems = [
    { icon: MessageSquare, label: 'CONVERSATIONS', active: true },
    { icon: GitBranch, label: 'BRANCH_LOGS', active: false },
    { icon: BarChart3, label: 'SYSTEM_STATS', active: false },
    { icon: FolderOpen, label: 'RESOURCES', active: false },
    { icon: Archive, label: 'ARCHIVE', active: false },
  ];

  return (
    <div className="w-60 border-r border-border flex flex-col h-full bg-sidebar scanline">
      {/* Identity */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded border border-primary/40 bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">◈</span>
          </div>
          <div>
            <h1 className="text-[11px] font-bold text-primary tracking-wider uppercase">NEURAL_NET_ALPHA</h1>
            <p className="text-[9px] text-dim tracking-wider uppercase">STATUS: ENCRYPTED</p>
          </div>
        </div>
        <button
          onClick={() => store.createConversation()}
          className="w-full py-2.5 rounded border border-primary bg-primary/10 text-primary text-[11px] font-bold tracking-widest uppercase hover:bg-primary/20 transition-colors"
        >
          NEW_SESSION
        </button>
      </div>

      {/* Nav items */}
      <div className="py-2 px-2 space-y-0.5">
        {navItems.map(item => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-colors ${
              item.active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/20'
                : 'text-dim hover:text-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            <item.icon size={14} className={item.active ? 'text-primary' : 'text-dim'} />
            <span className="text-[11px] font-medium tracking-wider uppercase">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-1 space-y-0.5">
        {conversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => store.setActiveConversation(conv.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left group transition-colors ${
              store.activeConversationId === conv.id
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-dim hover:text-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            <span className="text-primary/50 text-[10px]">▸</span>
            <span className="flex-1 text-[11px] truncate font-mono">{conv.title}</span>
            <div className="hidden group-hover:flex gap-0.5">
              <button
                onClick={e => { e.stopPropagation(); store.toggleFavorite(conv.id); }}
                className="p-0.5 rounded hover:bg-sidebar-accent"
              >
                <Star size={10} className={conv.isFavorite ? 'text-primary fill-primary' : 'text-dim'} />
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
          <p className="text-[9px] text-dim text-center py-6 tracking-wider uppercase">NO ACTIVE SESSIONS</p>
        )}
      </div>

      {/* Bottom */}
      <div className="p-3 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded text-dim hover:text-foreground hover:bg-sidebar-accent/50 transition-colors">
          <LogOut size={14} />
          <span className="text-[11px] font-medium tracking-wider uppercase">LOGOUT</span>
        </button>
      </div>
    </div>
  );
}