import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function firstForwardedValue(value: string | null) {
  return value?.split(',')[0]?.trim()
}

export function GET(request: NextRequest) {
  const ipAddress =
    firstForwardedValue(request.headers.get('x-forwarded-for')) ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  const startedAt = new Date().toISOString()

  console.info('[construction visit]', {
    event: 'ip-collected',
    ipAddress,
    startedAt,
  })

  return NextResponse.json({
    ipAddress,
    startedAt,
  })
}
