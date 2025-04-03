export interface Role {
  id: string;
  name: string;
  isActive: boolean;
  createdBy: string | null;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
} 