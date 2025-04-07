export interface Company {
  id: string;
  name: string;
  description: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  logo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  isDeleted: boolean;
  deletedBy: string | null;
} 