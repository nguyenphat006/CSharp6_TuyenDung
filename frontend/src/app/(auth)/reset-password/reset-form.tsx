'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { resetPasswordSchema as ResetPasswordSchema } from '../schema/index'
import Link from 'next/link'
import { useReset } from './useReset'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>

export function ResetPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { resetPassword, isLoading } = useReset()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Chỉ lấy email từ localStorage khi component được mount ở client
    const emailFromStorage = localStorage.getItem('resetEmail')
    const emailFromParams = searchParams.get('email')
    setEmail(emailFromParams || emailFromStorage)
  }, [searchParams])

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: email || '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  // Cập nhật giá trị email khi nó thay đổi
  useEffect(() => {
    if (email) {
      form.setValue('email', email)
    }
  }, [email, form])

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!email) {
      return
    }
    await resetPassword({
      ...data,
      email: email
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">Đặt lại mật khẩu</h1>
          <p className="text-balance text-md text-muted-foreground">
            Nhập mật khẩu mới của bạn
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-6">
          {/* Input Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Nhập mật khẩu mới" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Xác nhận mật khẩu mới" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button Submit */}
          <Button type="submit" className="w-full h-12 bg-[#6366f1] hover:bg-[#5044ee]" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
          </Button>
        </div>

        {/* Link quay về đăng nhập */}
        <div className="text-center text-sm">
          Nhớ mật khẩu?{' '}
          <Link href="/login" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Đăng nhập
          </Link>
        </div>
      </form>
    </Form>
  )
}
