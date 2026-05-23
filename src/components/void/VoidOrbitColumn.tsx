import { useConversationStore } from '@/store/conversation-store';
import { VoidIcons } from './void-icons';

function OrbitTree() {
  return (
    <svg viewBox="0 0 320 470" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMin meet">
      <defs>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c74e00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c74e00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="#c19586" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M 245 60 Q 200 90 165 130" />
        <path d="M 165 138 Q 180 165 215 195" />
        <path d="M 175 240 Q 140 270 105 290" />
        <path d="M 195 240 Q 185 290 180 330" />
        <path d="M 180 340 Q 195 370 215 400" />
      </g>
      <g>
        <rect x="200" y="10" width="92" height="80" rx="22" fill="var(--surface-container-lowest)" />
        <text x="246" y="33" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1.2" fill="#c74e00">
          ORIGIN
        </text>
        <text x="246" y="52" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="500" fill="#4d473a">
          Quantum
        </text>
        <text x="246" y="65" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="500" fill="#4d473a">
          Physics
        </text>
        <text x="246" y="78" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="500" fill="#4d473a">
          Intro
        </text>
      </g>
      <circle cx="165" cy="130" r="11" fill="url(#dotGlow)" />
      <circle cx="165" cy="130" r="5" fill="#c74e00" />
      <g>
        <rect x="155" y="170" width="120" height="68" rx="20" fill="#c74e00" />
        <text x="215" y="190" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1.2" fill="rgba(255,255,255,0.75)">
          ACTIVE BRANCH
        </text>
        <text x="215" y="210" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fontWeight="600" fill="#fff">
          Entanglement
        </text>
        <text x="215" y="226" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fontWeight="600" fill="#fff">
          Theories
        </text>
      </g>
      <circle cx="105" cy="290" r="6" fill="#dddacf" stroke="#c19586" strokeWidth="1" />
      <circle cx="180" cy="335" r="5" fill="#c74e00" />
      <g>
        <rect x="175" y="385" width="100" height="44" rx="14" fill="var(--surface-container-lowest)" />
        <text x="225" y="404" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="500" fill="#4d473a">
          Bell&apos;s
        </text>
        <text x="225" y="419" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="500" fill="#4d473a">
          Inequality
        </text>
      </g>
    </svg>
  );
}

export function VoidOrbitColumn() {
  const convId = useConversationStore(s => s.activeConversationId);
  const branchCount = useConversationStore(s =>
    convId ? s.getConversationBranches(convId).length : 0,
  );
  const messageCount = useConversationStore(s =>
    convId ? s.getConversationMessages(convId).length : 0,
  );
  const complexity = branchCount + messageCount > 12 ? 'High' : branchCount > 4 ? 'Medium' : 'Low';
  const pct = Math.min(95, Math.round(((branchCount + messageCount) / 18) * 100));

  return (
    <div
      style={{
        padding: '8px 20px 24px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <div
        className="font-epilogue"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--on-surface)',
        }}
      >
        <span style={{ color: 'var(--on-surface-dim)', fontWeight: 500 }}>{'{'}</span>
        <span>Conversation Orbit</span>
        <span style={{ color: 'var(--on-surface-dim)', fontWeight: 500 }}>{'}'}</span>
        <span style={{ color: 'var(--primary-container)', marginLeft: 2 }}>
          <VoidIcons.Sparkle size={22} />
        </span>
      </div>

      <div style={{ position: 'relative', flex: 1, minHeight: 280 }}>
        <OrbitTree />
      </div>

      <div
        style={{
          background: 'var(--inverse-surface)',
          color: 'var(--surface)',
          borderRadius: 24,
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-container)',
            }}
          >
            <VoidIcons.Graph />
          </span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            Graph Complexity: <span style={{ color: 'var(--primary-container)' }}>{complexity}</span>
          </span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: 'linear-gradient(90deg, var(--primary-container), var(--primary))',
              borderRadius: 2,
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: 'rgba(253,249,238,0.55)', lineHeight: 1.55, marginTop: 2 }}>
          You have explored {branchCount + messageCount} interconnected
          <br />
          concepts in this session.
        </div>
      </div>
    </div>
  );
}
