# Leaf Talk — Branchable AI Chat Interface

Leaf Talk is a client-side AI chat application that allows users to create independent conversation branches from any selected part of an AI response.

Instead of following a single linear chat flow, users can highlight a specific part of a response and start a new branch from that point. Each branch inherits only the relevant previous context, making it easier to explore alternative ideas, what-if scenarios, and deeper follow-up discussions without affecting the main conversation.

## Features

- **Branchable conversations**  
  Select part of an AI response and create a new independent conversation branch from that exact point.

- **Context-aware branches**  
  Each branch keeps only the conversation history up to the point where it was created.

- **Visual conversation tree**  
  View the full conversation structure as an interactive tree using React Flow.

- **Multiple AI provider support**  
  Supports OpenAI, Anthropic, Google, OpenRouter, and OpenAI-compatible custom endpoints.

- **Client-side architecture**  
  The app runs without a backend. API keys and chat history are stored locally in the browser.

- **Persistent chat storage**  
  Conversations are saved with Zustand and localStorage.

- **Streaming AI responses**  
  AI responses are displayed token by token for a real-time chat experience.

- **Editable messages**  
  Users can edit their own messages after sending them.

- **Terminal-inspired UI**  
  High-contrast monospaced interface with a hacker-style visual theme.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Zustand
- React Flow
- Lucide Icons

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

```bash
npm install
