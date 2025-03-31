import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { resetPasswordSchema } from '../schema/index'
import { resetPassword } from '@/services/authService'
import { toast } from 'react-toastify'

export function useReset() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      setLoading(true)
      // Lấy email từ URL hoặc localStorage
      const email = searchParams.get('email') || localStorage.getItem('resetEmail')
      
      if (!email) {
        toast.error('Không tìm thấy email, vui lòng thử lại')
        return
      }

      const response = await resetPassword(email, data.password)
      
      console.log('Response:', response) // Để debug

      if (response.result === true) {
        toast.success(response.data.message || 'Đặt lại mật khẩu thành công!')
        // Xóa email khỏi localStorage
        localStorage.removeItem('resetEmail')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        // Nếu có message từ API, hiển thị message đó
        if (response.message) {
          toast.error(response.message)
        } else {
          toast.error('Đặt lại mật khẩu thất bại')
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
