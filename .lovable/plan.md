

## Problem Diagnosis

**This is a frontend rendering issue, not an API issue.** The AI providers return markdown with code blocks (````java ... ````) correctly. The problem is that `react-markdown` is rendering code blocks as plain `<code>` elements without any syntax highlighting library. There's no `rehype-highlight`, `react-syntax-highlighter`, or similar package installed.

The screenshot shows properly syntax-highlighted code (keywords in purple, strings in green, comments in gray, etc.) -- this requires a code highlighting library on the frontend side.

## Plan

### 1. Install `react-syntax-highlighter`
Add `react-syntax-highlighter` and its types as dependencies. This is the most popular solution for use with `react-markdown`.

### 2. Create a custom code component for ReactMarkdown
In `MessageBubble.tsx`, pass a `components` prop to `<ReactMarkdown>` with a custom `code` renderer that:
- Detects if it's a fenced code block (has `className` like `language-java`)
- Renders it with `SyntaxHighlighter` using a dark theme (e.g., `oneDark` or `vscDarkPlus`)
- Falls back to inline `<code>` styling for inline code spans

### 3. Style the code blocks
- Dark background with rounded corners and padding
- Copy button on hover for code blocks
- Language label in the top-right corner
- Consistent with the app's dark premium theme

### Technical Details
```text
ReactMarkdown
  └─ components={{ code: CustomCodeBlock }}
       └─ if block code → <SyntaxHighlighter style={oneDark} language={lang}>
       └─ if inline code → <code className="bg-surface px-1 rounded">
```

Files to modify:
- `package.json` — add `react-syntax-highlighter`, `@types/react-syntax-highlighter`
- `src/components/chat/MessageBubble.tsx` — add custom code renderer to `<ReactMarkdown>`

