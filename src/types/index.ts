export type Role = 'user' | 'assistant' | 'system';

export type Provider = 'openai' | 'anthropic' | 'google';

export interface ProviderSettings {
  provider: Provider;
  apiKey: string;
  model: string;
}

export interface Message {
  id: string;
  conversationId: string;
  branchId?: string;
  role: Role;
  content: string;
  createdAt: number;
  editedAt?: number;
  provider?: Provider;
  model?: string;
  isStreaming?: boolean;
}

export interface BranchAnchor {
  sourceMessageId: string;
  selectedText: string;
  startOffset: number;
  endOffset: number;
}

export interface Branch {
  id: string;
  conversationId: string;
  title: string;
  anchor: BranchAnchor;
  createdAt: number;
  messageCount: number;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  isFavorite: boolean;
}

export interface SelectionPopupState {
  visible: boolean;
  x: number;
  y: number;
  selectedText: string;
  messageId: string;
  startOffset: number;
  endOffset: number;
}

export const PROVIDER_MODELS: Record<Provider, string[]> = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-sonnet-4-20250514', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
  google: ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.0-flash'],
};

export const PROVIDER_LABELS: Record<Provider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
};
