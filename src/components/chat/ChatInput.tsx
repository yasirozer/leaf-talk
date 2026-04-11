import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Square, Paperclip, Mic } from 'lucide-react';

interface ChatInputProps {
  onSend: (content: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, onStop, isLoading, placeholder = 'ENTER COMMAND OR RESPONSE...' }: ChatInputProps) {
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
    <div className="border-t border-border p-3">
      <div className="max-w-3xl mx-auto flex items-end gap-2 surface-2 rounded border border-border p-2">
        <span className="text-primary text-sm font-bold px-1 pb-1.5">{'>'}</span>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="flex-1 bg-transparent resize-none text-sm px-1 py-1.5 focus:outline-none placeholder:text-dim scrollbar-thin font-mono tracking-wide"
        />
        <div className="flex items-center gap-1">
          <button className="p-2 rounded hover:surface-3 transition-colors">
            <Paperclip size={14} className="text-dim" />
          </button>
          <button className="p-2 rounded hover:surface-3 transition-colors">
            <Mic size={14} className="text-dim" />
          </button>
          {isLoading ? (
            <button onClick={onStop} className="px-4 py-2 rounded border border-accent bg-accent/10 text-accent text-[11px] font-bold tracking-widest uppercase hover:bg-accent/20 transition-colors flex items-center gap-2">
              <Square size={12} />
              STOP
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-2 rounded border border-primary bg-primary/10 text-primary text-[11px] font-bold tracking-widest uppercase hover:bg-primary/20 transition-colors disabled:opacity-20 disabled:hover:bg-primary/10 flex items-center gap-2"
            >
              SEND
              <Send size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}