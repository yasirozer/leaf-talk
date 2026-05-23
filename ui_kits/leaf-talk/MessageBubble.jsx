// MessageBubble — Leaf Talk UI Kit
function MessageBubble({ message, onBranchClick }) {
  const [copied, setCopied] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: 10, padding: '10px 16px',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      {!isUser && <Avatar role="bot" />}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 640, flex: 1, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div style={{ position: 'relative' }}>
          {/* Hover action bar */}
          {hovered && !message.isStreaming && (
            <div style={{
              position: 'absolute', top: -30, right: 0,
              display: 'flex', gap: 2, background: 'hsl(220 14% 17%)',
              border: '1px solid hsl(220 14% 20%)', borderRadius: 8, padding: 3, zIndex: 10,
            }}>
              <ActionBtn onClick={handleCopy} title="Copy">
                {copied ? <LucideCheck size={12} style={{ color: 'hsl(142 60% 50%)' }} /> : <LucideCopy size={12} />}
              </ActionBtn>
              <ActionBtn title="Edit"><LucidePencil size={12} /></ActionBtn>
              {!isUser && <>
                <ActionBtn title="Follow up"><LucideMessageSquare size={12} /></ActionBtn>
                <ActionBtn title="Fork"><LucideGitBranch size={12} /></ActionBtn>
              </>}
            </div>
          )}
          {/* Bubble */}
          <div style={{
            borderRadius: 12, padding: '10px 14px', fontSize: 14, lineHeight: 1.6,
            background: isUser ? 'hsl(142 60% 50% / 0.10)' : 'hsl(220 14% 14%)',
            border: isUser ? '1px solid hsl(142 60% 50% / 0.20)' : 'none',
            color: 'hsl(220 14% 92%)',
          }}>
            {message.isStreaming && !message.content ? (
              <ThinkingDots />
            ) : (
              <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
            )}
          </div>
        </div>
        {message.editedAt && (
          <span style={{ fontSize: 10, color: 'hsl(220 14% 45%)', marginTop: 3, fontStyle: 'italic' }}>edited</span>
        )}
        {/* Branch chips */}
        {(message.branches || []).map(b => (
          <BranchChip key={b.id} branch={b} onClick={() => onBranchClick && onBranchClick(b.id)} />
        ))}
      </div>
      {isUser && <Avatar role="user" />}
    </div>
  );
}

function Avatar({ role }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 8, flexShrink: 0, marginTop: 2,
      background: role === 'user' ? 'hsl(142 60% 50% / 0.20)' : 'hsl(220 14% 14%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {role === 'user'
        ? <LucideUser size={14} style={{ color: 'hsl(142 60% 50%)' }} />
        : <LucideBot size={14} style={{ color: 'hsl(142 60% 50%)' }} />
      }
    </div>
  );
}

function ThinkingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 0' }}>
      <span style={{ fontSize: 12, color: 'hsl(220 14% 45%)', marginRight: 2 }}>Thinking</span>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: 'hsl(142 60% 50%)',
          display: 'inline-block', animation: `thinkDot 1.4s infinite ${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

function BranchChip({ branch, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8,
        border: '1px solid hsl(142 60% 50% / 0.2)',
        background: hov ? 'hsl(142 60% 50% / 0.10)' : 'hsl(142 60% 50% / 0.05)',
        cursor: 'pointer', marginTop: 6, transition: 'background 150ms',
      }}
    >
      <LucideGitBranch size={12} style={{ color: 'hsl(142 60% 50%)', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'hsl(142 60% 50%)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{branch.title}</div>
        <div style={{ fontSize: 10, color: 'hsl(220 14% 45%)' }}>{branch.messageCount} msgs</div>
      </div>
      <span style={{ fontSize: 10, color: 'hsl(220 14% 45%)' }}>View →</span>
    </div>
  );
}

function ActionBtn({ onClick, title, children }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: 4, border: 'none', borderRadius: 4, cursor: 'pointer',
        background: hov ? 'hsl(142 60% 50% / 0.10)' : 'transparent',
        color: 'hsl(220 14% 45%)', display: 'flex', transition: 'background 150ms',
      }}
    >
      {children}
    </button>
  );
}

Object.assign(window, { MessageBubble, Avatar, ThinkingDots, BranchChip });
