import { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useConversationStore } from '@/store/conversation-store';
import { GitBranch, MessageSquare } from 'lucide-react';

function MessageNode({ data }: { data: any }) {
  return (
    <div className={`px-3 py-2 rounded-lg border max-w-[220px] ${data.isBranch ? 'border-primary/40 bg-primary/10' : 'border-border surface-2'}`}>
      <Handle type="target" position={Position.Top} className="!bg-primary !w-2 !h-2" />
      <div className="flex items-center gap-1.5 mb-1">
        {data.isBranch ? <GitBranch size={10} className="text-primary" /> : <MessageSquare size={10} className="text-dim" />}
        <span className="text-[10px] font-medium text-dim">{data.role}</span>
      </div>
      <p className="text-xs truncate">{data.content}</p>
      <Handle type="source" position={Position.Bottom} className="!bg-primary !w-2 !h-2" />
    </div>
  );
}

const nodeTypes = { messageNode: MessageNode };

export function TreeView() {
  const store = useConversationStore();
  const convId = store.activeConversationId;
  const messages = convId ? store.getConversationMessages(convId) : [];
  const branches = convId ? store.getConversationBranches(convId) : [];

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Main conversation nodes
    messages.forEach((msg, i) => {
      nodes.push({
        id: msg.id,
        type: 'messageNode',
        position: { x: 300, y: i * 100 },
        data: { role: msg.role, content: msg.content.slice(0, 80), isBranch: false },
      });
      if (i > 0) {
        edges.push({ id: `e-${messages[i-1].id}-${msg.id}`, source: messages[i-1].id, target: msg.id, style: { stroke: 'hsl(220, 14%, 25%)' } });
      }
    });

    // Branch nodes
    branches.forEach((branch, bi) => {
      const sourceIdx = messages.findIndex(m => m.id === branch.anchor.sourceMessageId);
      const branchNodeId = `branch-${branch.id}`;
      nodes.push({
        id: branchNodeId,
        type: 'messageNode',
        position: { x: 600 + bi * 260, y: (sourceIdx >= 0 ? sourceIdx : 0) * 100 + 50 },
        data: { role: 'branch', content: branch.title, isBranch: true },
      });
      if (branch.anchor.sourceMessageId) {
        edges.push({
          id: `e-${branch.anchor.sourceMessageId}-${branchNodeId}`,
          source: branch.anchor.sourceMessageId,
          target: branchNodeId,
          style: { stroke: 'hsl(142, 60%, 50%)', strokeDasharray: '5,5' },
          animated: true,
        });
      }

      // Branch messages
      const branchMsgs = store.getBranchMessages(branch.id).filter(m => m.role !== 'system');
      branchMsgs.forEach((msg, j) => {
        const bMsgId = `bmsg-${msg.id}`;
        nodes.push({
          id: bMsgId,
          type: 'messageNode',
          position: { x: 600 + bi * 260, y: (sourceIdx >= 0 ? sourceIdx : 0) * 100 + 50 + (j + 1) * 80 },
          data: { role: msg.role, content: msg.content.slice(0, 80), isBranch: true },
        });
        const prevId = j === 0 ? branchNodeId : `bmsg-${branchMsgs[j-1].id}`;
        edges.push({
          id: `e-${prevId}-${bMsgId}`,
          source: prevId,
          target: bMsgId,
          style: { stroke: 'hsl(142, 60%, 40%)' },
        });
      });
    });

    return { nodes, edges };
  }, [messages, branches, store]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: any, node: Node) => {
    if (node.id.startsWith('branch-')) {
      const branchId = node.id.replace('branch-', '');
      store.setActiveBranch(branchId);
      store.setActiveView('chat');
    }
  }, [store]);

  if (!convId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-dim">Select a conversation to view its tree.</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(220, 14%, 15%)" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
