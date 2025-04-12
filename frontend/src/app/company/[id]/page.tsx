"use client";

import { useCompanyDetail } from "@/hooks/useCompanyDetail";
import { useCompanyJobs, Job } from "@/hooks/useCompanyJobs";
import { Building2, MapPin, Users, Clock, Briefcase, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/UserComponents/Header/Header";
import Footer from "@/components/layout/UserComponents/Footer/Footer";

const BASE_URL = 'https://localhost:7152';

export default function CompanyDetail({ params }: { params: { id: string } }) {
  const { company, loading: companyLoading, error: companyError } = useCompanyDetail(params.id);
  const { jobs, loading: jobsLoading, error: jobsError } = useCompanyJobs(params.id);
  const [activeTab, setActiveTab] = useState("giới thiệu");

  if (companyError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500">Đã có lỗi xảy ra</h1>
              <p className="text-gray-600 mt-2">{companyError}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Hàm tính thời gian đã đăng
  const getPostedTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Đăng hôm qua";
    if (diffDays < 7) return `Đăng ${diffDays} ngày trước`;
    if (diffDays < 30) return `Đăng ${Math.floor(diffDays / 7)} tuần trước`;
    return `Đăng ${Math.floor(diffDays / 30)} tháng trước`;
  };

  // Hàm format lương
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(salary);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" style={{ background: "linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)" }}>
        <div className="container mx-auto px-4 py-4 md:py-8 text-white">
          {companyLoading ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center gap-8 mb-8">
                  <Skeleton className="w-32 h-32 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          ) : company ? (
            <>
              {/* Header Section */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
                {/* Left Side */}
                <div className="flex-1">
                  <div className="p-4 md:p-6">
                    {/* Logo and Company Name */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-lg overflow-hidden">
                        <img
                          src={`${BASE_URL}${company.logoUrl}`}
                          alt={company.name}
                          className="w-full h-full object-contain p-2 sm:p-3"
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-0 mb-2">
                          <h1 className="text-2xl sm:text-3xl font-bold">{company.name}</h1>
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
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-sm sm:text-base">{company.address}</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                          <Link 
                            href={`/jobs?company=${params.id}`}
                            className="text-lg sm:text-xl font-semibold hover:text-red-400 transition-colors duration-300 underline"
                          >
                            {jobs.length} việc làm đang tuyển
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                    {/* Rating */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0">
                      <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1">
                          <h2 className="text-lg sm:text-xl font-bold">4.8/5</h2>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400"
                                fill="currentColor"
                              />
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
            </>
          ) : null}
        </div>
      </main>

      {/* Main Content Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          {companyLoading ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          ) : company ? (
            <>
              {/* Tabs Navigation */}
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
                {/* Left Side (80%) */}
                <div className="lg:w-4/5">
                  {/* Introduction Tab Content */}
                  {activeTab === "giới thiệu" && (
                    <>
                      {/* General Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Building2 className="w-6 h-6 text-[#FF4B5A]" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Mô hình công ty</h3>
                            <p className="text-gray-600">{company.companyModel}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Briefcase className="w-6 h-6 text-[#FF4B5A]" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Lĩnh vực</h3>
                            <p className="text-gray-600">{company.industry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Users className="w-6 h-6 text-[#FF4B5A]" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Quy mô nhân sự</h3>
                            <p className="text-gray-600">{company.companySize} nhân viên</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Clock className="w-6 h-6 text-[#FF4B5A]" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Thời gian làm việc</h3>
                            <p className="text-gray-600">{company.workingTime}</p>
                          </div>
                        </div>
                      </div>

                      {/* Company Introduction */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Giới thiệu công ty</h2>
                        <div className="prose max-w-none">
                          <div 
                            className="text-gray-600 leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{ __html: company.description }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Reviews Tab Content */}
                  {activeTab === "đánh giá" && (
                    <>
                      {/* Reviews Overview */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                          {/* Average Rating */}
                          <div className="text-center">
                            <div className="text-5xl font-bold text-gray-900 mb-2">4.8</div>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-6 h-6 text-yellow-400"
                                  fill="currentColor"
                                />
                              ))}
                            </div>
                            <div className="text-gray-600">1,980 đánh giá</div>
                          </div>

                          {/* Star Rating Chart */}
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

                          {/* Recommendation Chart */}
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

                      {/* Review Form */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Viết đánh giá</h2>
                        <p className="text-gray-600 mb-6">Hãy dành 1 phút để chia sẻ trải nghiệm của bạn</p>
                        
                        {/* Star Rating System */}
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

                        {/* Review Form */}
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

                  {/* Articles Tab Content */}
                  {activeTab === "bài viết" && (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Chưa có bài viết nào</p>
                    </div>
                  )}
                </div>

                {/* Right Side (20%) */}
                <div className="lg:w-1/5">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Việc làm đang tuyển</h2>
                  {jobsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-1/2 mb-2" />
                          <Skeleton className="h-3 w-2/3 mb-2" />
                          <Skeleton className="h-8 w-full mt-3" />
                        </div>
                      ))}
                    </div>
                  ) : jobsError ? (
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg text-red-600">
                      {jobsError}
                    </div>
                  ) : jobs.length > 0 ? (
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white rounded-lg overflow-hidden">
                              <img
                                src={`${BASE_URL}${company.logoUrl}`}
                                alt={company.name}
                                className="w-full h-full object-contain p-1"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{job.name}</h3>
                              <p className="text-sm text-gray-500">{getPostedTime(job.createdAt)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Briefcase className="w-4 h-4" />
                            <span>{formatSalary(job.salary)}</span>
                            <span className="text-gray-400">•</span>
                            <span>{job.quantity} vị trí</span>
                            <span className="text-gray-400">•</span>
                            <span className="capitalize">{job.level}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.skillsList.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <Link 
                              href={`/jobs/${job.id}`}
                              className="block w-full bg-[#FF4B5A] text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 text-center"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
                      Chưa có việc làm nào đang tuyển
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
      <Footer />
    </div>
  );
} 
 
 
 
 
 