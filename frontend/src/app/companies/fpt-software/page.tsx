"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/UserComponents/Header/Header";
import Footer from "@/components/layout/UserComponents/Footer/Footer";
import { useState } from "react";

export default function FPTSoftwarePage() {
  const [activeTab, setActiveTab] = useState("giới thiệu");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" style={{ background: "linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)" }}>
        <div className="container mx-auto px-4 py-4 md:py-8 text-white">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Phần bên trái */}
            <div className="flex-1">
              <div className="p-4 md:p-6">
                {/* Logo và tên công ty */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-lg overflow-hidden">
                    <Image
                      src="/img/company/logotest.webp"
                      alt="FPT Software Logo"
                      fill
                      className="object-contain p-2 sm:p-3"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-0 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold">FPT Software</h1>
                      <div className="flex gap-2">
                        <button className="bg-[#FF4B5A] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm">
                          Viết đánh giá
                        </button>
                        <button className="border-2 border-white text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-300 text-sm">
                          Theo dõi
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300 mb-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm sm:text-base">Hà Nội, TP.HCM, Đà Nẵng</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <Link 
                        href="/jobs?company=fpt-software"
                        className="text-lg sm:text-xl font-semibold hover:text-red-400 transition-colors duration-300 underline"
                      >
                        156 việc làm đang tuyển
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phần bên phải */}
            <div className="flex-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                {/* Điểm đánh giá */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <h2 className="text-lg sm:text-xl font-bold">4.8/5</h2>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm">(1,234 đánh giá)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-green-400 leading-none">98%</div>
                    <div className="text-gray-300 text-xs sm:text-sm">Khuyến khích làm việc</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Phần giới thiệu công ty */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          {/* Tabs điều hướng */}
          <div className="flex border-b border-gray-200 mb-8">
            <button 
              onClick={() => setActiveTab("giới thiệu")}
              className={`px-6 py-3 text-lg font-semibold ${
                activeTab === "giới thiệu" 
                  ? "text-[#FF4B5A] border-b-2 border-[#FF4B5A]" 
                  : "text-gray-600 hover:text-[#FF4B5A]"
              }`}
            >
              Giới thiệu
            </button>
            <button 
              onClick={() => setActiveTab("đánh giá")}
              className={`px-6 py-3 text-lg font-semibold flex items-center gap-2 ${
                activeTab === "đánh giá" 
                  ? "text-[#FF4B5A] border-b-2 border-[#FF4B5A]" 
                  : "text-gray-600 hover:text-[#FF4B5A]"
              }`}
            >
              Đánh giá
              <span className="bg-[#FF4B5A] text-white text-sm px-2 py-0.5 rounded-full">1,980</span>
            </button>
            <button 
              onClick={() => setActiveTab("bài viết")}
              className={`px-6 py-3 text-lg font-semibold ${
                activeTab === "bài viết" 
                  ? "text-[#FF4B5A] border-b-2 border-[#FF4B5A]" 
                  : "text-gray-600 hover:text-[#FF4B5A]"
              }`}
            >
              Bài viết
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Phần bên trái (80%) */}
            <div className="lg:w-4/5">
              {/* Nội dung tab Giới thiệu */}
              {activeTab === "giới thiệu" && (
                <>
                  {/* Thông tin chung */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Mô hình công ty</h3>
                        <p className="text-gray-600">Công ty cổ phần</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Lĩnh vực</h3>
                        <p className="text-gray-600">Công nghệ thông tin</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Quy mô nhân sự</h3>
                        <p className="text-gray-600">1000+ nhân viên</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Thời gian làm việc</h3>
                        <p className="text-gray-600">Thứ 2 - Thứ 6</p>
                      </div>
                    </div>
                  </div>

                  {/* Giới thiệu công ty */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Giới thiệu công ty</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        FPT Software là công ty công nghệ hàng đầu tại Việt Nam, chuyên cung cấp các giải pháp công nghệ thông tin và dịch vụ phần mềm cho khách hàng trong nước và quốc tế. Với hơn 30 năm kinh nghiệm, chúng tôi tự hào là đối tác chiến lược của nhiều tập đoàn công nghệ lớn trên thế giới.
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        <em>FPT Software cam kết mang đến môi trường làm việc chuyên nghiệp, năng động và sáng tạo, nơi mỗi nhân viên có cơ hội phát triển và khẳng định bản thân.</em>
                      </p>
                      <div className="flex gap-4 mt-6">
                        <a href="#" className="flex items-center gap-2 text-[#FF4B5A] hover:text-red-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                          </svg>
                          <span>Website</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 text-[#FF4B5A] hover:text-red-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span>Fanpage</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Chuyên môn */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Chuyên môn của chúng tôi</h2>
                    <div className="flex flex-wrap gap-2">
                      {['Java', 'Python', 'React', 'Angular', 'Node.js', 'DevOps', 'Cloud', 'AI/ML', 'Mobile', 'UI/UX'].map((skill) => (
                        <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Địa điểm */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Địa điểm</h2>
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Danh sách địa điểm */}
                      <div className="lg:w-1/2">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 max-h-[600px] overflow-y-auto shadow-sm hover:shadow-md transition-shadow duration-300">
                          {/* TP Hồ Chí Minh */}
                          <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-6 h-6 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <h3 className="text-lg font-semibold text-gray-900">TP Hồ Chí Minh</h3>
                            </div>
                            <div className="space-y-3">
                              <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#FF4B5A] hover:bg-red-50 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <svg className="w-5 h-5 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-[#FF4B5A] transition-colors duration-300">FPT Software Quận 1</h4>
                                    <p className="text-sm text-gray-600 mt-1">Tầng 2, Tòa nhà FPT, 17 Duy Tân, Quận 1, TP.HCM</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">4.8</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Thứ 2 - Thứ 6</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                              <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#FF4B5A] hover:bg-red-50 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <svg className="w-5 h-5 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-[#FF4B5A] transition-colors duration-300">FPT Software Quận 3</h4>
                                    <p className="text-sm text-gray-600 mt-1">Tầng 5, Tòa nhà FPT, 391 Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">4.7</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Thứ 2 - Thứ 6</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Hà Nội */}
                          <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-6 h-6 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <h3 className="text-lg font-semibold text-gray-900">Hà Nội</h3>
                            </div>
                            <div className="space-y-3">
                              <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#FF4B5A] hover:bg-red-50 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <svg className="w-5 h-5 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-[#FF4B5A] transition-colors duration-300">FPT Software Cầu Giấy</h4>
                                    <p className="text-sm text-gray-600 mt-1">Tầng 2, Tòa nhà FPT, 17 Duy Tân, Cầu Giấy, Hà Nội</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">4.9</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Thứ 2 - Thứ 6</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                              <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#FF4B5A] hover:bg-red-50 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <svg className="w-5 h-5 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-[#FF4B5A] transition-colors duration-300">FPT Software Đống Đa</h4>
                                    <p className="text-sm text-gray-600 mt-1">Tầng 5, Tòa nhà FPT, 391 Nam Kỳ Khởi Nghĩa, Đống Đa, Hà Nội</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">4.8</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Thứ 2 - Thứ 6</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Đà Nẵng */}
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-6 h-6 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <h3 className="text-lg font-semibold text-gray-900">Đà Nẵng</h3>
                            </div>
                            <div className="space-y-3">
                              <button className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#FF4B5A] hover:bg-red-50 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <svg className="w-5 h-5 text-[#FF4B5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-[#FF4B5A] transition-colors duration-300">FPT Software Đà Nẵng</h4>
                                    <p className="text-sm text-gray-600 mt-1">Tầng 2, Tòa nhà FPT, 17 Duy Tân, Quận 1, Đà Nẵng</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">4.7</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600">Thứ 2 - Thứ 6</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Google Maps */}
                      <div className="lg:w-1/2">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2693118369787!2d106.697455!3d10.775583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752d9a092f036f%3A0x742934182ed9d780!2sFPT%20Software!5e0!3m2!1svi!2s!4v1648123456789!5m2!1svi!2s"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-gray-600">4.8/5 (1,980 đánh giá)</span>
                            </div>
                            <a
                              href="https://www.google.com/maps"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FF4B5A] hover:text-red-600 flex items-center gap-1 group"
                            >
                              <span>Xem bản đồ lớn hơn</span>
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Nội dung tab Đánh giá */}
              {activeTab === "đánh giá" && (
                <>
                  {/* Tổng quan đánh giá */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                      {/* Điểm trung bình */}
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2">4.8</div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-6 h-6 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <div className="text-gray-600">1,980 đánh giá</div>
                      </div>

                      {/* Biểu đồ đánh giá sao */}
                      <div className="flex-1 w-full">
                        {[
                          { stars: 5, percentage: 75 },
                          { stars: 4, percentage: 15 },
                          { stars: 3, percentage: 7 },
                          { stars: 2, percentage: 2 },
                          { stars: 1, percentage: 1 }
                        ].map((item) => (
                          <div key={item.stars} className="flex items-center gap-2 mb-2">
                            <div className="w-12 text-sm text-gray-600">{item.stars} sao</div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <div className="w-12 text-sm text-gray-600 text-right">{item.percentage}%</div>
                          </div>
                        ))}
                      </div>

                      {/* Biểu đồ tròn khuyến khích */}
                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-2">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              className="text-gray-200"
                              strokeWidth="8"
                              stroke="currentColor"
                              fill="transparent"
                              r="58"
                              cx="64"
                              cy="64"
                            />
                            <circle
                              className="text-green-500"
                              strokeWidth="8"
                              strokeDasharray="364"
                              strokeDashoffset="7"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="58"
                              cx="64"
                              cy="64"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-2xl font-bold text-green-500">98%</div>
                          </div>
                        </div>
                        <div className="text-gray-600">Khuyến khích làm việc</div>
                      </div>
                    </div>
                  </div>

                  {/* Form đánh giá */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Viết đánh giá</h2>
                    <p className="text-gray-600 mb-6">Hãy dành 1 phút để chia sẻ trải nghiệm của bạn</p>
                    
                    {/* Hệ thống đánh giá sao */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="text-gray-600">Đánh giá của bạn:</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Form nhận xét */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Nhận xét của bạn</label>
                        <textarea
                          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B5A] focus:border-transparent"
                          placeholder="Chia sẻ trải nghiệm của bạn về công ty..."
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Bạn có khuyến khích người khác làm việc tại đây không?</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2">
                            <input type="radio" name="recommend" className="text-[#FF4B5A]" />
                            <span className="text-gray-600">Có</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="recommend" className="text-[#FF4B5A]" />
                            <span className="text-gray-600">Không</span>
                          </label>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Đánh giá của bạn sẽ được gửi ẩn danh</p>
                      <button className="bg-[#FF4B5A] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Gửi đánh giá
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Nội dung tab Bài viết */}
              {activeTab === "bài viết" && (
                <div className="text-center py-8">
                  <p className="text-gray-600">Chưa có bài viết nào</p>
                </div>
              )}
            </div>

            {/* Phần bên phải (20%) */}
            <div className="lg:w-1/5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Việc làm đang tuyển</h2>
              <div className="space-y-4">
                {/* Card việc làm */}
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden">
                      <Image
                        src="/img/company/logotest.webp"
                        alt="FPT Software Logo"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Senior Frontend Developer</h3>
                      <p className="text-sm text-gray-500">Đăng 2 ngày trước</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Hà Nội</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['React', 'TypeScript', 'Redux'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button className="w-full bg-[#FF4B5A] text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300">
                      Xem chi tiết
                    </button>
                  </div>
                </div>

                {/* Card việc làm */}
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden">
                      <Image
                        src="/img/company/logotest.webp"
                        alt="FPT Software Logo"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Backend Developer</h3>
                      <p className="text-sm text-gray-500">Đăng 5 ngày trước</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>TP.HCM</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['Java', 'Spring', 'MySQL'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button className="w-full bg-[#FF4B5A] text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 