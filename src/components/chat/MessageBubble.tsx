import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Branch } from '@/types';
import { useConversationStore } from '@/store/conversation-store';
import { GitBranch, Pencil, Copy, Check, User, Bot, MessageSquare } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { useState, useCallback, useRef } from 'react';

interface MessageBubbleProps {
  message: Message;
  branches?: Branch[];
}

export function MessageBubble({ message, branches = [] }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const contentRef = useRef<HTMLDivElement>(null);
  const store = useConversationStore();

  const isUser = message.role === 'user';
  const messageBranches = branches.filter(b => b.anchor.sourceMessageId === message.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    if (editing) {
      store.editMessage(message.id, editContent);
      setEditing(false);
    } else {
      setEditContent(message.content);
      setEditing(true);
    }
  };

  const handleQuickBranch = (type: 'followup' | 'fork') => {
    const content = message.content;
    const preview = content.slice(0, 80) + (content.length > 80 ? '...' : '');

    const branchId = store.createBranch(message.conversationId, {
      sourceMessageId: message.id,
      selectedText: preview,
      startOffset: 0,
      endOffset: content.length,
    });

    store.addMessage({
      conversationId: message.conversationId,
      branchId,
      role: 'system',
      content: type === 'followup'
        ? `The user wants a follow-up on this assistant message:\n\n"${preview}"\n\nProvide a detailed follow-up.`
        : `The user forked from this assistant message:\n\n"${preview}"\n\nContinue the conversation from this point.`,
    });
  };

  const handleTextSelection = useCallback(() => {
    if (isUser) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !contentRef.current) {
      return;
    }
    const text = selection.toString().trim();
    if (!text) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    store.showSelectionPopup({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      selectedText: text,
      messageId: message.id,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    });
  }, [isUser, message.id, store]);

  return (
    <div className={`group flex gap-3 px-4 py-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded border border-primary/30 bg-primary/5 flex items-center justify-center mt-0.5">
          <span className="text-primary text-sm">◈</span>
        </div>
      )}
      <div className={`flex flex-col max-w-[720px] ${isUser ? 'items-end' : 'items-start'} flex-1`}>
        {/* Role label */}
        <span className={`text-[9px] tracking-widest uppercase mb-1.5 font-bold ${isUser ? 'text-dim' : 'text-primary'}`}>
          {isUser ? 'OPERATOR_01' : 'NEURAL_NET_ALPHA'}
        </span>

        <div
          className={`relative rounded px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'border border-border surface-2'
          }`}
        >
          {editing ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                className="bg-transparent border border-border rounded p-2 text-sm resize-none min-h-[60px] focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setEditing(false)} className="text-[10px] text-dim px-2 py-1 hover:text-foreground transition-colors tracking-wider uppercase">Cancel</button>
                <button onClick={handleEdit} className="text-[10px] bg-primary text-primary-foreground px-3 py-1 rounded hover:opacity-90 transition-opacity tracking-wider uppercase font-bold">Save</button>
              </div>
            </div>
          ) : (
            <div
              ref={contentRef}
              onMouseUp={handleTextSelection}
              className={`prose-chat text-sm ${isUser ? 'font-bold tracking-wide uppercase text-[13px]' : ''}`}
            >
              {message.isStreaming && !message.content ? (
                <div className="flex items-center gap-1.5 py-1">
                  <span className="text-[10px] text-dim mr-1 tracking-wider uppercase">PROCESSING</span>
                  <span className="thinking-dot w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  <span className="thinking-dot w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  <span className="thinking-dot w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                </div>
              ) : (
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const codeString = String(children).replace(/\n$/, '');
                      if (match && codeString.includes('\n')) {
                        return <CodeBlock language={match[1]}>{codeString}</CodeBlock>;
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >{message.content || ''}</ReactMarkdown>
              )}
            </div>
          )}

          {/* Hover actions */}
          {!editing && !message.isStreaming && (
            <div className="absolute -top-8 right-0 hidden group-hover:flex gap-1 surface-3 rounded p-1 border border-border animate-fade-in">
              <button onClick={handleCopy} className="p-1 rounded hover:bg-primary/10 transition-colors" title="Copy">
                {copied ? <Check size={12} className="text-primary" /> : <Copy size={12} className="text-dim" />}
              </button>
              <button onClick={handleEdit} className="p-1 rounded hover:bg-primary/10 transition-colors" title="Edit">
                <Pencil size={12} className="text-dim" />
              </button>
              {!isUser && (
                <>
                  <button
                    onClick={() => handleQuickBranch('followup')}
                    className="p-1 rounded hover:bg-primary/10 transition-colors"
                    title="Follow up"
                  >
                    <MessageSquare size={12} className="text-dim" />
                  </button>
                  <button
                    onClick={() => handleQuickBranch('fork')}
                    className="p-1 rounded hover:bg-primary/10 transition-colors"
                    title="Fork"
                  >
                    <GitBranch size={12} className="text-dim" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Edited indicator */}
        {message.editedAt && (
          <span className="text-[9px] text-dim mt-1 tracking-wider uppercase">MODIFIED</span>
        )}

        {/* Branch references */}
        {messageBranches.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {messageBranches.map(branch => (
              <button
                key={branch.id}
                onClick={() => store.setActiveBranch(branch.id)}
                className="flex items-center gap-2 px-3 py-2 rounded border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all text-left group/branch"
              >
                <span className="text-primary text-[10px]">■</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-primary tracking-wider uppercase truncate">{branch.title}</div>
                  <div className="text-[9px] text-dim tracking-wider uppercase">
                    {new Date(branch.createdAt).toLocaleTimeString()} · {branch.messageCount} MSGS
                  </div>
                </div>
                <span className="text-[9px] text-dim group-hover/branch:text-primary transition-colors tracking-wider uppercase">VIEW →</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded border border-primary/30 bg-primary/20 flex items-center justify-center mt-0.5">
          <User size={14} className="text-primary" />
        </div>
      )}
    </div>
  );
}