'use client';

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { resetPasswordSchema } from '../schema/index'
import { resetPassword } from '@/services/authService'
import { toast } from 'sonner'

export const useReset = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const resetPassword = async (data: {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true)
      const response = await fetch('https://localhost:7152/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.result) {
        throw new Error(result.message || 'Không thể đặt lại mật khẩu')
      }

      // Hiển thị thông báo thành công từ API
      toast.success(result.message || 'Đặt lại mật khẩu thành công! Đang chuyển hướng đến trang đăng nhập...')
      
      // Chuyển hướng sau 5 giây
      setTimeout(() => {
        router.push('/login')
      }, 5000)

    } catch (error: any) {
      console.error('Error:', error)
      toast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại sau')
    } finally {
      setIsLoading(false)
    }
  }

  return { resetPassword, isLoading }
}
