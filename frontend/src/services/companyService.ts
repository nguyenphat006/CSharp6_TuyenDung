import { Company } from "@/types/company";
import { api } from "@/lib/api";

export type { Company };

export const companyService = {
  getAll: async (): Promise<Company[]> => {
    const response = await api.get("/api/Company");
    return response.data.data;
  },
}; 