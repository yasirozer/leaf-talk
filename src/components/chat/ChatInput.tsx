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
    <div className="p-4">
      <div className="max-w-3xl mx-auto flex items-end gap-2 bg-secondary border border-border p-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="flex-1 bg-transparent resize-none text-sm font-medium px-2 py-1 focus:outline-none placeholder:text-dim scrollbar-thin"
        />
        {isLoading ? (
          <button onClick={onStop} className="p-2.5 bg-accent text-accent-foreground hover:opacity-90 transition-opacity flex-shrink-0">
            <Square size={14} />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-20 flex-shrink-0"
          >
            <Send size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
