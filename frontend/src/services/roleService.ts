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

interface SingleRoleResponse {
  result: boolean;
  status: number;
  data: Role;
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

export const createRole = async (data: { name: string; isActive: boolean }): Promise<SingleRoleResponse> => {
  const token = localStorage.getItem('token');
  
  const response = await fetcher("/Roles", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const updateRole = async (id: string, data: { name: string; isActive: boolean }): Promise<SingleRoleResponse> => {
  const token = localStorage.getItem('token');
  
  const response = await fetcher(`/Roles/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const deleteRole = async (id: string): Promise<RoleResponse> => {
  const token = localStorage.getItem('token');
  
  const response = await fetcher(`/Roles/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  return response;
}; 