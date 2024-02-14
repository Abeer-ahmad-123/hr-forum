import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isUserLogin = request.cookies.get('user-details')
  const route = request.url.split('/')[3] ?? '/'
  const redirect = NextResponse.redirect(new URL('/feeds', request.url))

  if (!isUserLogin && (route === 'saved' || route === 'profile' || !route)) {
    return redirect
  }

  if (isUserLogin && (route === 'login' || route === 'register')) {
    return redirect
  }
}

export const config = {
  matcher: ['/', '/profile', '/saved', '/login', '/register'],
}
