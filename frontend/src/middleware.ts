import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Kiểm tra nếu đang truy cập vào trang admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const isAdmin = req.cookies.get('role')?.value === 'admin'
    
    // Nếu không phải admin, chuyển hướng về trang chủ
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Cho phép request tiếp tục
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'] // Middleware chỉ áp dụng cho đường dẫn /admin/*
}