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
        color: 'rgba(15, 23, 42, 0.35)',
      },
      style: {
        stroke: 'rgba(15, 23, 42, 0.28)',
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
      fitViewOptions={{ padding: 0.35 }}
      minZoom={0.25}
      maxZoom={1.8}
      defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
      panOnScroll
      zoomOnScroll
      selectionOnDrag={false}
      proOptions={{ hideAttribution: true }}
    >
      <MiniMap
        style={{ width: 150, height: 100 }}
        nodeColor={(n) => (n.data?.path ? '#60a5fa' : '#c7d2fe')}
      />
      <Controls showInteractive />
      <Background gap={24} color="rgba(15, 23, 42, 0.06)" />
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
