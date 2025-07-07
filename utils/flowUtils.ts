import { Edge, Node } from 'reactflow'
import { BlogNode } from '@/data/blogGraph'

export function generateFlowData(tree: BlogNode): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  const traverse = (node: BlogNode, parentId?: string, depth = 0, index = 0) => {
    const id = node.id
    nodes.push({
      id,
      data: { label: node.title, path: node.path, author: node.author, date: node.date },
      position: { x: index * 200, y: depth * 150 },
      draggable: false,
    })

    if (parentId) {
      edges.push({ id: `${parentId}-${id}`, source: parentId, target: id })
    }

    node.children?.forEach((child, i) => traverse(child, id, depth + 1, i))
  }

  traverse(tree)
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
