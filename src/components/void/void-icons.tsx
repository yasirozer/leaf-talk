import type { CSSProperties, SVGProps } from 'react';

type IconProps = { size?: number } & SVGProps<SVGSVGElement>;

export const VoidIcons = {
  Search: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Star: ({ size = 18, filled, ...p }: IconProps & { filled?: boolean }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Bell: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Plus: ({ size = 16, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...p}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Send: ({ size = 16, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M3.4 20.4 21 12 3.4 3.6 3 10.5l13 1.5-13 1.5z" />
    </svg>
  ),
  Paperclip: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.93 8.8l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  Mic: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="9" y="2" width="6" height="11" rx="3" /><path d="M19 10a7 7 0 0 1-14 0" /><line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  Info: ({ size = 14, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" {...p}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Rocket: ({ size = 16, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  Settings: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Help: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Sparkle: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l1.5 6L20 9.5 13.5 11 12 17l-1.5-6L4 9.5 10.5 8z" /><circle cx="19" cy="17" r="1.5" /><circle cx="5" cy="18" r="1" />
    </svg>
  ),
  Graph: ({ size = 16, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" />
    </svg>
  ),
  Branches: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="3" y="9" width="6" height="6" rx="1.5" /><rect x="15" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M9 12h3" /><path d="M12 6v12" /><path d="M12 6h3" /><path d="M12 18h3" />
    </svg>
  ),
  Orbit: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <circle cx="12" cy="12" r="3" /><circle cx="5" cy="5" r="1.5" fill="currentColor" /><circle cx="19" cy="19" r="1.5" fill="currentColor" />
      <path d="M19 4.5C8 4.5 4.5 8 4.5 19" />
    </svg>
  ),
  Root: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="4" cy="5" r="2" /><circle cx="20" cy="5" r="2" /><circle cx="4" cy="19" r="2" /><circle cx="20" cy="19" r="2" />
      <line x1="6" y1="6.5" x2="10" y2="10.5" /><line x1="18" y1="6.5" x2="14" y2="10.5" /><line x1="6" y1="17.5" x2="10" y2="13.5" /><line x1="18" y1="17.5" x2="14" y2="13.5" />
    </svg>
  ),
  Wave: ({ size = 18, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M2 6c2.5-2 5-2 7.5 0S15 8 17.5 6 22.5 4 24 6" /><path d="M2 12c2.5-2 5-2 7.5 0S15 14 17.5 12 22.5 10 24 12" /><path d="M2 18c2.5-2 5-2 7.5 0S15 20 17.5 18 22.5 16 24 18" />
    </svg>
  ),
  Logo: ({ size = 28, ...p }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...p}>
      <circle cx="16" cy="16" r="4" fill="#c74e00" />
      <circle cx="6" cy="8" r="2.5" fill="#1c1c15" /><circle cx="26" cy="8" r="2.5" fill="#1c1c15" />
      <circle cx="6" cy="24" r="2.5" fill="#1c1c15" /><circle cx="26" cy="24" r="2.5" fill="#1c1c15" />
      <line x1="8.2" y1="9.6" x2="13.5" y2="14.3" stroke="#1c1c15" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="23.8" y1="9.6" x2="18.5" y2="14.3" stroke="#1c1c15" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8.2" y1="22.4" x2="13.5" y2="17.7" stroke="#1c1c15" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="23.8" y1="22.4" x2="18.5" y2="17.7" stroke="#1c1c15" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

export const voidIconBtn: CSSProperties = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: 'var(--on-surface)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 4,
};
