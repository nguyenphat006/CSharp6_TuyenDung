"use client";

import Company from "./company";
import { useCompany } from "@/hooks/useCompany";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const BASE_URL = 'https://localhost:7152';

const CompanyList = () => {
  const { topCompanies, loading, error } = useCompany();
  const [jobCounts, setJobCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchJobCounts = async () => {
      const counts: Record<string, number> = {};
      
      if (topCompanies) {
        for (const company of topCompanies) {
          try {
            const response = await fetch(`${BASE_URL}/api/Job/${company.id}/jobsBycompany`);
            if (response.ok) {
              const data = await response.json();
              if (data.result) {
                counts[company.id] = data.data.length;
              }
            }
          } catch (error) {
            console.error(`Error fetching jobs for company ${company.id}:`, error);
            counts[company.id] = 0;
          }
        }
        
        setJobCounts(counts);
      }
    };

    if (topCompanies && topCompanies.length > 0) {
      fetchJobCounts();
    }
  }, [topCompanies]);

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Đã có lỗi xảy ra khi tải dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
        Nhà tuyển dụng hàng đầu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))
        ) : topCompanies ? (
          topCompanies.map((company) => (
            <Company
              key={company.id}
              logo={`${BASE_URL}${company.logoUrl}`}
              name={company.name}
              skills={[company.industry]}
              locations={[company.address]}
              jobCount={jobCounts[company.id] || 0}
              href={`/company/${company.id}`}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default CompanyList; 