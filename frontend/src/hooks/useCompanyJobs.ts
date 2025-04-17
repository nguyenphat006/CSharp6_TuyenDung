import { useState, useEffect } from 'react';

export interface Job {
  id: string;
  name: string;
  skills: string;
  skillsList: string[];
  location: string;
  salary: number;
  quantity: number;
  level: string;
  companyId: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  isActive: boolean;
  deletedBy: string | null;
  isDeleted: boolean;
}

interface ApiResponse {
  result: boolean;
  status: number;
  data: Job[];
  message: string;
}

const BASE_URL = 'https://localhost:7152';

export const useCompanyJobs = (companyId: string) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/Job/${companyId}/jobsBycompany`);
        
        if (!response.ok) {
          throw new Error('Không thể tải danh sách việc làm');
        }
        
        const data: ApiResponse = await response.json();
        if (data.result) {
          setJobs(data.data);
        } else {
          throw new Error(data.message || 'Đã xảy ra lỗi khi tải danh sách việc làm');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchJobs();
    }
  }, [companyId]);

  return { jobs, loading, error };
}; 
 
 
 
 
 