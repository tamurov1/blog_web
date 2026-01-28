import { Edge, Node, Position } from 'reactflow'
import { BlogNode } from '@/data/blogGraph'
import dagre from 'dagre'

const baseNodeWidth = 240
const baseNodeHeight = 110

/**
 * Generates flow data with automatic layout using dagre
 * This ensures nodes are positioned correctly without overlaps
 */
export function generateFlowData(tree: BlogNode): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  // First pass: collect all nodes and edges
  const traverse = (node: BlogNode, parentId?: string, level = 0) => {
    const id = node.id
    const isLeaf = !node.children || node.children.length === 0
    const width = isLeaf ? baseNodeWidth + 40 : baseNodeWidth
    const height = isLeaf ? baseNodeHeight + 20 : baseNodeHeight

    nodes.push({
      id,
      type: 'blogNode',
      data: {
        title: node.title,
        author: node.author,
        date: node.date,
        isLeaf,
        level,
        path: node.path,
        width,
        height,
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

    node.children?.forEach((child) => traverse(child, id, level + 1))
  }

  traverse(tree)

  // Use dagre to calculate optimal positions
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({
    rankdir: 'TB', // Top to Bottom
    nodesep: 80, // Horizontal spacing between nodes
    ranksep: 140, // Vertical spacing between ranks
    align: 'UL', // Align nodes to upper left
    ranker: 'tight-tree',
  })

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    const width = Number(node.data?.width) || baseNodeWidth
    const height = Number(node.data?.height) || baseNodeHeight
    dagreGraph.setNode(node.id, { width, height })
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
    const width = Number(node.data?.width) || baseNodeWidth
    const height = Number(node.data?.height) || baseNodeHeight
    node.position = {
      x: nodeWithPosition.x - width / 2,
      y: nodeWithPosition.y - height / 2,
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
