import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const blockedExtensionPattern = /\.(doc|docx)$/i
const publicAssetPattern = /\.(ico|png|jpg|jpeg|svg|gif|webp|avif|mp3|wav|ogg|m4a|mp4|webm|mov|txt|xml|webmanifest|css|js|map|json|woff|woff2|ttf|otf)$/i
const homePath = '/'

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (blockedExtensionPattern.test(path)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  if (
    path !== homePath &&
    !path.startsWith('/_next') &&
    !path.startsWith('/api') &&
    !publicAssetPattern.test(path)
  ) {
    const url = req.nextUrl.clone()
    url.pathname = homePath
    url.search = ''

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
