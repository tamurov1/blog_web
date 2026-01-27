'use client'

import React from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useRouter } from 'next/navigation'
import { generateFlowData } from '@/utils/flowUtils'
import { blogGraph } from '@/data/blogGraph'

function BlogMapCanvas() {
  const router = useRouter()
  const { nodes: rawNodes, edges } = generateFlowData(blogGraph) 

  const [nodes] = useNodesState(
    rawNodes.map((node) => ({
      ...node,
      style: {
        ...node.style,
        borderRadius: 8,
        padding: 12,
        fontSize: 13,
        backgroundColor: node.data?.path ? '#dbeafe' : '#e0f2fe',
        whiteSpace: 'pre-line',
        cursor: node.data?.path ? 'pointer' : 'default',
        textAlign: 'center',
        minWidth: 200,
        minHeight: 80,
      },
    }))
  )

  const [edgesState] = useEdgesState(edges)

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    const path = node.data?.path
    if (path) {
      router.push(path)
    }
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesState}
      nodesDraggable={false}
      onNodeClick={onNodeClick}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.3}
      maxZoom={1.5}
      proOptions={{ hideAttribution: true }}
    >
      <MiniMap
        style={{ width: 150, height: 100 }}
        nodeColor={(n) => (n.data?.path ? '#60a5fa' : '#a5b4fc')}
      />
      <Controls showInteractive />
      <Background gap={16} />
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
