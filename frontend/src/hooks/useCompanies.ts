import { useState, useEffect } from "react";
import { Company } from "@/types/company";
import { axiosClient } from "@/lib/axios-client";
import { toast } from "sonner";

interface UseCompaniesProps {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  industry?: string;
  companySize?: string;
  address?: string;
}

interface UseCompaniesReturn {
  companies: {
    data: {
      items: Company[];
      currentPage: number;
      pageSize: number;
      totalRecords: number;
      totalPages: number;
    } | null;
    loading: boolean;
    error: string | null;
  };
  updateParams: (params: Partial<UseCompaniesProps>) => void;
  fetchCompanies: () => Promise<void>;
}

export function useCompanies(initialParams: UseCompaniesProps = {}): UseCompaniesReturn {
  const [params, setParams] = useState<UseCompaniesProps>({
    pageNumber: 1,
    pageSize: 10,
    ...initialParams,
  });

  const [companies, setCompanies] = useState<UseCompaniesReturn["companies"]>({
    data: null,
    loading: false,
    error: null,
  });

  const updateParams = (newParams: Partial<UseCompaniesProps>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  const fetchCompanies = async () => {
    try {
      setCompanies((prev) => ({ ...prev, loading: true, error: null }));
      const searchParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          searchParams.append(key, value.toString());
        }
      });

      const response = await axiosClient.get(`/api/Company?${searchParams}`);
      
      if (response.data.result) {
        setCompanies({
          data: response.data.data,
          loading: false,
          error: null,
        });
      } else {
        setCompanies({
          data: null,
          loading: false,
          error: response.data.message || "Có lỗi xảy ra khi tải dữ liệu",
        });
      }
    } catch (error: any) {
      setCompanies({
        data: null,
        loading: false,
        error: error.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu",
      });
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [params]);

  return {
    companies,
    updateParams,
    fetchCompanies,
  };
} 