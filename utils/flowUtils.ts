import { Edge, Node, Position } from 'reactflow'
import { BlogNode } from '@/data/blogGraph'
import dagre from 'dagre'

const nodeWidth = 220
const nodeHeight = 100

/**
 * Generates flow data with automatic layout using dagre
 * This ensures nodes are positioned correctly without overlaps
 */
export function generateFlowData(tree: BlogNode): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  // First pass: collect all nodes and edges
  const traverse = (node: BlogNode, parentId?: string) => {
    const id = node.id
    const isLeaf = !node.children || node.children.length === 0

    nodes.push({
      id,
      data: {
        label: isLeaf
          ? `${node.title}\n${node.author || 'Unknown'} — ${node.date || 'Unknown'}`
          : node.title,
        path: node.path,
        author: node.author,
        date: node.date,
      },
      // Position will be set by dagre
      position: { x: 0, y: 0 },
      draggable: false,
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    })

    if (parentId) {
      edges.push({
        id: `${parentId}-${id}`,
        source: parentId,
        target: id,
      })
    }

    node.children?.forEach((child) => traverse(child, id))
  }

  traverse(tree)

  // Use dagre to calculate optimal positions
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({
    rankdir: 'TB', // Top to Bottom
    nodesep: 50, // Horizontal spacing between nodes
    ranksep: 120, // Vertical spacing between ranks
    align: 'UL', // Align nodes to upper left
  })

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // Calculate layout
  dagre.layout(dagreGraph)

  // Update node positions from dagre
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    }
  })

  return { nodes, edges }
}

export function flattenBlogPosts(node: BlogNode): BlogNode[] {
  const posts: BlogNode[] = []

  const collect = (n: BlogNode) => {
    if (!n.children || n.children.length === 0) {
      posts.push(n)
    } else {
      n.children.forEach(collect)
    }
  }

  collect(node)
  return posts
}
