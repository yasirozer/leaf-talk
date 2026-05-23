import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Branch, Conversation, ProviderSettings, Provider, SelectionPopupState } from '@/types';

const API_KEY_SESSION_STORAGE_KEY = 'branchable-ai-api-key';
function loadSessionApiKey(): string {
  try { return sessionStorage.getItem(API_KEY_SESSION_STORAGE_KEY) || ''; } catch { return ''; }
}
function saveSessionApiKey(key: string) {
  try {
    if (key) sessionStorage.setItem(API_KEY_SESSION_STORAGE_KEY, key);
    else sessionStorage.removeItem(API_KEY_SESSION_STORAGE_KEY);
  } catch {}
}

function uid() {
  return crypto.randomUUID();
}

interface ConversationStore {
  // Data
  conversations: Conversation[];
  messages: Message[];
  branches: Branch[];
  providerSettings: ProviderSettings;

  // UI state
  activeConversationId: string | null;
  activeBranchId: string | null;
  branchPanelOpen: boolean;
  selectionPopup: SelectionPopupState;
  activeView: 'chat' | 'tree' | 'settings';

  // Conversation actions
  createConversation: () => string;
  setActiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  toggleFavorite: (id: string) => void;

  // Message actions
  addMessage: (msg: Omit<Message, 'id' | 'createdAt'>) => string;
  updateMessageContent: (id: string, content: string) => void;
  setMessageStreaming: (id: string, streaming: boolean) => void;
  editMessage: (id: string, content: string) => void;

  // Branch actions
  createBranch: (conversationId: string, anchor: Branch['anchor']) => string;
  setActiveBranch: (id: string | null) => void;
  closeBranchPanel: () => void;

  // Selection popup
  showSelectionPopup: (state: Omit<SelectionPopupState, 'visible'>) => void;
  hideSelectionPopup: () => void;

  // Provider
  setProviderSettings: (settings: Partial<ProviderSettings>) => void;

  // View
  setActiveView: (view: 'chat' | 'tree' | 'settings') => void;

  // Helpers
  getConversationMessages: (conversationId: string) => Message[];
  getBranchMessages: (branchId: string) => Message[];
  getConversationBranches: (conversationId: string) => Branch[];
  getMessagesUpTo: (conversationId: string, messageId: string) => Message[];
}

export const useConversationStore = create<ConversationStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: [],
      branches: [],
      providerSettings: { provider: 'openai' as Provider, apiKey: loadSessionApiKey(), model: 'gpt-4o' },

      activeConversationId: null,
      activeBranchId: null,
      branchPanelOpen: false,
      selectionPopup: { visible: false, x: 0, y: 0, selectedText: '', messageId: '', startOffset: 0, endOffset: 0 },
      activeView: 'chat',

      createConversation: () => {
        const id = uid();
        const conv: Conversation = { id, title: 'New conversation', createdAt: Date.now(), updatedAt: Date.now(), isFavorite: false };
        set(s => ({ conversations: [conv, ...s.conversations], activeConversationId: id }));
        return id;
      },

      setActiveConversation: (id) => set({ activeConversationId: id, activeBranchId: null, branchPanelOpen: false, activeView: 'chat' }),

      deleteConversation: (id) => set(s => ({
        conversations: s.conversations.filter(c => c.id !== id),
        messages: s.messages.filter(m => m.conversationId !== id),
        branches: s.branches.filter(b => b.conversationId !== id),
        activeConversationId: s.activeConversationId === id ? null : s.activeConversationId,
      })),

      toggleFavorite: (id) => set(s => ({
        conversations: s.conversations.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c),
      })),

      addMessage: (msg) => {
        const id = uid();
        const full: Message = { ...msg, id, createdAt: Date.now() };
        set(s => {
          const newMessages = [...s.messages, full];
          // Update conversation title from first user message
          let convs = s.conversations;
          if (msg.role === 'user' && !msg.branchId) {
            const convMsgs = newMessages.filter(m => m.conversationId === msg.conversationId && !m.branchId && m.role === 'user');
            if (convMsgs.length === 1) {
              convs = convs.map(c => c.id === msg.conversationId ? { ...c, title: msg.content.slice(0, 60), updatedAt: Date.now() } : c);
            }
          }
          return { messages: newMessages, conversations: convs };
        });
        return id;
      },

      updateMessageContent: (id, content) => set(s => ({
        messages: s.messages.map(m => m.id === id ? { ...m, content } : m),
      })),

      setMessageStreaming: (id, isStreaming) => set(s => ({
        messages: s.messages.map(m => m.id === id ? { ...m, isStreaming } : m),
      })),

      editMessage: (id, content) => set(s => ({
        messages: s.messages.map(m => m.id === id ? { ...m, content, editedAt: Date.now() } : m),
      })),

      createBranch: (conversationId, anchor) => {
        const id = uid();
        const branch: Branch = {
          id,
          conversationId,
          title: `Branch: "${anchor.selectedText.slice(0, 40)}${anchor.selectedText.length > 40 ? '...' : ''}"`,
          anchor,
          createdAt: Date.now(),
          messageCount: 0,
        };
        set(s => ({ branches: [...s.branches, branch], activeBranchId: id, branchPanelOpen: true }));
        return id;
      },

      setActiveBranch: (id) => set({ activeBranchId: id, branchPanelOpen: id !== null }),
      closeBranchPanel: () => set({ branchPanelOpen: false, activeBranchId: null }),

      showSelectionPopup: (state) => set({ selectionPopup: { ...state, visible: true } }),
      hideSelectionPopup: () => set(s => ({ selectionPopup: { ...s.selectionPopup, visible: false } })),

      setProviderSettings: (settings) => set(s => ({ providerSettings: { ...s.providerSettings, ...settings } })),

      setActiveView: (view) => set({ activeView: view }),

      getConversationMessages: (conversationId) => get().messages.filter(m => m.conversationId === conversationId && !m.branchId).sort((a, b) => a.createdAt - b.createdAt),
      getBranchMessages: (branchId) => get().messages.filter(m => m.branchId === branchId).sort((a, b) => a.createdAt - b.createdAt),
      getConversationBranches: (conversationId) => get().branches.filter(b => b.conversationId === conversationId),
      getMessagesUpTo: (conversationId, messageId) => {
        const msgs = get().getConversationMessages(conversationId);
        const idx = msgs.findIndex(m => m.id === messageId);
        return idx >= 0 ? msgs.slice(0, idx + 1) : msgs;
      },
    }),
    {
      name: 'branchable-ai-store',
      partialize: (state) => ({
        conversations: state.conversations,
        messages: state.messages,
        branches: state.branches,
        providerSettings: state.providerSettings,
      }),
    }
  )
);
