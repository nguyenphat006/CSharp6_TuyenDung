'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoginSchema } from '../schema/index'
import { useLogin } from './useLogin'
import { CheckCircle } from 'lucide-react'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { onSubmit, loading } = useLogin()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' }
  })

  const benefits = [
    "Tìm kiếm việc làm phù hợp với kỹ năng của bạn",
    "Nhận thông báo về các cơ hội việc làm mới",
    "Kết nối với nhà tuyển dụng hàng đầu",
    "Tạo hồ sơ chuyên nghiệp và nổi bật",
    "Nhận tư vấn nghề nghiệp từ chuyên gia"
  ]

  return (
    <div className="min-h-screen flex">
      {/* Phần bên trái - Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Logo và tiêu đề */}
          <div className="text-center mb-8">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={120} 
              height={40} 
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Chào mừng quay trở lại
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Đăng nhập để tiếp tục tìm kiếm cơ hội việc làm
            </p>
          </div>

          {/* Form đăng nhập */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)} {...props}>
              {/* Nút đăng nhập Google */}
              <Button 
                type="button"
                variant="outline" 
                className="w-full h-12 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <Image src="/iconSvg/google.svg" alt="Google" width={20} height={20} className="mr-2" />
                Đăng nhập với Google
              </Button>

              {/* Divider */}
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    Hoặc đăng nhập với email
                  </span>
                </div>
              </div>

              {/* Input Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email" 
                        placeholder="Nhập email của bạn"
                        className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg" 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Input Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-gray-700 dark:text-gray-200">Mật khẩu</FormLabel>
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder="Nhập mật khẩu của bạn"
                        className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg" 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Nút đăng nhập */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-[#E60023] hover:bg-[#CC001F] text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>

              {/* Link đăng ký */}
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Chưa có tài khoản?{' '}
                  <Link 
                    href="/register" 
                    className="text-blue-500 hover:text-blue-600 hover:underline font-medium transition-colors duration-300"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Phần bên phải - Lợi ích */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 dark:bg-gray-800 p-12 items-center justify-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Lợi ích khi đăng nhập
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
