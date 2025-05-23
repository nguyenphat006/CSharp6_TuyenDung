import { api } from "@/lib/api";

export interface Resume {
  id: string;
  userId: string;
  jobId: string;
  status: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeListResponse {
  result: boolean;
  status: number;
  data: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    items: Resume[];
  };
  message: string;
}

export interface ResumeResponse {
  result: boolean;
  status: number;
  data: Resume;
  message: string;
}

export const resumeService = {
  getAll: async (): Promise<ResumeListResponse> => {
    const response = await api.get("/api/Resume");
    return response.data;
  },

  getById: async (id: string): Promise<Resume> => {
    const response = await api.get(`/api/Resume/${id}`);
    return response.data.data;
  },

  updateStatus: async (id: string, status: string): Promise<Resume> => {
    const response = await api.put(`/api/Resume/${id}/status`, { status });
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/Resume/${id}`);
  },

  deleteMany: async (resumeIds: string[]): Promise<void> => {
    await api.delete("/api/Resume/delete", {
      data: { resumeIds },
    });
  },
}; 