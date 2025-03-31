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
        toast.error('Email hoặc mật khẩu không tồn tại')
      }
    } catch (error: any) {
      console.error('Error:', error)
      const errorMessage = error?.response?.data?.message || 'Email hoặc mật khẩu không tồn tại'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { onSubmit, loading }
}
