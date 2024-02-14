import { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isUserLogin = request.cookies.get('user-details')
  const route = request.url.split('/')[3] ?? '/'

  if (!isUserLogin && route === 'profile') {
    return NextResponse.redirect(new URL('/feeds', request.url))
  }
  if (!route) {
    return NextResponse.redirect(new URL('/feeds', request.url))
  }

  if (!isUserLogin && route === 'saved') {
    return NextResponse.redirect(new URL('/feeds', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/profile', '/saved'],
}
