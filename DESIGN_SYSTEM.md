# Leaf Talk Design System

## Overview

**Leaf Talk** is a branchable AI chat interface — a dark-themed, terminal-inspired single-page React app that lets users fork conversations from any point in an AI response. Unlike linear chat UIs, Leaf Talk's core interaction is text selection → branch creation, enabling parallel conversation trees.

The entire app is client-side only; API keys and chat history live in `localStorage` with no backend.

**Single product surface:** Web app (desktop-first, browser).

### Source

- **GitHub repo:** https://github.com/yasirozer/leaf-talk (branch: `main`)
- **Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + Zustand + React Flow + Lucide Icons

---

## Content Fundamentals

### Tone & Voice
- **Terse and technical.** Labels are short, often single words ("Conversations", "Branch", "Tree").
- **Lowercase preferred** for UI chrome — placeholder text like "Send a message...", "No conversations yet".
- **Uppercase tracking-wide** used for section headers only: `CONVERSATIONS`, `SETTINGS`.
- **No emoji in UI** — the README uses emoji heavily (🌿🌳🔌) but the actual app UI has none.
- **No first-person copy (I/we)** — the app is tool-first, neutral voice.
- **Turkish README** — the app was built by a Turkish developer; README is in Turkish. The in-app UI is entirely English.
- **Micro-copy examples:**
  - "No conversations yet" — lowercase, plain
  - "Send a message..." — ellipsis on placeholders
  - "Thinking" — present participle for loading state
  - "edited" — lowercase italic for metadata
  - "View →" — arrow used for navigation affordance

### Casing Rules
- Section labels: ALL CAPS + tracking-wide
- Button labels: Sentence case
- Metadata/timestamps: lowercase

---

## Visual Foundations

### Color Philosophy
Deep dark blue-gray base with a single neon green primary accent. All surfaces are variations on `hsl(220 14% …)` — same hue/saturation, varying lightness. Red is used exclusively for destructive/accent state. The palette is intentionally minimal: two accent colors, one neutral scale.

### Color Scale
| Token | HSL | Use |
|---|---|---|
| `--background` | 220 14% 10% | App background |
| `--surface-1` | 220 14% 11% | Slightly lifted surfaces |
| `--surface-2` | 220 14% 14% | Cards, message bubbles, input |
| `--surface-3` | 220 14% 17% | Hover tooltips, action bars |
| `--foreground` | 220 14% 92% | Primary text |
| `--text-subtle` | 220 14% 60% | Secondary text |
| `--text-dim` | 220 14% 45% | Tertiary/disabled text |
| `--muted` | 220 14% 16% | Muted backgrounds |
| `--border` | 220 14% 18% | All borders |
| `--primary` | 142 60% 50% | Neon green — brand accent, CTA, active states |
| `--accent` / `--accent-red` | 0 72% 55% | Red — destructive, stop actions |
| `--sidebar-background` | 220 14% 8% | Sidebar (darkest surface) |

### Typography
- **Sans:** Inter (300, 400, 500, 600, 700) — loaded from Google Fonts
- **Mono:** JetBrains Mono (400, 500) — loaded from Google Fonts; used for all code, inline code, model/provider labels
- **Scale used in app:** predominantly `text-xs` (12px) and `text-sm` (14px). Dense information design.
- **Font labels:** ALL CAPS + `tracking-wide` + `font-semibold` for section headers

### Spacing & Layout
- **Border radius base:** `--radius: 0.625rem` (10px). Buttons/cards use `rounded-lg` (10px), `rounded-md` (8px), `rounded-xl` (12px) for message bubbles.
- **Sidebar:** fixed width `w-60` (240px), always visible on left
- **TopBar:** fixed height `h-11` (44px)
- **Chat input:** max-width `max-w-3xl` (768px), centered
- **Message bubbles:** max-width `max-w-[720px]`
- **Padding rhythm:** p-2, p-3, p-4 — tight density

### Backgrounds & Surfaces
- Dark-only. No light mode. No images or illustrations in the UI.
- Layered surfaces via incremental lightness steps on the neutral scale
- No gradients — flat surfaces only
- Scrollbars: 6px wide, styled to match `surface-3`

