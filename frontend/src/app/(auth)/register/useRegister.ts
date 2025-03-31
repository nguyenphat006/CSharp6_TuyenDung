import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { RegisterSchema } from '../schema/index'
import { signUp } from '@/services/authService'
import { toast } from 'react-toastify'

export function useRegister() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      setLoading(true)
      const response = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        age: 0 // Mặc định là 0, có thể thêm trường age vào form nếu cần
      })
      
      console.log('Response:', response) // Để debug

      // Kiểm tra response.data.result
      if (response.data.result === true) {
        toast.success(response.data.data.message || 'Đăng ký thành công!')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        // Nếu không thành công, hiển thị message từ API response
        const errorMessage = response.data.message || 'Đăng ký thất bại'
        toast.error(errorMessage)
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
