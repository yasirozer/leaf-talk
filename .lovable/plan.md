## Fix send button position when textarea grows

**Problem:** In `ChatInput.tsx`, the pill uses flex with `items-end`, so as the textarea grows the button visually shifts down with the pill height, looking broken.

**Fix:** Anchor the send/stop button to the bottom-right corner of the pill so it stays in a fixed visual spot while the textarea expands upward.

**`src/components/chat/ChatInput.tsx`:**
- Make the pill container `position: relative` and remove the flex row.
- Textarea: full width, add `paddingRight: 48px` so text doesn't run under the button. Keep auto-grow up to 200px.
- Send/Stop button: `position: absolute`, `right: 6px`, `bottom: 6px`. Same styling otherwise.

No other files touched.
