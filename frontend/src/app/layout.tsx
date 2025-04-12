import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Providers } from "@/redux/provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { AuthProvider } from "@/components/auth-provider"

// Sử dụng font từ Google Fonts
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: "Website tuyển dụng",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <Providers>
            <AuthProvider>
              {children}
              <Toaster richColors />
            </AuthProvider>
          </Providers>
        </QueryProvider>
      </body>
    </html>
  )
}
