import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Định nghĩa các route cần kiểm tra quyền
const protectedRoutes = {
  '/admin/dashboard': ['Admin', 'HR'],
  '/admin/companies': ['Admin'],
  '/admin/jobs': ['Admin'],
  '/admin/applications': ['Admin', 'HR'],
  '/admin/users': ['Admin'],
  '/admin/roles': ['Admin'],
  '/admin/settings': ['Admin'],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const user = request.cookies.get('user')?.value
  const userData = user ? JSON.parse(user) : null

  // Kiểm tra nếu là route admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Nếu chưa đăng nhập, chuyển về trang login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Kiểm tra quyền truy cập
    const route = request.nextUrl.pathname
    const allowedRoles = protectedRoutes[route as keyof typeof protectedRoutes]

    if (allowedRoles && !allowedRoles.includes(userData?.role)) {
      // Nếu không có quyền, chuyển về trang dashboard
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}