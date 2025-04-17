export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  targetType: string;
  targetId: string;
  createdBy: string | null;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  isActive: boolean;
  deletedBy: string | null;
  isDeleted: boolean;
}

export interface ActivityLogQueryParams {
  fromDate?: string;
  toDate?: string;
  pageNumber: number;
  pageSize: number;
}

export interface ActivityLogResponse {
  result: boolean;
  message: string;
  data: ActivityLog[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
} 