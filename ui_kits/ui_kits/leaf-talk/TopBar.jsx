// TopBar — Leaf Talk UI Kit
function TopBar({ activeView, onSetView, provider, model }) {
  const tabs = [
    { id: 'chat', icon: LucideMessageSquare, label: 'Chat' },
    { id: 'tree', icon: LucideNetwork, label: 'Tree' },
    { id: 'settings', icon: LucideSettings, label: 'Settings' },
  ];
  return (
    <div style={{
      height: 44, borderBottom: '1px solid hsl(220 14% 18%)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', background: 'hsl(220 14% 11%)', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {tabs.map(tab => {
          const active = tab.id === activeView;
          return (
            <button key={tab.id} onClick={() => onSetView(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px',
              borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              background: active ? 'hsl(142 60% 50% / 0.10)' : 'transparent',
              color: active ? 'hsl(142 60% 50%)' : 'hsl(220 14% 45%)',
              transition: 'background 150ms, color 150ms',
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'hsl(220 14% 92%)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'hsl(220 14% 45%)'; } }}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div style={{
        fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
        background: 'hsl(220 14% 14%)', border: '1px solid hsl(220 14% 18%)',
        padding: '3px 10px', borderRadius: 6, color: 'hsl(220 14% 55%)',
        maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {provider} · {model || 'no model'}
      </div>
    </div>
  );
}

Object.assign(window, { TopBar });
