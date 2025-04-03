'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { LoginSchema } from '../schema/index'
import { toast } from 'sonner'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("https://localhost:7152/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!data.result) {
        throw new Error(data.message || "Đăng nhập thất bại")
      }

      localStorage.setItem("token", data.data.token)
      localStorage.setItem("refreshToken", data.data.refreshToken)
      
      // Hiển thị thông báo thành công
      toast.success("Đăng nhập thành công! Đang chuyển hướng...")
      
      // Chuyển hướng sau 5 giây
      setTimeout(() => {
        router.push("/admin/users")
      }, 5000)

    } catch (error: any) {
      toast.error(error.message || "Đăng nhập thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading }
}
