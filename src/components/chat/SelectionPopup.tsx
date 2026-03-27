import { useConversationStore } from '@/store/conversation-store';
import { GitBranch, MessageSquare } from 'lucide-react';

export function SelectionPopup() {
  const { selectionPopup, hideSelectionPopup, activeConversationId, createBranch, addMessage, getMessagesUpTo } = useConversationStore();

  if (!selectionPopup.visible || !activeConversationId) return null;

  const handleBranch = () => {
    const branchId = createBranch(activeConversationId, {
      sourceMessageId: selectionPopup.messageId,
      selectedText: selectionPopup.selectedText,
      startOffset: selectionPopup.startOffset,
      endOffset: selectionPopup.endOffset,
    });

    // Add the selected text as system context in the branch
    addMessage({
      conversationId: activeConversationId,
      branchId,
      role: 'system',
      content: `The user wants to explore the following text from the conversation in more depth:\n\n"${selectionPopup.selectedText}"\n\nProvide detailed follow-up on this specific topic.`,
    });

    window.getSelection()?.removeAllRanges();
    hideSelectionPopup();
  };

  const handleFollowUp = () => {
    handleBranch();
  };

  return (
    <div
      className="fixed z-50 animate-popup-in"
      style={{ left: selectionPopup.x, top: selectionPopup.y, transform: 'translate(-50%, -100%)' }}
    >
      <div className="flex gap-1 surface-3 border border-border rounded-xl p-1.5 shadow-xl shadow-black/40">
        <button
          onClick={handleFollowUp}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/10 text-foreground transition-colors whitespace-nowrap"
        >
          <MessageSquare size={12} className="text-primary" />
          Follow up
        </button>
        <div className="w-px bg-border" />
        <button
          onClick={handleBranch}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/10 text-foreground transition-colors whitespace-nowrap"
        >
          <GitBranch size={12} className="text-primary" />
          Fork
        </button>
      </div>
    </div>
  );
}
