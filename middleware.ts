import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const url = new URL(request.url)

  try {
    if (url.pathname === '/login' && cookieStore.get('token')) {
      return NextResponse.redirect(new URL('/aktiviteter', request.url))
    }
  } catch (error) {
    console.error('Error in middleware:', error)
    return NextResponse.error()
  }
}

export const config = {
  matcher: ['/login'],
}
