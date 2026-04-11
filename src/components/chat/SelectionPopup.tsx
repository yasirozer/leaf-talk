import { useConversationStore } from '@/store/conversation-store';
import { GitBranch, MessageSquare } from 'lucide-react';

export function SelectionPopup() {
  const { selectionPopup, hideSelectionPopup, activeConversationId, createBranch, addMessage } = useConversationStore();

  if (!selectionPopup.visible || !activeConversationId) return null;

  const handleBranch = () => {
    const branchId = createBranch(activeConversationId, {
      sourceMessageId: selectionPopup.messageId,
      selectedText: selectionPopup.selectedText,
      startOffset: selectionPopup.startOffset,
      endOffset: selectionPopup.endOffset,
    });

    addMessage({
      conversationId: activeConversationId,
      branchId,
      role: 'system',
      content: `The user wants to explore the following text from the conversation in more depth:\n\n"${selectionPopup.selectedText}"\n\nProvide detailed follow-up on this specific topic.`,
    });

    window.getSelection()?.removeAllRanges();
    hideSelectionPopup();
  };

  return (
    <div
      className="fixed z-50 animate-popup-in"
      style={{ left: selectionPopup.x, top: selectionPopup.y, transform: 'translate(-50%, -100%)' }}
    >
      <div className="flex gap-0.5 surface-3 border border-primary/30 rounded p-1 shadow-xl shadow-black/60 glow-green">
        <button
          onClick={handleBranch}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-primary/10 text-primary transition-colors whitespace-nowrap"
        >
          <MessageSquare size={11} />
          FOLLOW_UP
        </button>
        <div className="w-px bg-primary/20" />
        <button
          onClick={handleBranch}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-primary/10 text-primary transition-colors whitespace-nowrap"
        >
          <GitBranch size={11} />
          FORK
        </button>
      </div>
    </div>
  );
}