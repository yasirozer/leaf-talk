// BranchPanel — Leaf Talk UI Kit
function BranchPanel({ branch, messages, onSend, onClose, isLoading, onStop }) {
  if (!branch) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'hsl(220 14% 11%)', borderLeft: '1px solid hsl(220 14% 18%)' }}>
      <p style={{ color: 'hsl(220 14% 45%)', fontSize: 13 }}>No branch open</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'hsl(220 14% 11%)', borderLeft: '1px solid hsl(220 14% 18%)' }}>
      {/* Header */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid hsl(220 14% 18%)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <LucideGitBranch size={13} style={{ color: 'hsl(142 60% 50%)' }} />
        <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: 'hsl(220 14% 92%)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{branch.title}</span>
        <button onClick={onClose} style={{ padding: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: 'hsl(220 14% 45%)', display: 'flex', borderRadius: 5 }}
          onMouseEnter={e => e.currentTarget.style.color = 'hsl(220 14% 92%)'}
          onMouseLeave={e => e.currentTarget.style.color = 'hsl(220 14% 45%)'}
        >
          <LucideX size={13} />
        </button>
      </div>

      {/* Context strip */}
      {branch.anchorText && (
        <div style={{ margin: '10px 14px 0', padding: '7px 10px', borderRadius: 7, background: 'hsl(142 60% 50% / 0.07)', border: '1px solid hsl(142 60% 50% / 0.15)' }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', color: 'hsl(142 60% 50%)', marginBottom: 3 }}>Branched from</div>
          <div style={{ fontSize: 12, color: 'hsl(220 14% 70%)', fontStyle: 'italic', lineHeight: 1.4 }}>"{branch.anchorText}"</div>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'hsl(220 14% 17%) transparent' }}>
        {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
      </div>

      <ChatInput onSend={onSend} onStop={onStop} isLoading={isLoading} placeholder="Continue this branch..." />
    </div>
  );
}

Object.assign(window, { BranchPanel });
