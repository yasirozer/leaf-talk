import { useState } from 'react';
import { useConversationStore } from '@/store/conversation-store';
import { VoidIcons } from './void-icons';

function NavItem({
  label,
  icon: Icon,
  active,
  muted,
  onClick,
}: {
  label: string;
  icon: typeof VoidIcons.Branches;
  active?: boolean;
  muted?: boolean;
  onClick?: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: active ? '14px 18px' : '12px 18px',
        background: active
          ? 'var(--surface-container-lowest)'
          : hov
            ? 'rgba(255,255,255,0.5)'
            : 'transparent',
        border: 'none',
        borderRadius: 18,
        cursor: 'pointer',
        textAlign: 'left',
        color: active
          ? 'var(--primary-container)'
          : muted
            ? 'var(--on-surface-variant)'
            : 'var(--on-surface)',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        transition: 'background 0.15s ease',
        boxShadow: active ? '0 2px 12px rgba(28,28,21,0.04)' : 'none',
        width: '100%',
      }}
    >
      <span style={{ display: 'flex' }}>
        <Icon size={muted ? 16 : 18} />
      </span>
      {label}
    </button>
  );
}

export function VoidSidebar() {
  const store = useConversationStore();
  const conversations = store.conversations;
  const activeId = store.activeConversationId;

  const threadIcons = [VoidIcons.Branches, VoidIcons.Orbit, VoidIcons.Root, VoidIcons.Wave];

  return (
    <div
      style={{
        gridRow: '1 / span 2',
        background: 'var(--surface-container-low)',
        borderRadius: '0 32px 32px 0',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minHeight: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
        <VoidIcons.Logo size={36} />
        <div>
          <div className="font-epilogue" style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.1 }}>
            Branching Void
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--on-surface-dim)',
              marginTop: 4,
            }}
          >
            Cosmic Curator AI
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', flex: 1, minHeight: 0 }}>
        {conversations.length === 0 ? (
          <NavItem label="Primary Thread" icon={VoidIcons.Branches} active />
        ) : (
          conversations.map((conv, i) => (
            <NavItem
              key={conv.id}
              label={conv.title}
              icon={threadIcons[i % threadIcons.length]}
              active={conv.id === activeId}
              onClick={() => {
                store.setActiveView('chat');
                store.setActiveConversation(conv.id);
              }}
            />
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() => store.createConversation()}
        style={{
          background: 'linear-gradient(135deg, var(--primary-container) 0%, var(--primary) 100%)',
          color: 'var(--on-primary)',
          border: 'none',
          cursor: 'pointer',
          padding: '16px 24px',
          borderRadius: 999,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: 14,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 20,
          boxShadow: '0 8px 20px rgba(159, 61, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
          }}
        >
          <VoidIcons.Plus size={13} />
        </span>
        New Branch
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <NavItem
          label="Settings"
          icon={VoidIcons.Settings}
          muted
          onClick={() => store.setActiveView('settings')}
        />
        <NavItem label="Support" icon={VoidIcons.Help} muted />
      </div>
    </div>
  );
}
