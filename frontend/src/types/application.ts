export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Application {
  id: string;
  candidateName: string;
  email: string;
  status: ApplicationStatus;
  jobTitle: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
  // Add more fields as needed
} 