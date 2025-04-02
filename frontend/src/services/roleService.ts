import { fetcher } from "@/lib/fetcher";

export interface Role {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  isActive: boolean;
}

interface RoleResponse {
  result: boolean;
  status: number;
  data: Role[];
  message: string;
}

export const getRoles = async (): Promise<RoleResponse> => {
  const token = localStorage.getItem('token');
  
  const response = await fetcher("/Roles", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return response;
}; 