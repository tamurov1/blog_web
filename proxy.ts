import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const blockedExtensionPattern = /\.(doc|docx)$/i
const publicAssetPattern = /\.(ico|png|jpg|jpeg|svg|gif|webp|avif|mp4|webm|mov|txt|xml|css|js|map|json|woff|woff2|ttf|otf)$/i
const constructionPath = '/construction'

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (blockedExtensionPattern.test(path)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  if (
    path !== constructionPath &&
    !path.startsWith('/_next') &&
    !path.startsWith('/api') &&
    !publicAssetPattern.test(path)
  ) {
    const url = req.nextUrl.clone()
    url.pathname = constructionPath
    url.search = ''

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
