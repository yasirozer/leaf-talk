import { useMemo, useCallback, useEffect } from 'react';
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
  const allBranches = convId ? store.getConversationBranches(convId) : [];

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Track all node IDs for linking
    // Map: messageId -> nodeId in the graph
    const msgIdToNodeId = new Map<string, string>();

    // Main conversation nodes
    messages.forEach((msg, i) => {
      nodes.push({
        id: msg.id,
        type: 'messageNode',
        position: { x: 300, y: i * 100 },
        data: { role: msg.role, content: msg.content.slice(0, 80), isBranch: false },
      });
      msgIdToNodeId.set(msg.id, msg.id);
      if (i > 0) {
        edges.push({ id: `e-${messages[i-1].id}-${msg.id}`, source: messages[i-1].id, target: msg.id, style: { stroke: 'hsl(220, 14%, 25%)' } });
      }
    });

    // Recursive function to render a branch and its sub-branches
    const renderBranch = (branch: typeof allBranches[0], columnIndex: number, depth: number) => {
      const sourceNodeId = msgIdToNodeId.get(branch.anchor.sourceMessageId);
      // Find source position
      const sourceNode = nodes.find(n => n.id === sourceNodeId);
      const sourceY = sourceNode ? sourceNode.position.y : 0;
      const xOffset = 300 + (columnIndex + 1) * 280;

      const branchNodeId = `branch-${branch.id}`;
      nodes.push({
        id: branchNodeId,
        type: 'messageNode',
        position: { x: xOffset, y: sourceY + 50 },
        data: { role: 'branch', content: branch.title, isBranch: true },
      });

      if (sourceNodeId) {
        edges.push({
          id: `e-${sourceNodeId}-${branchNodeId}`,
          source: sourceNodeId,
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
          position: { x: xOffset, y: sourceY + 50 + (j + 1) * 80 },
          data: { role: msg.role, content: msg.content.slice(0, 80), isBranch: true },
        });
        msgIdToNodeId.set(msg.id, bMsgId);
        const prevId = j === 0 ? branchNodeId : `bmsg-${branchMsgs[j-1].id}`;
        edges.push({
          id: `e-${prevId}-${bMsgId}`,
          source: prevId,
          target: bMsgId,
          style: { stroke: 'hsl(142, 60%, 40%)' },
        });
      });

      return branchMsgs;
    };

    // Build branches level by level to handle nesting
    // First, render all branches, tracking column index
    let colIdx = 0;
    // Sort branches by creation time to process parents before children
    const sortedBranches = [...allBranches].sort((a, b) => a.createdAt - b.createdAt);
    
    for (const branch of sortedBranches) {
      renderBranch(branch, colIdx, 0);
      colIdx++;
    }

    return { nodes, edges };
  }, [messages, allBranches, store]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

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
