'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { LoginSchema } from '../schema/index'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '@/redux/features/authSlice'
import Cookies from 'js-cookie'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

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
      console.log('Login Response:', data)

      if (!data.result) {
        throw new Error(data.message || "Đăng nhập thất bại")
      }

      // Lưu token và refreshToken vào cả localStorage và cookie
      localStorage.setItem("token", data.data.token)
      localStorage.setItem("refreshToken", data.data.refreshToken)
      Cookies.set('token', data.data.token, { expires: 7 })
      Cookies.set('refreshToken', data.data.refreshToken, { expires: 7 })
      dispatch(setToken(data.data.token))

      // Lấy thông tin chi tiết của user theo ID
      const userId = data.data.data.id
      const userResponse = await fetch(`https://localhost:7152/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${data.data.token}`,
          'Content-Type': 'application/json'
        }
      })

      const userData = await userResponse.json()
      console.log('User Detail Response:', userData)

      if (!userData.result) {
        throw new Error(userData.message || "Không thể lấy thông tin người dùng")
      }

      // Lưu thông tin chi tiết user vào cả localStorage và cookie
      localStorage.setItem("user", JSON.stringify(userData.data))
      Cookies.set('user', JSON.stringify(userData.data), { expires: 7 })
      console.log('User role from API:', userData.data.role)
      dispatch(setUser(userData.data))

      // Hiển thị thông báo thành công
      toast.success("Đăng nhập thành công! Đang chuyển hướng...")

      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        router.push("/")
      }, 2000)

    } catch (error: any) {
      toast.error(error.message || "Đăng nhập thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading }
}
