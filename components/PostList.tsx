'use client'
import { blogGraph, BlogNode } from '@/data/blogGraph'
import { flattenBlogPosts } from '@/utils/flowUtils'
import Link from 'next/link'

const posts = flattenBlogPosts(blogGraph)

export default function PostList() {
  return (
    <div className="h-full max-h-[400px] overflow-y-auto space-y-4 pr-2">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.path}
          className="block p-4 border border-gray-200 rounded hover:bg-gray-50 transition"
        >
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600">
            <span>By {post.author || 'Unknown Author'}</span> &nbsp;|&nbsp;{' '}
            <time dateTime={post.date}>{post.date || 'Unknown Date'}</time>
          </p>
          <p className="text-sm text-gray-500 mt-1">Link: {post.path}</p>
        </a>
      ))}
    </div>
  )
}
