import { useState, useEffect } from 'react';

const BASE_URL = 'https://localhost:7152';

export interface JobDetail {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  salary: number;
  quantity: number;
  endDate: string;
  description: string;
  requirements: string;
  benefits: string;
  skillsList: string[];
  jobType: string;
  experience: string;
  education: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export const useJobDetail = (id: string) => {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/Job/${id}`);
        if (!response.ok) {
          throw new Error('Không thể tải thông tin công việc');
        }
        const data = await response.json();
        if (data.result) {
          setJob(data.data);
        } else {
          setError(data.message || 'Không thể tải thông tin công việc');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetail();
    }
  }, [id]);

  return { job, loading, error };
}; 
 
 
 
 
 