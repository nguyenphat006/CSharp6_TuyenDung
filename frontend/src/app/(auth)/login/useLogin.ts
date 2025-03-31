import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { LoginSchema } from '../schema/index'
import { login } from '@/services/authService'
import { toast } from 'react-toastify'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      setLoading(true)
      const response = await login(data)
      
      if (response.status === 200) {
        toast.success(response.message)
        router.push('/admin/dashboard')
      } else {
        toast.error(response.message || 'Đăng nhập thất bại')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
    } finally {
      setLoading(false)
    }
  }

  return { onSubmit, loading }
}
