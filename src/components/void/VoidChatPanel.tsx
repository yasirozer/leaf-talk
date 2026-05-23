import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { useConversationStore } from '@/store/conversation-store';
import { useChatStream } from '@/hooks/use-chat-stream';
import { SelectionPopup } from '@/components/chat/SelectionPopup';
import { CodeBlock } from '@/components/chat/CodeBlock';
import { Message } from '@/types';
import { VoidIcons, voidIconBtn } from './void-icons';

function VoidAssistantBubble({ message }: { message: Message }) {
  return (
    <div className="void-fade-in" style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'var(--inverse-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--void-accent-soft)',
          flexShrink: 0,
          marginTop: 6,
        }}
      >
        <VoidIcons.Rocket />
      </div>
      <div style={{ position: 'relative', flex: 1, maxWidth: 620 }}>
        <svg width="14" height="20" viewBox="0 0 14 20" style={{ position: 'absolute', top: 4, left: -8 }}>
          <path d="M 14 0 L 14 20 L 4 8 Z" fill="var(--inverse-surface)" />
        </svg>
        <div
          style={{
            background: 'var(--inverse-surface)',
            color: 'var(--surface)',
            borderRadius: '24px 24px 24px 8px',
            padding: '22px 28px',
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.65,
            position: 'relative',
          }}
        >
          {message.isStreaming && !message.content ? (
            <span style={{ opacity: 0.7 }}>Branching this thought into a parallel orbit…</span>
          ) : (
            <div className="prose-chat">
              <ReactMarkdown
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');
                    if (match && codeString.includes('\n')) {
                      return <CodeBlock language={match[1]}>{codeString}</CodeBlock>;
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content || ''}
              </ReactMarkdown>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(243, 165, 117, 0.18)',
              color: 'var(--void-accent-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <VoidIcons.Info size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

function VoidUserBubble({ message }: { message: Message }) {
  const meta = message.editedAt ? 'EDITED' : 'DELIVERED';
  return (
    <div className="void-fade-in" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, justifyContent: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flex: 1, maxWidth: 620 }}>
        <div
          style={{
            background: 'var(--surface-container-low)',
            color: 'var(--on-surface)',
            borderRadius: '24px 24px 8px 24px',
            padding: '18px 26px',
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          {message.content}
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'var(--on-surface-dim)',
          }}
        >
          {meta}
        </div>
      </div>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c74e00, #6b2e1a)',
          border: '2px solid var(--surface-container-low)',
          flexShrink: 0,
          marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        YO
      </div>
    </div>
  );
}

function VoidInputBar({
  value,
  onChange,
  onSend,
  onStop,
  isLoading,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onStop?: () => void;
  isLoading?: boolean;
}) {
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isLoading) onStop?.();
      else onSend();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        background: 'var(--surface-container-low)',
        borderRadius: 999,
        padding: '10px 10px 10px 22px',
      }}
    >
      <button type="button" style={{ ...voidIconBtn, color: 'var(--on-surface-variant)' }}>
        <VoidIcons.Paperclip />
      </button>
      <button type="button" style={{ ...voidIconBtn, color: 'var(--on-surface-variant)' }}>
        <VoidIcons.Mic />
      </button>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Probe the void…"
        disabled={isLoading}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          outline: 'none',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: 15,
          color: 'var(--on-surface)',
          padding: '10px 4px',
        }}
      />
      <button
        type="button"
        onClick={isLoading ? onStop : onSend}
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, var(--primary-container) 0%, var(--primary) 100%)',
          color: 'var(--on-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 14px rgba(159, 61, 0, 0.25)',
        }}
      >
        <VoidIcons.Send size={18} />
      </button>
    </div>
  );
}

function QuickShifts() {
  const tags = ['#STRUCTURAL-ANALYSIS', '#VISUAL-ANALOGY', '#CODE-SAMPLE'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--on-surface-dim)',
        }}
      >
        Quick Shifts:
      </span>
      {tags.map((t, i) => (
        <button
          key={t}
          type="button"
          style={{
            background: i === 0 ? 'rgba(199, 78, 0, 0.10)' : 'transparent',
            border: i === 0 ? '1px solid rgba(199, 78, 0, 0.25)' : '1px solid rgba(141, 113, 101, 0.18)',
            color: i === 0 ? 'var(--primary-container)' : 'var(--on-surface-variant)',
            borderRadius: 999,
            padding: '6px 14px',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.06em',
            cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function VoidChatPanel() {
  const store = useConversationStore();
  const { sendMessage, stopStream, isLoading } = useChatStream();
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const convId = store.activeConversationId;
  const messages = convId ? store.getConversationMessages(convId) : [];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length, messages[messages.length - 1]?.content]);

  const handleSend = () => {
    const t = draft.trim();
    if (!t || isLoading) return;
    if (!convId) {
      const id = store.createConversation();
      store.setActiveConversation(id);
    }
    sendMessage(t);
    setDraft('');
  };

  const handleDismissPopup = () => {
    if (store.selectionPopup.visible) store.hideSelectionPopup();
  };

  if (!convId) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: 32,
          gap: 16,
        }}
        onClick={handleDismissPopup}
      >
        <VoidIcons.Logo size={56} />
        <h2 className="font-epilogue" style={{ fontSize: 24, fontWeight: 700 }}>
          Probe the void
        </h2>
        <p style={{ color: 'var(--on-surface-variant)', textAlign: 'center', maxWidth: 360, lineHeight: 1.6 }}>
          Start a cosmic thread, then branch from any assistant reply to explore parallel orbits.
        </p>
        <button
          type="button"
          onClick={() => store.createConversation()}
          style={{
            marginTop: 8,
            background: 'linear-gradient(135deg, var(--primary-container) 0%, var(--primary) 100%)',
            color: 'var(--on-primary)',
            border: 'none',
            cursor: 'pointer',
            padding: '14px 28px',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 8px 20px rgba(159, 61, 0, 0.25)',
          }}
        >
          New Branch
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: 0, padding: '0 32px 24px 0', gap: 16, flex: 1 }}
      onClick={handleDismissPopup}
    >
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 36,
          padding: '8px 4px 20px 4px',
          minHeight: 0,
        }}
      >
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--on-surface-dim)', padding: '40px 0' }}>
            Send a message to begin this orbit.
          </p>
        )}
        {messages.map(m =>
          m.role === 'assistant' ? (
            <VoidAssistantBubble key={m.id} message={m} />
          ) : m.role === 'user' ? (
            <VoidUserBubble key={m.id} message={m} />
          ) : null,
        )}
      </div>
      <SelectionPopup />
      <VoidInputBar
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        onStop={stopStream}
        isLoading={isLoading}
      />
      <QuickShifts />
    </div>
  );
}
