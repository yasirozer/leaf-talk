export type Role = 'user' | 'assistant' | 'system';

export type Provider = 'openai' | 'anthropic' | 'google' | 'custom';

export interface ProviderSettings {
  provider: Provider;
  apiKey: string;
  model: string;
  customBaseUrl?: string;
  customModelId?: string;
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
  openai: ['gpt-5.5', 'gpt-5.4-mini', 'gpt-5.4-nano', 'o3-mini'],
  anthropic: ['claude-opus-4-7', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001'],
  google: ['gemini-3.5-flash', 'gemini-3.1-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'],
  custom: [],
};

export const PROVIDER_LABELS: Record<Provider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  custom: 'Custom / OpenRouter',
};
