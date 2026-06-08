import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import {
  ConstructionVisitEvent,
  parseElapsedMs,
  saveConstructionVisit,
} from '@/lib/constructionVisitStore'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const visitEvents = new Set<ConstructionVisitEvent>([
  'started',
  'active',
  'hidden',
  'leaving',
  'unmounted',
])

function firstForwardedValue(value: string | null) {
  return value?.split(',')[0]?.trim()
}

function getIpAddress(request: NextRequest) {
  return (
    firstForwardedValue(request.headers.get('x-forwarded-for')) ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

function getVisitEvent(value: unknown): ConstructionVisitEvent {
  if (typeof value === 'string' && visitEvents.has(value as ConstructionVisitEvent)) {
    return value as ConstructionVisitEvent
  }

  return 'active'
}

function buildVisitRecord(
  request: NextRequest,
  input: {
    visitId?: unknown
    event?: unknown
    startedAt?: unknown
    elapsedMs?: unknown
  },
) {
  const eventAt = new Date().toISOString()
  const elapsedMs = parseElapsedMs(input.elapsedMs)

  return {
    visitId: typeof input.visitId === 'string' && input.visitId ? input.visitId : randomUUID(),
    event: getVisitEvent(input.event),
    ipAddress: getIpAddress(request),
    eventAt,
    startedAt: typeof input.startedAt === 'string' ? input.startedAt : eventAt,
    elapsedMs,
    timeSpentSeconds: Math.round(elapsedMs / 1000),
    userAgent: request.headers.get('user-agent') ?? undefined,
  }
}

export async function GET(request: NextRequest) {
  const visitId = randomUUID()
  const startedAt = new Date().toISOString()
  const record = buildVisitRecord(request, {
    visitId,
    event: 'started',
    startedAt,
    elapsedMs: 0,
  })

  try {
    await saveConstructionVisit(record)
  } catch (error) {
    console.error('[construction visit] neon save failed', error)

    return NextResponse.json(
      {
        error: 'Neon visit tracking is not configured or unavailable',
      },
      { status: 500 },
    )
  }

  console.info('[construction visit]', {
    event: record.event,
    visitId: record.visitId,
    ipAddress: record.ipAddress,
    startedAt,
    database: 'neon',
  })

  return NextResponse.json({
    visitId,
    ipAddress: record.ipAddress,
    startedAt,
  })
}

export async function POST(request: NextRequest) {
  let body: unknown = {}

  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const record = buildVisitRecord(
    request,
    typeof body === 'object' && body !== null ? body : {},
  )

  try {
    await saveConstructionVisit(record)
  } catch (error) {
    console.error('[construction visit] neon save failed', error)

    return NextResponse.json(
      {
        error: 'Neon visit tracking is not configured or unavailable',
      },
      { status: 500 },
    )
  }

  console.info('[construction visit]', {
    event: record.event,
    visitId: record.visitId,
    ipAddress: record.ipAddress,
    timeSpentSeconds: record.timeSpentSeconds,
    database: 'neon',
  })

  return NextResponse.json({
    ok: true,
    visitId: record.visitId,
    event: record.event,
  })
}
