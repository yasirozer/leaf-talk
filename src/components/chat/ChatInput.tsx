import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  onSend: (content: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, onStop, isLoading, placeholder = 'Send a message...' }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4" style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}>
      <div
        className="mx-auto max-w-3xl p-2"
        style={{
          position: 'relative',
          background: 'var(--surface-container-low)',
          borderRadius: 24,
          border: '1px solid rgba(0,0,0,0.18)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full bg-transparent resize-none text-sm px-2 py-1.5 focus:outline-none placeholder:text-dim scrollbar-thin"
          style={{ paddingRight: 48 }}
        />
        {isLoading ? (
          <button
            onClick={onStop}
            className="rounded-full bg-accent p-2.5 text-accent-foreground transition-opacity hover:opacity-90"
            style={{ position: 'absolute', right: 6, bottom: 6 }}
          >
            <Square size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim()}
            className="rounded-full p-2.5 text-white transition hover:opacity-95 disabled:opacity-30"
            style={{
              position: 'absolute',
              right: 6,
              bottom: 6,
              background: 'linear-gradient(135deg, #c74e00 0%, #9f3d00 100%)',
            }}
          >
            <Send size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
