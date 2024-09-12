import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isUserLogin = request.cookies.get('user-details')
  const route = request.url.split('/')[3] ?? '/'
  const redirect = NextResponse.redirect(new URL('/feeds', request.url))
  const pathname = request.nextUrl.pathname
  const requestHeaders = new Headers(request.headers)
  if (!pathname.includes('static')) {
    requestHeaders.set('x-next-pathname', pathname)
  }

  if (!isUserLogin && (route === 'saved' || route === 'profile')) {
    return redirect
  }

  if (!route) {
    return redirect
  }

  if (isUserLogin && (route === 'login' || route === 'register')) {
    return redirect
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/', '/profile', '/saved', '/login', '/register', '/error'],
}
