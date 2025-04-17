"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'Admin') {
        router.push('/admin');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <ShieldAlert className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Truy cập bị từ chối
          </h1>
          <p className="text-gray-600 mb-8">
            Bạn không có quyền truy cập vào trang quản trị. Vui lòng liên hệ với quản trị viên nếu bạn cần quyền truy cập.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Quay về trang chủ
            </Button>
            <Button
              onClick={() => router.push('/profile')}
              variant="outline"
              className="w-full"
            >
              Xem thông tin cá nhân
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
 
 
 
 
 