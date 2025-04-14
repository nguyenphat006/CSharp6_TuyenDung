import { Job } from "./jobService";

export interface SearchParams {
  keyword?: string;
  location?: string;
  level?: string;
  minSalary?: number;
  maxSalary?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface SearchResponse {
  data: {
    items: Job[];
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
  };
  result: boolean;
  message: string;
}

const BASE_URL = 'https://localhost:7152';

export const searchJobs = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    // Chỉ gửi các tham số có giá trị
    const requestBody: any = {
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 10
    };

    if (params.keyword) requestBody.keyword = params.keyword;
    if (params.location) requestBody.location = params.location;
    if (params.level) requestBody.level = params.level;
    if (params.minSalary) requestBody.minSalary = params.minSalary;
    if (params.maxSalary) requestBody.maxSalary = params.maxSalary;

    const response = await fetch(`${BASE_URL}/api/Job/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to search jobs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
}; 