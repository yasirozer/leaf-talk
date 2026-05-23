import { useState } from 'react';
import { VoidIcons, voidIconBtn } from './void-icons';

export function VoidTopBar() {
  const tabs = ['Nebulae', 'Quasars', 'Exoplanets', 'Supernovae'];
  const [active, setActive] = useState('Nebulae');

  return (
    <div
      style={{
        gridColumn: '2 / span 2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 40px 20px 40px',
      }}
    >
      <div className="font-epilogue" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>
        ASTRO<span style={{ color: 'var(--primary-container)' }}>CLUB</span>
      </div>
      <div style={{ display: 'flex', gap: 36 }}>
        {tabs.map(t => {
          const isActive = t === active;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--primary-container)' : 'var(--on-surface-variant)',
                paddingBottom: 6,
                position: 'relative',
              }}
            >
              {t}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'var(--primary-container)',
                    borderRadius: 2,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, color: 'var(--on-surface)' }}>
        <button type="button" style={voidIconBtn} aria-label="Search">
          <VoidIcons.Search />
        </button>
        <button type="button" style={voidIconBtn} aria-label="Favorites">
          <VoidIcons.Star />
        </button>
        <div style={{ position: 'relative' }}>
          <button type="button" style={voidIconBtn} aria-label="Notifications">
            <VoidIcons.Bell />
          </button>
          <div
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--primary-container)',
            }}
          />
        </div>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c74e00, #6b2e1a)',
            border: '2px solid var(--surface)',
            boxShadow: '0 2px 8px rgba(28,28,21,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          YO
        </div>
      </div>
    </div>
  );
}
