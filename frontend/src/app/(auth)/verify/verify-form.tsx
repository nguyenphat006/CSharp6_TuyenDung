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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { VerifySchema } from '../schema/index'
import Link from 'next/link'
import { useVerify } from './useVerify'
import { useSearchParams } from 'next/navigation'

export function VerifyForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || localStorage.getItem('resetEmail')

  // React Hook Form + Zod
  const form = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
    defaultValues: { otp: '' }
  })

  const { loading, onSubmit } = useVerify()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
        {/* Tiêu đề */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">Nhập mã xác minh</h1>
          <p className="text-balance text-md text-muted-foreground">
            Chúng tôi đã gửi mã OTP gồm 6 chữ số đến email {email}. Vui lòng nhập mã bên dưới.
          </p>
        </div>

        {/* Input OTP */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Nhập mã OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button Submit */}
        <Button type="submit" className="w-full bg-[#6366f1] hover:bg-[#5044ee]" disabled={loading}>
          {loading ? 'Đang xác minh...' : 'Xác minh OTP'}
        </Button>

        {/* Link để gửi lại OTP */}
        <div className="text-center text-sm">
          Không nhận được mã?{' '}
          <button type="button" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Gửi lại OTP
          </button>
        </div>

        {/* Link quay về đăng nhập */}
        <div className="text-center text-sm">
          <Link href="/login" className="underline underline-offset-4 text-blue-500 hover:text-blue-700">
            Quay về đăng nhập
          </Link>
        </div>
      </form>
    </Form>
  )
}
