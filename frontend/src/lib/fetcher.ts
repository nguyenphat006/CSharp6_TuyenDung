//Nơi sẽ tạo hàm fetch api để dùng chung cho mọi loại API ví dụ:

// src/app/utils/fetcher.js ở đây có kiểm tra trường hợp nếu có 2 url backend luôn, sẽ gắn true nếu muốn sử dụng url thứ 2 là secondary
// fetcher.ts

import { API_BASE_URL, API_BASE_LOCAL_URL, getHeaders, ApiError, ApiResponse } from './api';

export async function fetcher<T = any>(
  endpoint: string,
  options: RequestInit = {},
  useSecondary: boolean = false
): Promise<ApiResponse<T>> {
  const BASE_URL = useSecondary ? API_BASE_LOCAL_URL : API_BASE_URL;

  if (!BASE_URL) {
    throw new Error('API base URL is not configured');
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = getHeaders(token);

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      responseData.message || 'Hệ thống đang bảo trì, quý khách vui lòng thử lại sau ít phút.',
      responseData
    );
  }

  return {
    data: responseData,
    message: responseData.message,
    status: response.status,
  };
}

// Helper functions for common HTTP methods
export const api = {
  get: <T = any>(endpoint: string, options: RequestInit = {}, useSecondary = false) =>
    fetcher<T>(endpoint, { ...options, method: 'GET' }, useSecondary),

  post: <T = any>(endpoint: string, data: any, options: RequestInit = {}, useSecondary = false) =>
    fetcher<T>(
      endpoint,
      {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      },
      useSecondary
    ),

  put: <T = any>(endpoint: string, data: any, options: RequestInit = {}, useSecondary = false) =>
    fetcher<T>(
      endpoint,
      {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      },
      useSecondary
    ),

  patch: <T = any>(endpoint: string, data: any, options: RequestInit = {}, useSecondary = false) =>
    fetcher<T>(
      endpoint,
      {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data),
      },
      useSecondary
    ),

  delete: <T = any>(endpoint: string, options: RequestInit = {}, useSecondary = false) =>
    fetcher<T>(endpoint, { ...options, method: 'DELETE' }, useSecondary),
};
  
  