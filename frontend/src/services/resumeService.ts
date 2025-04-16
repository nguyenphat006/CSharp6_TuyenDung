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

export interface ResumeResponse {
  result: boolean;
  status: number;
  data: Resume | Resume[];
  message: string;
}

export const resumeService = {
  getAll: async (): Promise<Resume[]> => {
    const token = localStorage.getItem('token');
    const response = await api.get("/api/Resume", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data;
  },

  getById: async (id: string): Promise<Resume> => {
    const token = localStorage.getItem('token');
    const response = await api.get(`/api/Resume/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data;
  },

  updateStatus: async (id: string, status: string): Promise<Resume> => {
    const token = localStorage.getItem('token');
    const response = await api.put(`/api/Resume/${id}/status`, { status }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    await api.delete(`/api/Resume/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  deleteMany: async (resumeIds: string[]): Promise<void> => {
    const token = localStorage.getItem('token');
    await api.delete("/api/Resume/delete", {
      data: { resumeIds },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
}; 