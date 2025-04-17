"use client";

import React, { useEffect } from "react";
import { Sidebar } from "@/components/layout/AdminComponents/Sidebar";
import { Header } from "@/components/layout/AdminComponents/Header/Header";
import { SidebarProvider } from "@/lib/context/SidebarContext";
import { PageTitleProvider } from "@/lib/context/PageTitleContext";
import { useSidebar } from "@/lib/context/SidebarContext";
import { cn } from "@/lib/utils";
import { AdminProtected } from "@/components/admin-protected";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Cookies from 'js-cookie';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isMobileOpen } = useSidebar();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const checkAuth = () => {
      // Kiểm tra từ cookie nếu không có trong Redux
      if (!user) {
        const userCookie = Cookies.get('user');
        const token = Cookies.get('token');

        if (!userCookie || !token) {
          console.log('No auth found, redirecting to login');
          router.push('/login');
          return;
        }

        try {
          const userData = JSON.parse(userCookie);
          if (userData.role !== 'Admin' && userData.role !== 'HR') {
            console.log('User is not admin or HR, redirecting to home');
            router.push('/');
            return;
          }
        } catch (error) {
          console.error('Error parsing user cookie:', error);
          router.push('/login');
          return;
        }
      } else if (user.role !== 'Admin' && user.role !== 'HR') {
        console.log('User is not admin or HR, redirecting to home');
        router.push('/');
        return;
      }
    };

    checkAuth();
  }, [user, router]);

  // Nếu không có user hoặc không phải admin/HR, không render gì cả
  if (!user || (user.role !== 'Admin' && user.role !== 'HR')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main 
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out pt-20",
          {
            "lg:ml-80": isExpanded && !isMobileOpen,
            "lg:ml-24": !isExpanded && !isMobileOpen,
            "ml-0": !isMobileOpen,
            "ml-80": isMobileOpen
          }
        )}
      >
        <div className="p-4 md:p-6 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProtected>
      <SidebarProvider>
        <PageTitleProvider>
          <AdminLayoutContent>{children}</AdminLayoutContent>
        </PageTitleProvider>
      </SidebarProvider>
    </AdminProtected>
  );
}
