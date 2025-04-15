import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Lấy thông tin user từ cookie
  const userStr = request.cookies.get('user')?.value
  const token = request.cookies.get('token')?.value

  // Kiểm tra nếu đang truy cập trang admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Nếu không có token hoặc user, chuyển về trang login
    if (!token || !userStr) {
      console.log('No token or user found, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const user = JSON.parse(userStr)
      console.log('User from cookie:', user)
      
      // Kiểm tra role
      if (user.role !== 'Admin') {
        console.log('User is not admin, redirecting to home')
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch (error) {
      console.error('Error parsing user cookie:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}