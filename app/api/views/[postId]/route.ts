import { NextResponse } from 'next/server'

const KV_URL =
  process.env.Personal_KV_REST_API_URL ||
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL

const KV_TOKEN =
  process.env.Personal_KV_REST_API_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN

function hasKvConfig() {
  return Boolean(KV_URL && KV_TOKEN)
}

function viewsKey(postId: string) {
  return `views:${postId}`
}

function encode(part: string) {
  return encodeURIComponent(part)
}

async function kv(path: string) {
  if (!KV_URL || !KV_TOKEN) {
    throw new Error('KV not configured')
  }

  const res = await fetch(`${KV_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`KV request failed: ${res.status}`)
  }

  return res.json()
}

async function getViews(postId: string) {
  const response = await kv(`/get/${encode(viewsKey(postId))}`)
  const raw = Number(response?.result || 0)
  return Number.isFinite(raw) ? raw : 0
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params

  if (!hasKvConfig()) {
    return NextResponse.json({ error: 'KV_NOT_CONFIGURED' }, { status: 503 })
  }

  return NextResponse.json({ count: await getViews(postId) })
}

export async function POST(
  _req: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params

  if (!hasKvConfig()) {
    return NextResponse.json({ error: 'KV_NOT_CONFIGURED' }, { status: 503 })
  }

  const response = await kv(`/incr/${encode(viewsKey(postId))}`)
  const raw = Number(response?.result || 0)
  return NextResponse.json({ count: Number.isFinite(raw) ? raw : 0 })
}
