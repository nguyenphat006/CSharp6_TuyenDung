import { useState, useCallback, useEffect } from 'react';
import { jobService, Job, JobFilterParams, CreateJobRequest, CreateJobResponse, JobResponse } from '@/services/jobService';
import { toast } from 'sonner';

export const useJobs = (initialParams: JobFilterParams) => {
  const [jobs, setJobs] = useState<JobResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<JobFilterParams>(initialParams);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobService.getAllJobs(params);
      setJobs(response);
    } catch (err) {
      setError('Không thể tải danh sách công việc');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const createJob = useCallback(async (jobData: CreateJobRequest): Promise<CreateJobResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobService.createJob(jobData);
      await fetchJobs(); // Refresh danh sách sau khi tạo
      return response;
    } catch (err) {
      setError('Không thể tạo công việc');
      toast.error('Có lỗi xảy ra khi tạo công việc');
      console.error('Error creating job:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchJobs]);

  const updateParams = useCallback((newParams: Partial<JobFilterParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  return {
    jobs,
    loading,
    error,
    params,
    fetchJobs,
    createJob,
    updateParams
  };
}; 