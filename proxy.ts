import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const blockedExtensionPattern = /\.(doc|docx)$/i

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (blockedExtensionPattern.test(path)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
