import { Company } from "@/types/company";
import { api } from "@/lib/api";

export type { Company };

export const companyService = {
  getAll: async (): Promise<Company[]> => {
    const response = await api.get("/api/Company");
    return response.data.data;
  },

  getById: async (id: string): Promise<Company> => {
    const response = await api.get(`/api/Company/${id}`);
    return response.data.data;
  },

  create: async (company: Partial<Company>): Promise<Company> => {
    const response = await api.post("/api/Company", company);
    return response.data.data;
  },

  update: async (id: string, company: Partial<Company>): Promise<Company> => {
    const response = await api.put(`/api/Company/${id}`, company);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/Company/${id}`);
  },

  deleteMany: async (companyIds: string[]): Promise<void> => {
    await api.delete("/api/Company/delete", {
      data: { companyIds },
    });
  },
}; 