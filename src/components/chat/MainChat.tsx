import { useEffect, useRef } from 'react';
import { useConversationStore } from '@/store/conversation-store';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { SelectionPopup } from './SelectionPopup';
import { useChatStream } from '@/hooks/use-chat-stream';
import { MessageSquarePlus } from 'lucide-react';

export function MainChat() {
  const store = useConversationStore();
  const { sendMessage, stopStream, isLoading } = useChatStream();
  const bottomRef = useRef<HTMLDivElement>(null);
  const convId = store.activeConversationId;

  const messages = convId ? store.getConversationMessages(convId) : [];
  const branches = convId ? store.getConversationBranches(convId) : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, messages[messages.length - 1]?.content]);

  const handleDismissPopup = () => {
    if (store.selectionPopup.visible) {
      store.hideSelectionPopup();
    }
  };

  if (!convId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4" onClick={handleDismissPopup}>
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl surface-2"
          style={{ color: 'var(--primary-bright)' }}
        >
          <MessageSquarePlus size={28} />
        </div>
        <div className="text-center">
          <h2 className="lt-title mb-1 text-lg">Leaf Talk</h2>
          <p className="text-sm text-dim max-w-sm">Start a conversation, then select text in any assistant reply to create a branch and explore deeper.</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            store.createConversation();
          }}
          className="mt-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          style={{
            background: 'linear-gradient(135deg, #c74e00 0%, #9f3d00 100%)',
            boxShadow: '0 8px 20px rgba(159, 61, 0, 0.3)',
          }}
        >
          New conversation
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0" onClick={handleDismissPopup}>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-3xl mx-auto py-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-dim text-sm">Send a message to begin.</p>
            </div>
          )}
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} branches={branches} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <SelectionPopup />
      <ChatInput onSend={sendMessage} onStop={stopStream} isLoading={isLoading} />
    </div>
  );
}
