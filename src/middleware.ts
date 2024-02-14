import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isUserLogin = request.cookies.get('user-details')
  const route = request.url.split('/')[3] ?? '/'
  const redirect = NextResponse.redirect(new URL('/feeds', request.url))

  if (!isUserLogin && route === 'profile') {
    return redirect
  }

  if (!route) {
    return redirect
  }

  if (!isUserLogin && route === 'saved') {
    return redirect
  }
}

export const config = {
  matcher: ['/', '/profile', '/saved'],
}
