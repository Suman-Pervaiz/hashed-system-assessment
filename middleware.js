import { NextResponse } from 'next/server'

export function middleware(req) {
  const token = req.cookies.get('token')?.value

  const isLoginPage = req.nextUrl.pathname.startsWith('/login')
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}