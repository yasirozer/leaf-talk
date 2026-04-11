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
      <div className="flex-1 flex flex-col items-center justify-center gap-4 scanline" onClick={handleDismissPopup}>
        <div className="w-16 h-16 rounded border border-primary/30 bg-primary/5 flex items-center justify-center">
          <span className="text-primary text-2xl">◈</span>
        </div>
        <div className="text-center">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-2">CIPHER_PROTOCOL_V1.0</h2>
          <p className="text-[11px] text-dim max-w-sm tracking-wide uppercase leading-relaxed">
            Initialize a new session. Select text in any response to create operational branches.
          </p>
        </div>
        <button
          onClick={() => store.createConversation()}
          className="mt-2 px-6 py-2.5 rounded border border-primary bg-primary/10 text-primary text-[11px] font-bold tracking-widest uppercase hover:bg-primary/20 transition-colors glow-green"
        >
          INITIALIZE_SESSION
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 scanline" onClick={handleDismissPopup}>
      {/* Channel header */}
      <div className="px-4 py-2 border-b border-border flex items-center gap-3">
        <span className="text-primary text-[10px]">■</span>
        <span className="text-[10px] text-primary font-bold tracking-widest uppercase">
          ENCRYPTED CHANNEL [{convId.slice(0, 8).toUpperCase()}]
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-3xl mx-auto py-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-dim text-[11px] tracking-wider uppercase">AWAITING INPUT // STANDBY</p>
            </div>
          )}
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} branches={branches} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <SelectionPopup />

      {/* Terminal label */}
      <div className="px-4 py-1">
        <span className="text-[9px] text-dim tracking-widest uppercase font-mono">
          INPUT_TERMINAL_V1.0.4 // STANDBY
        </span>
      </div>
      <ChatInput onSend={sendMessage} onStop={stopStream} isLoading={isLoading} />
    </div>
  );
}