export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  role: string;
  createdBy: string | null;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  isActive: boolean;
  deletedBy: string | null;
  isDeleted: boolean;
} 