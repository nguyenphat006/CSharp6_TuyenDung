'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { ForgotPasswordSchema } from '../schema/index'
import { sendOtp } from '@/services/authService'
import { toast } from 'sonner'

export function useForgotPassword() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      setLoading(true)
      const response = await sendOtp(data.email)
      
      console.log('Response:', response) // Để debug

      // Kiểm tra response.data.result
      if (response.data?.result === true) {
        // Nếu email tồn tại và gửi OTP thành công
        toast.success(response.data.message || 'Đã gửi email khôi phục mật khẩu! Vui lòng kiểm tra hộp thư của bạn.')
        // Lưu email vào localStorage
        localStorage.setItem('resetEmail', data.email)
        // Chuyển hướng đến trang verify với email trong URL
        setTimeout(() => {
          router.push(`/verify?email=${encodeURIComponent(data.email)}`)
        }, 5000)
      } else {
        // Nếu có message từ API, hiển thị message đó
        if (response.data?.message) {
          toast.error(response.data.message)
        } else {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
        }
      }
    } catch (error: any) {
      console.error('Error:', error)
      // Xử lý các lỗi khác
      const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra, vui lòng thử lại sau'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { loading, onSubmit }
}
