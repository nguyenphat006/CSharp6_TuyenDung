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

interface DeleteRoleResponse {
  result: boolean;
  status: number;
  data: {
    deletedCount: number;
    deletedRoleNames: string[];
  };
  message: string;
}

export const getRoles = async (): Promise<RoleResponse> => {
  try {
    const token = localStorage.getItem('token');
    console.log('Using token:', token);

    const response = await fetch('https://localhost:7152/api/Roles', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log('Raw response:', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Parsed response data:', data);

    return data;
  } catch (error) {
    console.error('Error in getRoles:', error);
    throw error;
  }
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

export const deleteRole = async (roleIds: string[]): Promise<DeleteRoleResponse> => {
  try {
    const token = localStorage.getItem('token');
    console.log('Deleting roles:', roleIds);

    const response = await fetch('https://localhost:7152/api/Roles', {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ roleIds })
    });

    console.log('Delete response:', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Delete response data:', data);

    return data;
  } catch (error) {
    console.error('Error in deleteRole:', error);
    throw error;
  }
}; 