export interface Company {
  id: string;
  name: string;
  companyModel: string; // Mô hình công ty
  industry: string; // Lĩnh vực công ty
  companySize: string; // Quy mô công ty
  address: string;
  description: string; // Markdown nội dung mô tả
  workingTime: string; // Thời gian làm việc
  logo?: string;
  isActive: boolean;
  createdBy: string | null;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
} 