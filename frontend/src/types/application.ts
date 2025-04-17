export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
  id: string;
  name: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Job {
  id: string;
  name: string;
}

export interface Application {
  id: string;
  email: string;
  status: ApplicationStatus;
  user: User;
  company: Company;
  job: Job;
  history: any[];
  fileUrl: string;
  createdAt: string;
  updatedAt: string | null;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
} 