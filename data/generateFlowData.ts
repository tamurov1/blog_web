import dagre from 'dagre'
import { Edge, Node } from 'reactflow'
import { BlogNode } from './blogGraph'

// Initialize the dagre graph
const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

// Node dimensions (consistent layout)
const nodeWidth = 220
const nodeHeight = 80

export function generateFlowData(tree: BlogNode): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  const traverse = (node: BlogNode, parentId?: string) => {
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
  position: { x: 0, y: 0 }, // Will be updated by dagre
  style: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: isLeaf ? '#dbeafe' : '#e0f2fe',
    whiteSpace: 'pre-line',
    fontSize: 12,
    textAlign: 'center',
  },
  draggable: false,
})

    if (parentId) {
      edges.push({ id: `${parentId}-${node.id}`, source: parentId, target: node.id })
    }

    node.children?.forEach(child => traverse(child, node.id))
  }

  traverse(tree)

  // DAG layout config (Top to Bottom)
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 30, ranksep: 60 })

  // Set dagre nodes
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  // Set dagre edges
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // Perform layout
  dagre.layout(dagreGraph)

  // Apply computed positions
  nodes.forEach(node => {
    const pos = dagreGraph.node(node.id)
    node.position = {
      x: pos.x - nodeWidth / 2,
      y: pos.y - nodeHeight / 2,
    }
  })

  return { nodes, edges }
}
