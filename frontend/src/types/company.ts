export interface Company {
  id: string;
  name: string;
  companyModel: string;
  industry: string;
  companySize: string;
  address: string;
  description: string;
  workingTime: string;
  logoUrl: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  isActive: boolean;
  isDeleted: boolean;
  deletedBy: string | null;
} 