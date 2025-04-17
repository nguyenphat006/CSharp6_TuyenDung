"use client";

import React from "react";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";

export default function SettingsPage() {
  useSetPageTitle();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Cài đặt hệ thống</h1>
        
        {/* Cài đặt chung */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Cài đặt chung</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên website
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="Nhập tên website"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email liên hệ
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="Nhập email liên hệ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại liên hệ
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>
        </div>

        {/* Cài đặt tin tuyển dụng */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Cài đặt tin tuyển dụng</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian tin mặc định (ngày)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="Nhập số ngày"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số tin tối đa cho mỗi tài khoản
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="Nhập số tin"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Yêu cầu duyệt tin trước khi đăng
              </label>
            </div>
          </div>
        </div>

        {/* Cài đặt ứng viên */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Cài đặt ứng viên</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Yêu cầu xác thực email khi đăng ký
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Cho phép ứng viên tạo CV trực tuyến
              </label>
            </div>
          </div>
        </div>

        {/* Cài đặt thông báo */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Cài đặt thông báo</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Gửi email thông báo khi có tin mới
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Gửi email thông báo khi tin sắp hết hạn
              </label>
            </div>
          </div>
        </div>

        {/* Nút lưu cài đặt */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors">
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
} 