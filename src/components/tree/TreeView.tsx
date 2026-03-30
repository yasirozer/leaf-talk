import { useMemo, useCallback, useEffect, useRef } from 'react';
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
    <div className={`px-3 py-2 rounded-lg border max-w-[220px] shadow-md cursor-grab active:cursor-grabbing ${data.isBranch ? 'border-primary/40 bg-primary/10' : 'border-border surface-2'}`}>
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

const NODE_WIDTH = 240;
const NODE_HEIGHT_GAP = 90;
const BRANCH_X_GAP = 280;
const MAIN_X = 100;

export function TreeView() {
  const store = useConversationStore();
  const convId = store.activeConversationId;
  const messages = convId ? store.getConversationMessages(convId) : [];
  const allBranches = convId ? store.getConversationBranches(convId) : [];

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const msgIdToNodeId = new Map<string, string>();
    // Track each node's position for child branch placement
    const nodePositions = new Map<string, { x: number; y: number }>();
    // Track how many branches have been placed from each source node to fan them out
    const sourceBranchCount = new Map<string, number>();
    // Track the rightmost x used at each "column depth" to avoid overlaps
    let globalMaxX = MAIN_X;

    // Main conversation nodes
    messages.forEach((msg, i) => {
      const pos = { x: MAIN_X, y: i * NODE_HEIGHT_GAP };
      nodes.push({
        id: msg.id,
        type: 'messageNode',
        position: pos,
        data: { role: msg.role, content: msg.content.slice(0, 80), isBranch: false },
      });
      msgIdToNodeId.set(msg.id, msg.id);
      nodePositions.set(msg.id, pos);
      if (i > 0) {
        edges.push({
          id: `e-${messages[i - 1].id}-${msg.id}`,
          source: messages[i - 1].id,
          target: msg.id,
          style: { stroke: 'hsl(220, 14%, 25%)' },
        });
      }
    });

    // Sort branches by creation time so parents are processed before children
    const sortedBranches = [...allBranches].sort((a, b) => a.createdAt - b.createdAt);

    for (const branch of sortedBranches) {
      const sourceNodeId = msgIdToNodeId.get(branch.anchor.sourceMessageId);
      const sourcePos = sourceNodeId ? nodePositions.get(sourceNodeId) : null;
      const sourceY = sourcePos ? sourcePos.y : 0;
      const sourceX = sourcePos ? sourcePos.x : MAIN_X;

      // Count how many branches already come from this source to fan them out
      const countFromSource = sourceBranchCount.get(branch.anchor.sourceMessageId) || 0;
      sourceBranchCount.set(branch.anchor.sourceMessageId, countFromSource + 1);

      // Place branch to the right of the source, staggered if multiple from same source
      const xOffset = Math.max(sourceX + BRANCH_X_GAP, globalMaxX + BRANCH_X_GAP) + countFromSource * BRANCH_X_GAP;

      const branchNodeId = `branch-${branch.id}`;
      const branchPos = { x: xOffset, y: sourceY + 50 };
      nodes.push({
        id: branchNodeId,
        type: 'messageNode',
        position: branchPos,
        data: { role: 'branch', content: branch.title, isBranch: true },
      });
      nodePositions.set(branchNodeId, branchPos);

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
        const msgPos = { x: xOffset, y: sourceY + 50 + (j + 1) * NODE_HEIGHT_GAP };
        nodes.push({
          id: bMsgId,
          type: 'messageNode',
          position: msgPos,
          data: { role: msg.role, content: msg.content.slice(0, 80), isBranch: true },
        });
        msgIdToNodeId.set(msg.id, bMsgId);
        nodePositions.set(bMsgId, msgPos);
        // Also store with original msg.id for sub-branch lookup
        nodePositions.set(msg.id, msgPos);

        const prevId = j === 0 ? branchNodeId : `bmsg-${branchMsgs[j - 1].id}`;
        edges.push({
          id: `e-${prevId}-${bMsgId}`,
          source: prevId,
          target: bMsgId,
          style: { stroke: 'hsl(142, 60%, 40%)' },
        });
      });

      // Update globalMaxX to prevent future branches from overlapping
      globalMaxX = Math.max(globalMaxX, xOffset);
    }

    return { nodes, edges };
  }, [messages, allBranches, store]);

  const prevDataRef = useRef<string>('');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const dataKey = JSON.stringify({ m: messages.map(m => m.id), b: allBranches.map(b => b.id) });
    if (dataKey !== prevDataRef.current) {
      prevDataRef.current = dataKey;
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges, messages, allBranches]);

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
        nodesDraggable
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(220, 14%, 15%)" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
