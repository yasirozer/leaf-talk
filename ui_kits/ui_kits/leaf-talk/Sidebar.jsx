// Sidebar — Leaf Talk UI Kit
// Conversation list with favorites, delete, new conversation

function Sidebar({ conversations, activeId, onSelect, onCreate, onDelete, onFavorite }) {
  return (
    <div style={{
      width: 240, background: 'hsl(220 14% 8%)', borderRight: '1px solid hsl(220 14% 15%)',
      display: 'flex', flexDirection: 'column', height: '100%', flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 12px', borderBottom: '1px solid hsl(220 14% 15%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'hsl(220 14% 45%)' }}>
          Conversations
        </span>
        <button onClick={onCreate} style={{
          padding: 5, borderRadius: 7, border: 'none', background: 'transparent',
          cursor: 'pointer', color: 'hsl(220 14% 70%)', display: 'flex', alignItems: 'center',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'hsl(220 14% 14%)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <LucidePlus size={14} />
        </button>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px', scrollbarWidth: 'thin', scrollbarColor: 'hsl(220 14% 17%) transparent' }}>
        {conversations.length === 0 && (
          <p style={{ fontSize: 10, color: 'hsl(220 14% 45%)', textAlign: 'center', padding: '24px 0', margin: 0 }}>
            No conversations yet
          </p>
        )}
        {conversations.map(conv => (
          <SidebarItem
            key={conv.id}
            conv={conv}
            active={conv.id === activeId}
            onSelect={() => onSelect(conv.id)}
            onDelete={() => onDelete(conv.id)}
            onFavorite={() => onFavorite(conv.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarItem({ conv, active, onSelect, onDelete, onFavorite }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
        borderRadius: 8, cursor: 'pointer', marginBottom: 1,
        background: active ? 'hsl(220 14% 14%)' : hovered ? 'hsl(220 14% 12%)' : 'transparent',
        color: active ? 'hsl(220 14% 92%)' : 'hsl(220 14% 70%)',
        transition: 'background 150ms',
      }}
    >
      <LucideMessageSquare size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {conv.title}
      </span>
      {hovered && (
        <div style={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
          <button onClick={e => { e.stopPropagation(); onFavorite(); }} style={{
            padding: 2, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 3, display: 'flex',
          }}>
            <LucideStar size={10} style={{ color: conv.isFavorite ? '#eab308' : 'hsl(220 14% 45%)', fill: conv.isFavorite ? '#eab308' : 'none' }} />
          </button>
          <button onClick={e => { e.stopPropagation(); onDelete(); }} style={{
            padding: 2, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 3, display: 'flex',
          }}>
            <LucideTrash2 size={10} style={{ color: 'hsl(220 14% 45%)' }} />
          </button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Sidebar });
