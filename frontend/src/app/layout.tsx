import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Providers } from "@/redux/provider"
import { QueryProvider } from "@/components/providers/query-provider"

// Sử dụng font từ Google Fonts
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: "Hệ thống quản lý tuyển dụng",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <Providers>
            {children}
            <Toaster richColors />
          </Providers>
        </QueryProvider>
      </body>
    </html>
  )
}
