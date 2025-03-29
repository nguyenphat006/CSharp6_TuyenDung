"use client";

import React from "react";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";

export default function DashboardPage() {
  // Hook sẽ tự động cập nhật tiêu đề dựa trên đường dẫn
  useSetPageTitle();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Tổng số tin tuyển dụng</h2>
        <p className="text-3xl font-bold text-[#4F46E5]">156</p>
        <p className="text-sm text-green-500 mt-2">+8 tin mới trong tháng này</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Ứng viên mới</h2>
        <p className="text-3xl font-bold text-[#4F46E5]">1,245</p>
        <p className="text-sm text-green-500 mt-2">+15% so với tháng trước</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Tin chờ duyệt</h2>
        <p className="text-3xl font-bold text-[#4F46E5]">23</p>
        <p className="text-sm text-red-500 mt-2">+5 tin từ hôm qua</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">📝</span>
            </div>
            <div>
              <p className="font-medium">Tin tuyển dụng mới #1234</p>
              <p className="text-sm text-gray-500">2 phút trước</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">👥</span>
            </div>
            <div>
              <p className="font-medium">Ứng viên mới đăng ký</p>
              <p className="text-sm text-gray-500">15 phút trước</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">✅</span>
            </div>
            <div>
              <p className="font-medium">Tin tuyển dụng đã được duyệt #5678</p>
              <p className="text-sm text-gray-500">1 giờ trước</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Tác vụ nhanh</h2>
        <div className="space-y-3">
          <button className="w-full py-2 px-4 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors">
            Đăng tin tuyển dụng mới
          </button>
          <button className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
            Xem báo cáo thống kê
          </button>
          <button className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
            Quản lý tin tuyển dụng
          </button>
        </div>
      </div>
    </div>
  );
}

