// ChatInput — Leaf Talk UI Kit
function ChatInput({ onSend, onStop, isLoading, placeholder = 'Send a message...' }) {
  const [input, setInput] = React.useState('');
  const taRef = React.useRef(null);

  React.useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto';
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSend = () => {
    const t = input.trim();
    if (!t || isLoading) return;
    onSend(t);
    setInput('');
  };

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const hasInput = input.trim().length > 0;

  return (
    <div style={{ borderTop: '1px solid hsl(220 14% 18%)', padding: '12px 16px', flexShrink: 0 }}>
      <div style={{
        maxWidth: 768, margin: '0 auto',
        display: 'flex', alignItems: 'flex-end', gap: 6,
        background: 'hsl(220 14% 14%)', border: '1px solid hsl(220 14% 18%)',
        borderRadius: 12, padding: '6px 8px',
      }}>
        <textarea
          ref={taRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          rows={1}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            resize: 'none', fontSize: 14, color: 'hsl(220 14% 92%)',
            fontFamily: 'Inter, sans-serif', padding: '4px 6px', lineHeight: 1.5,
          }}
        />
        {isLoading ? (
          <button onClick={onStop} style={{
            padding: 7, borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'hsl(0 72% 55%)', color: 'hsl(0 0% 98%)', flexShrink: 0, display: 'flex',
          }}>
            <LucideSquare size={14} />
          </button>
        ) : (
          <button onClick={handleSend} disabled={!hasInput} style={{
            padding: 7, borderRadius: 8, border: 'none', cursor: hasInput ? 'pointer' : 'default',
            background: 'hsl(142 60% 50%)', color: 'hsl(220 14% 6%)',
            opacity: hasInput ? 1 : 0.3, flexShrink: 0, display: 'flex', transition: 'opacity 150ms',
          }}>
            <LucideSend size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ChatInput });
