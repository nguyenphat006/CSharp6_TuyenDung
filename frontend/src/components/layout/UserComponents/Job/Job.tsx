"use client";

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { useTopJobs } from "@/hooks/useTopJobs";
import { Skeleton } from "@/components/ui/skeleton";

const Job = () => {
  const router = useRouter();
  const { jobs, loading, error } = useTopJobs();

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Đã có lỗi xảy ra: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-6" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        123 việc làm IT hot nhất hôm nay
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
        Cập nhật liên tục các cơ hội việc làm hấp dẫn cho Developer
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-blue-500 transition-all duration-300 p-6 cursor-pointer group h-full flex flex-col relative overflow-hidden">
              {/* Corner Decoration */}
              <div className="absolute -top-4 -left-4 w-32 h-32 z-20">
                <img
                  src="/img/card.svg"
                  alt="corner decoration"
                  className="w-full h-full object-contain opacity-30"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Job Title */}
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {job.name}
                </h3>

                {/* Company Name */}
                <p className="text-gray-600 mb-4">{job.companyName}</p>

                {/* Job Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary.toLocaleString()} VNĐ</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.quantity} vị trí</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Hạn nộp: {new Date(job.endDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {job.skillsList.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          variant="contained"
          size="large"
          sx={{ 
            py: 2,
            px: 6,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1.125rem',
            borderRadius: '8px',
            background: 'linear-gradient(269.85deg, rgb(84, 21, 28) 0%, rgb(18, 18, 18) 54.89%)',
            '&:hover': {
              background: 'linear-gradient(269.85deg, rgb(94, 31, 38) 0%, rgb(28, 28, 28) 54.89%)',
            }
          }}
          onClick={() => router.push('/jobs')}
        >
          Xem thêm 123 việc làm khác
        </Button>
      </div>
    </div>
  );
};

export default Job;
