import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as z from 'zod'
import { VerifySchema } from '../schema/index'
import { verifyOtp } from '@/services/authService'
import { toast } from 'react-toastify'

export function useVerify() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
    try {
      setLoading(true)
      // Lấy email từ URL hoặc localStorage
      const email = searchParams.get('email') || localStorage.getItem('resetEmail')
      
      if (!email) {
        toast.error('Không tìm thấy email, vui lòng thử lại')
        return
      }

      const response = await verifyOtp(email, data.otp)
      
      console.log('Response:', response) // Để debug

      if (response.data?.result === true) {
        toast.success('Xác thực OTP thành công!')
        // Chuyển hướng đến trang reset password với email trong URL
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`)
        }, 1500)
      } else {
        // Nếu có message từ API, hiển thị message đó
        if (response.data?.message) {
          toast.error(response.data.message)
        } else {
          toast.error('Mã OTP không chính xác')
        }
      }
    } catch (error: any) {
      console.error('Error:', error)
      const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra, vui lòng thử lại sau'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { loading, onSubmit }
}
