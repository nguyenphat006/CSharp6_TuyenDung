"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useJobDetail } from "@/hooks/useJobDetail";
import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/services/jobService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, DollarSign, Building2, GraduationCap, Award, Search as SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/UserComponents/Header/Header";
import Footer from "@/components/layout/UserComponents/Footer/Footer";
import Search from "@/components/layout/UserComponents/SearchComponents/Search";

const BASE_URL = 'https://localhost:7152';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { job, loading, error } = useJobDetail(params.id);
  const { jobs, updateParams } = useJobs({
    pageNumber: 1,
    pageSize: 10,
    isActive: true
  });

  const handleSearch = (searchParams: { keyword: string; location: string; level: string }) => {
    updateParams({
      keyword: searchParams.keyword,
      location: searchParams.location,
      level: searchParams.level,
      pageNumber: 1
    });
  };

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500">Đã có lỗi xảy ra</h1>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Search Section */}
        <Search 
          onSearch={handleSearch}
          title="Tìm kiếm công việc"
          subtitle={`${jobs?.data?.totalRecords || 0} Việc làm IT cho Developer`}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Job List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Danh sách công việc</h2>
                
                {!jobs || jobs.loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="p-4 border border-gray-100 rounded-lg">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.data?.items.map((jobItem) => (
                      <div
                        key={jobItem.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          jobItem.id === params.id
                            ? "border-red-500 bg-red-50"
                            : "border-gray-100 hover:border-red-300 hover:bg-red-50/30"
                        }`}
                        onClick={() => router.push(`/jobs/${jobItem.id}`)}
                      >
                        <h3 className="font-semibold text-gray-900 mb-1">{jobItem.name}</h3>
                        <p className="text-sm text-red-600 mb-2">{jobItem.companyName}</p>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{jobItem.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>{jobItem.salary.toLocaleString()} VNĐ</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Job Detail */}
            <div className="lg:col-span-2">
              {loading ? (
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
              ) : job ? (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  {/* Header Section */}
                  <div className="flex items-center gap-8 mb-8">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                      {job.companyLogo ? (
                        <Image
                          src={`${BASE_URL}${job.companyLogo}`}
                          alt={job.companyName}
                          width={128}
                          height={128}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <Building2 className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.name}</h1>
                      <Link href={`/company/${job.companyId}`} className="text-xl text-red-600 hover:text-red-700">
                        {job.companyName}
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <DollarSign className="w-5 h-5" />
                      <span>{job.salary.toLocaleString()} VNĐ</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Briefcase className="w-5 h-5" />
                      <span>{job.level}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>Hạn nộp: {new Date(job.endDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button
                      className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg"
                    >
                      Ứng tuyển ngay
                    </Button>
                  </div>

                  {/* Main Content */}
                  <div className="mt-8">
                    {/* Job Description */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả công việc</h2>
                      <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: job.description }} />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Kỹ năng yêu cầu</h2>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsList.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <p className="text-gray-500">Không tìm thấy thông tin công việc</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 
 
 
 