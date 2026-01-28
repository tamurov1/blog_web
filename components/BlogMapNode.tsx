'use client'

import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'

type BlogNodeData = {
  title: string
  author?: string
  date?: string
  isLeaf?: boolean
  level?: number
  path?: string
}

function BlogMapNode({ data }: NodeProps<BlogNodeData>) {
  const isLeaf = Boolean(data?.isLeaf)
  const level = Number(data?.level || 0)
  const depthTint = Math.min(level * 8, 28)

  const isClickable = Boolean(data?.path)

  return (
    <div
      className="group relative rounded-2xl border border-black/10 bg-white/85 px-5 py-4 text-left shadow-lg backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        boxShadow: `0 10px 30px rgba(15, 23, 42, 0.12), inset 0 0 0 1px rgba(255,255,255,0.5)`,
        background: isLeaf
          ? `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(239,246,255,0.85))`
          : `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(224,242,254,0.85))`,
        borderColor: `rgba(15, 23, 42, 0.08)`,
        cursor: isClickable ? 'pointer' : 'default',
      }}
    >
      <div className="absolute -top-3 right-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-slate-600 shadow-sm ring-1 ring-black/5">
        {isLeaf ? 'Post' : 'Group'}
      </div>
      {isClickable && (
        <div className="absolute -top-3 left-4 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-200/80">
          Open
        </div>
      )}
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
        Level {level + 1}
      </div>
      <div className="text-sm font-semibold text-slate-900 leading-snug">{data?.title}</div>
      {isLeaf && (
        <div className="mt-3 text-xs text-slate-600">
          <div className="font-medium">{data?.author || 'Unknown author'}</div>
          <div className="mt-1 text-[11px] text-slate-500">{data?.date || 'Unknown date'}</div>
        </div>
      )}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 20% 10%, rgba(59,130,246,0.18), transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.35), 0 0 0 2px rgba(15, 23, 42, 0.08)`,
        }}
      />
      <div
        className="absolute inset-x-5 bottom-2.5 h-1.5 rounded-full"
        style={{
          background: `linear-gradient(90deg, rgba(59,130,246,0.35), rgba(14,116,144,0.55))`,
          opacity: isLeaf ? 0.85 : 0.6,
          filter: `hue-rotate(${depthTint}deg)`,
        }}
      />
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-0 !bg-slate-300/70" />
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-0 !bg-slate-300/70" />
    </div>
  )
}

export default memo(BlogMapNode)
