"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/UserComponents/Header/Header";
import Footer from "@/components/layout/UserComponents/Footer/Footer";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng đến trang jobs với tham số id
    router.push(`/jobs?id=${params.id}`);
  }, [params.id, router]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Đang chuyển hướng...</p>
        </div>
      </div>
      <Footer />
    </>
  );
} 
 
 
 