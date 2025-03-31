// API Base URLs
export const API_BASE_URL = 'https://localhost:7152/api';

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refreshToken: '/auth/refresh-token',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    resendVerification: '/auth/resend-verification',
  },
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    changePassword: '/users/change-password',
    uploadAvatar: '/users/avatar',
  },
  jobs: {
    list: '/jobs',
    detail: (id: string) => `/jobs/${id}`,
    create: '/jobs',
    update: (id: string) => `/jobs/${id}`,
    delete: (id: string) => `/jobs/${id}`,
    apply: (id: string) => `/jobs/${id}/apply`,
  },
  employers: {
    list: '/employers',
    detail: (id: string) => `/employers/${id}`,
    create: '/employers',
    update: (id: string) => `/employers/${id}`,
    delete: (id: string) => `/employers/${id}`,
  },
};

// API Headers
export const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// API Error Handler
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API Response Type
export interface ApiResponse<T = any> {
  result: boolean;
  status: number;
  data: T;
  message: string;
} 