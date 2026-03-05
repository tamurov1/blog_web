'use client'

import React from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useRouter } from 'next/navigation'
import { generateFlowData } from '@/utils/flowUtils'
import { blogGraph } from '@/data/blogGraph'
import BlogMapNode from '@/components/BlogMapNode'

function BlogMapCanvas() {
  const router = useRouter()
  const { nodes: rawNodes, edges } = generateFlowData(blogGraph)

  const [nodes] = useNodesState(rawNodes)

  const [edgesState] = useEdgesState(
    edges.map((edge) => ({
      ...edge,
      type: 'smoothstep',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 16,
        height: 16,
        color: 'rgba(75, 85, 99, 0.45)',
      },
      style: {
        stroke: 'rgba(75, 85, 99, 0.32)',
        strokeWidth: 1.5,
      },
    }))
  )

  const onNodeClick = (_: React.MouseEvent, node: any) => {
    const path = node.data?.path
    if (path) {
      router.push(path)
    }
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesState}
      nodeTypes={{ blogNode: BlogMapNode }}
      nodesDraggable={false}
      nodesConnectable={false}
      edgesFocusable={false}
      onNodeClick={onNodeClick}
      fitView
      fitViewOptions={{ padding: 0.24, duration: 350 }}
      minZoom={0.35}
      maxZoom={1.65}
      panOnScroll
      zoomOnScroll
      selectionOnDrag={false}
      proOptions={{ hideAttribution: true }}
    >
      <MiniMap
        style={{ width: 150, height: 100 }}
        nodeColor={(n) => (n.data?.path ? '#6b7280' : '#9ca3af')}
        maskColor="rgba(243, 244, 246, 0.75)"
      />
      <Controls showInteractive />
      <Background gap={24} color="rgba(107, 114, 128, 0.16)" />
    </ReactFlow>
  )
}

export default function BlogMap() {
  return (
    <ReactFlowProvider>
      <div className="w-full h-full min-h-[380px]">
        <BlogMapCanvas />
      </div>
    </ReactFlowProvider>
  )
}
