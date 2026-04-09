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
      <div className="flex-1 flex flex-col items-center justify-center gap-5" onClick={handleDismissPopup}>
        <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center">
          <MessageSquarePlus size={32} className="text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Branchable AI</h2>
          <p className="text-sm text-dim max-w-sm leading-relaxed">Start a conversation, then select text in any assistant reply to create a branch and explore deeper.</p>
        </div>
        <button
          onClick={() => store.createConversation()}
          className="mt-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity glow-green"
        >
          New conversation
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0" onClick={handleDismissPopup}>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-3xl mx-auto py-6">
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
