'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { RegisterSchema } from '../schema/index'
import { signUp } from '@/services/authService'
import { toast } from 'sonner'

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true)
      const response = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        age: 0 // Mặc định là 0, có thể thêm trường age vào form nếu cần
      })
      
      console.log('Response:', response) // Để debug

      if (!response.data.result) {
        throw new Error(response.data.message || 'Đăng ký thất bại')
      }

      // Hiển thị thông báo thành công
      toast.success('Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...')
      
      // Chuyển hướng sau 5 giây
      setTimeout(() => {
        router.push('/login')
      }, 5000)

    } catch (error: any) {
      console.error('Error:', error)
      const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra, vui lòng thử lại sau'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading }
}
