## Contrast fixes

**1. ChatInput (`src/components/chat/ChatInput.tsx`)**
- Add a darker outline around the pill input container so it stands out on the cream background.
- Change inline style from `border: 'none'`-ish to: `border: '1px solid rgba(0,0,0,0.18)'` and `boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)'`.
- Also bump the top border of the outer wrapper to `border-top: 1px solid rgba(0,0,0,0.12)` for clearer separation from the chat area. Applies to both main chat and branch chat since both use this component.

**2. TreeView branch edges (`src/components/tree/TreeView.tsx`)**
- Change dashed edges from leaf (branch) to source from green to black:
  - `stroke: 'hsl(142, 60%, 50%)'` → `stroke: 'hsl(0, 0%, 0%)'`, keep `strokeDasharray: '5,5'`, keep `animated: true`, `strokeWidth: 1.5`.
- Keep the solid main-line and intra-branch edges as-is (not requested).

No other files touched.