### Animation
- **fade-in:** 0.2s ease-out (hover action bars appearing)
- **slide-in-right:** 0.25s ease-out (branch panel opening)
- **popup-in:** 0.15s ease-out scale+translate (selection popup)
- **thinking-dot:** staggered 1.4s pulse on 3 dots (AI loading)
- **Accordion:** 0.2s ease-out (shadcn component)
- All animations are subtle and fast — no bounces, no spring physics

### Glow Effects
- `.glow-green`: `box-shadow: 0 0 12px hsl(142 60% 50% / 0.3)` — used on active/focus elements
- `.glow-red`: `box-shadow: 0 0 12px hsl(0 72% 55% / 0.3)`
- Glow is additive decoration, not structural

### Hover & Press States
- **Hover:** background color change (`hover:bg-primary/10`, `hover:bg-sidebar-accent`) + opacity (`hover:opacity-90`)
- **Active/Selected:** `bg-primary/10 text-primary` — green tint + green text
- **Disabled:** `opacity-30` on buttons
- **Transitions:** always `transition-colors` or `transition-opacity`

### Borders
- All borders: `border-border` = `hsl(220 14% 18%)`
- Active/highlighted: `border-primary/20` — green tint at 20% opacity
- No shadows on cards — elevation conveyed by surface lightness difference

### Cards & Containers
- **Message bubbles:** `rounded-xl px-4 py-3 surface-2` (AI); `bg-primary/10 border border-primary/20 rounded-xl` (user)
- **Branch reference chips:** `border-primary/20 bg-primary/5 hover:bg-primary/10`
- **Sidebar:** `bg-sidebar` (8% lightness), `border-r border-border`
- No drop shadows — surfaces stack via color, not shadow

### Imagery
- No photography or illustrations in the UI
- Lucide icon set throughout (stroke icons, 12–16px sizes typically)
- Bot/User avatars are simple icon containers: `w-7 h-7 rounded-lg surface-2`

### Corner Radii
- `rounded-sm`: 6px (calc(0.625rem - 4px))
- `rounded-md`: 8px (calc(0.625rem - 2px))
- `rounded-lg`: 10px (base radius)
- `rounded-xl`: 12px (message bubbles, inputs)

---

## Iconography

**Icon system:** [Lucide Icons](https://lucide.dev) — thin stroke, 1.5px weight, consistent sizing.

**No custom icon font or SVG sprite.** Icons are imported directly from the `lucide-react` package.

**Sizes used:**
- 10px — micro actions (star, trash in sidebar rows)
- 12px — hover action bar buttons
- 13px — tab bar icons, sidebar items
- 14px — avatar icons, send/stop buttons

**Icons in use:**
- `Plus` — new conversation
- `Star` — favorite
- `Trash2` — delete
- `MessageSquare` — conversation item, follow-up branch
- `Network` — tree view tab
- `Settings` — settings tab
- `Bot` / `User` — AI and human avatars
- `GitBranch` — branch action, branch reference chips
- `Pencil` — edit message
- `Copy` / `Check` — copy/copied state
- `Send` / `Square` — send and stop streaming
- `ChevronLeft` / `ChevronRight` — navigation

**CDN:** `https://unpkg.com/lucide@latest` (or import from lucide-react in React)

---

## File Index

```
README.md                    ← This file
SKILL.md                     ← Agent skill descriptor
colors_and_type.css          ← All CSS custom properties + type tokens
assets/                      ← Logos, icons, brand assets (none in this codebase)
preview/                     ← Design system card previews (registered in DS tab)
  colors-base.html           ← Base color scale
  colors-semantic.html       ← Semantic/component colors
  typography-scale.html      ← Type scale specimens
  typography-mono.html       ← Monospace / code type
  spacing-tokens.html        ← Radius, border, spacing tokens
  components-buttons.html    ← Button states
  components-messages.html   ← Message bubbles
  components-sidebar.html    ← Sidebar + nav items
  components-input.html      ← Chat input
  components-badges.html     ← Branch chips, badges, tags
  brand-identity.html        ← Brand overview
ui_kits/
  leaf-talk/
    index.html               ← Full interactive prototype
    Sidebar.jsx              ← Sidebar component
    TopBar.jsx               ← Top navigation bar
    MessageBubble.jsx        ← Chat message component
    ChatInput.jsx            ← Message input
    BranchPanel.jsx          ← Branch side panel
    SettingsView.jsx         ← Settings screen
```

### UI Kits
- **leaf-talk** (`ui_kits/leaf-talk/index.html`) — Full interactive web app prototype with sidebar, chat, branching, and settings views.
