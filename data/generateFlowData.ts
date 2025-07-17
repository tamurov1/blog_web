// this is a test version of generating a flaw, it's still has issues with positioning

import { Edge, Node, Position } from 'reactflow'
import { BlogNode } from './blogGraph'

const nodeWidth = 220
const nodeHeight = 80
const horizontalSpacing = 40
const verticalSpacing = 120

export function generateFlowData(tree: BlogNode): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const occupiedPositions: Record<number, number[]> = {}

  function isPositionOccupied(x: number, y: number) {
    const xs = occupiedPositions[y] || []
    return xs.some(occupiedX => Math.abs(occupiedX - x) < nodeWidth + horizontalSpacing)
  }

  function markPosition(x: number, y: number) {
    if (!occupiedPositions[y]) occupiedPositions[y] = []
    occupiedPositions[y].push(x)
  }

  function traverse(
    node: BlogNode,
    parentId: string | null = null,
    parentX = 0,
    parentY = 0
  ) {
    let x = parentX
    let y = parentY + verticalSpacing

    while (isPositionOccupied(x, y)) {
      x += nodeWidth + horizontalSpacing
    }
    markPosition(x, y)

    const isLeaf = !node.children || node.children.length === 0

    nodes.push({
      id: node.id,
      data: {
        label: isLeaf
          ? `${node.title}\n${node.author || 'Unknown'} — ${node.date || 'Unknown'}`
          : node.title,
        ...(isLeaf && {
          path: node.path,
          author: node.author,
          date: node.date,
        }),
      },
      position: { x, y },
      style: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: isLeaf ? '#dbeafe' : '#e0f2fe',
        whiteSpace: 'pre-line',
        fontSize: 12,
        textAlign: 'center',
        cursor: isLeaf && node.path ? 'pointer' : 'default',
      },
      draggable: false,
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    })

    if (parentId) {
      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
      })
    }

    let childX = x
    node.children?.forEach(child => {
      traverse(child, node.id, childX, y)
      childX += nodeWidth + horizontalSpacing
    })
  }

  nodes.push({
    id: tree.id,
    data: { label: tree.title },
    position: { x: 0, y: 0 },
    style: {
      padding: 10,
      borderRadius: 6,
      backgroundColor: '#e0f2fe',
      fontSize: 14,
      textAlign: 'center',
    },
    draggable: false,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  })

  tree.children?.forEach(child => {
    traverse(child, tree.id, 0, 0)
  })

  return { nodes, edges }
}
