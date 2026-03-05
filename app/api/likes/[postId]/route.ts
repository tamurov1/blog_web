import { NextRequest, NextResponse } from 'next/server'

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

function likesKey(postId: string) {
  return `likes:${postId}`
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

async function getCount(postId: string) {
  const response = await kv(`/scard/${encode(likesKey(postId))}`)
  const raw = Number(response?.result)
  return Number.isFinite(raw) ? raw : 0
}

async function getLiked(postId: string, deviceId: string) {
  const response = await kv(`/sismember/${encode(likesKey(postId))}/${encode(deviceId)}`)
  return Number(response?.result) === 1
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params
  const deviceId = req.nextUrl.searchParams.get('deviceId')

  if (!hasKvConfig()) {
    return NextResponse.json(
      { error: 'KV_NOT_CONFIGURED' },
      { status: 503 }
    )
  }

  const [count, liked] = await Promise.all([
    getCount(postId),
    deviceId ? getLiked(postId, deviceId) : Promise.resolve(false),
  ])

  return NextResponse.json({ count, liked })
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params
  const body = await req.json()
  const deviceId = String(body?.deviceId || '')
  const like = Boolean(body?.like)

  if (!deviceId) {
    return NextResponse.json({ error: 'MISSING_DEVICE_ID' }, { status: 400 })
  }

  if (!hasKvConfig()) {
    return NextResponse.json(
      { error: 'KV_NOT_CONFIGURED' },
      { status: 503 }
    )
  }

  if (like) {
    await kv(`/sadd/${encode(likesKey(postId))}/${encode(deviceId)}`)
  } else {
    await kv(`/srem/${encode(likesKey(postId))}/${encode(deviceId)}`)
  }

  const count = await getCount(postId)
  return NextResponse.json({ count, liked: like })
}
