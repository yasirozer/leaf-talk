import { useRef, useState, useCallback } from 'react';
import { useConversationStore } from '@/store/conversation-store';
import { streamCompletion } from '@/lib/ai-providers';
import { Message } from '@/types';
import { toast } from '@/hooks/use-toast';

export function useChatStream(branchId?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const store = useConversationStore();

  const sendMessage = useCallback(async (content: string, contextMessages?: Message[]) => {
    const { providerSettings, activeConversationId, addMessage, updateMessageContent, setMessageStreaming, createConversation, setActiveView } = useConversationStore.getState();
    let convId = activeConversationId;
    if (!convId) {
      convId = createConversation();
    }
    if (!providerSettings.apiKey) {
      toast({ title: 'API key required', description: 'Add your API key in Settings to send messages.', variant: 'destructive' });
      setActiveView('settings');
      return;
    }


    // Add user message
    addMessage({ conversationId: convId, branchId, role: 'user', content });

    // Add placeholder assistant message
    const assistantId = addMessage({ conversationId: convId, branchId, role: 'assistant', content: '', isStreaming: true });

    setIsLoading(true);
    abortRef.current = new AbortController();

    // Build context
    const allMessages = contextMessages || useConversationStore.getState().getConversationMessages(convId);
    const msgs = branchId
      ? [...(contextMessages || []), ...useConversationStore.getState().getBranchMessages(branchId)]
      : allMessages;

    await streamCompletion(
      providerSettings.provider,
      providerSettings.apiKey,
      providerSettings.model,
      msgs,
      {
        onToken: (token) => {
          const current = useConversationStore.getState().messages.find(m => m.id === assistantId);
          updateMessageContent(assistantId, (current?.content || '') + token);
        },
        onDone: () => {
          setMessageStreaming(assistantId, false);
          setIsLoading(false);
        },
        onError: (error) => {
          updateMessageContent(assistantId, `Error: ${error}`);
          setMessageStreaming(assistantId, false);
          setIsLoading(false);
        },
      },
      abortRef.current.signal,
      providerSettings.customBaseUrl
    );
  }, [branchId]);

  const stopStream = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  return { sendMessage, stopStream, isLoading };
}
