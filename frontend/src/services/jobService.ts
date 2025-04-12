import { api } from "@/lib/api";
import { API_URL } from '@/lib/constants';

export interface JobFilterParams {
  keyword?: string;
  level?: string;
  location?: string;
  companyName?: string;
  minSalary?: number;
  maxSalary?: number;
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

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
  companyLogo: string;
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

export interface JobResponse {
  result: boolean;
  status: number;
  data: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    items: Job[];
  };
  message: string;
}

export interface CreateJobRequest {
  name: string;
  skills: string[];
  location: string;
  salary: number;
  quantity: number;
  level: string;
  description: string;
  isActive: boolean;
  companyId: string;
  startDate: string;
  endDate: string;
}

export interface CreateJobResponse {
  result: boolean;
  status: number;
  data: Job;
  message: string;
}

export interface DeleteJobsRequest {
  jobIds: string[];
}

export const jobService = {
  getAll: async (): Promise<Job[]> => {
    const response = await api.get("/api/Job");
    return response.data.data;
  },

  getById: async (id: string): Promise<Job> => {
    const response = await api.get(`/api/Job/${id}`);
    return response.data.data;
  },

  create: async (data: CreateJobRequest): Promise<Job> => {
    try {
      const response = await api.post("/api/Job", data);
      if (response.data.result) {
        return response.data.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: CreateJobRequest): Promise<Job> => {
    const response = await api.put(`/api/Job/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/Job/${id}`);
  },

  deleteMany: async (jobIds: string[]): Promise<void> => {
    await api.delete("/api/Job/delete", {
      data: { jobIds },
    });
  },

  getAllJobs: async (params: JobFilterParams): Promise<JobResponse> => {
    try {
      const response = await api.get("/api/Job", { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  getJobById: async (id: string): Promise<Job> => {
    try {
      const response = await api.get(`/api/Job/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching job by id:', error);
      throw error;
    }
  },

  createJob: async (jobData: CreateJobRequest): Promise<CreateJobResponse> => {
    try {
      const response = await api.post("/api/Job", jobData);
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  updateJob: async (id: string, jobData: Partial<Job>): Promise<Job> => {
    try {
      const response = await api.put(`/api/Job/${id}`, jobData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  deleteJob: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/Job/${id}`);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
}; 