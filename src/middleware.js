import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  if (!isPublicPath && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('next', path)
    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: [
    '/profile',
    '/login',
    '/signup',
    '/recipes/:id',
    '/verifyemail',
    '/upload'
  ]
}
