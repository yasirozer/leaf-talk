import { useConversationStore } from '@/store/conversation-store';
import { X, GitBranch, Quote, Maximize2, Minimize2 } from 'lucide-react';
import { MessageBubble } from '../chat/MessageBubble';
import { ChatInput } from '../chat/ChatInput';
import { useChatStream } from '@/hooks/use-chat-stream';
import { useEffect, useRef } from 'react';

export function BranchPanel() {
  const store = useConversationStore();
  const branch = store.branches.find(b => b.id === store.activeBranchId);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { sendMessage, stopStream, isLoading } = useChatStream(branch?.id);

  const branchMessages = branch ? store.getBranchMessages(branch.id) : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [branchMessages.length, branchMessages[branchMessages.length - 1]?.content]);

  if (!branch || !store.branchPanelOpen) return null;

  const handleSend = (content: string) => {
    if (!branch) return;
    const contextMessages = store.getMessagesUpTo(branch.conversationId, branch.anchor.sourceMessageId);
    sendMessage(content, contextMessages);
  };

  return (
    <div className="h-full flex flex-col surface-1">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center gap-2">
        <GitBranch size={14} className="text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate">{branch.title}</h3>
          <span className="text-[10px] text-dim">{new Date(branch.createdAt).toLocaleString()}</span>
        </div>
        <button
          type="button"
          onClick={store.toggleBranchFullscreen}
          title={store.branchPanelFullscreen ? 'Exit fullscreen (Ctrl/Cmd+B)' : 'Fullscreen (Ctrl/Cmd+B)'}
          className="rounded-lg p-1.5 text-dim transition-colors hover:bg-[var(--surface-container)] hover:text-[var(--on-surface)]"
        >
          {store.branchPanelFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
        <button
          type="button"
          onClick={store.closeBranchPanel}
          className="rounded-lg p-1.5 text-dim transition-colors hover:bg-[var(--surface-container)] hover:text-[var(--on-surface)]"
        >
          <X size={14} />
        </button>
      </div>

      {/* Source quote */}
      <div className="px-3 py-2 border-b border-border bg-primary/5">
        <div className="flex items-start gap-2">
          <Quote size={10} className="text-primary mt-1 flex-shrink-0" />
          <p className="text-xs text-subtle italic line-clamp-3">"{branch.anchor.selectedText}"</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {branchMessages.filter(m => m.role !== 'system').map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {branchMessages.filter(m => m.role !== 'system').length === 0 && (
          <div className="flex items-center justify-center py-12">
            <p className="text-xs text-dim">Ask a follow-up about this branch.</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} onStop={stopStream} isLoading={isLoading} placeholder="Continue this branch..." />
    </div>
  );
}
