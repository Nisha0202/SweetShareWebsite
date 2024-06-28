
//protected routes

import { NextResponse } from 'next/server'

export function middleware(request) {

 //finding my current path
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }
    
}

 
//the paths middleware will work with
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/recipes/id',
    '/verifyemail',
    '/upload'
  ]
}