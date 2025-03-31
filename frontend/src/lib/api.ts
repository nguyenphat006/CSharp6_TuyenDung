// API Base URLs
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_BASE_LOCAL_URL = process.env.NEXT_PUBLIC_API_BASE_LOCAL_URL;

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: `${process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT}/login`,
    register: `${process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT}/register`,
    refreshToken: `${process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT}/refresh-token`,
    logout: `${process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT}/logout`,
    forgotPassword: `${process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT}/forgot-password`,
    resetPassword: `${process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT}/reset-password`,
    verifyEmail: `${process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT}/verify-email`,
    resendVerification: `${process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT}/resend-verification`,
  },
  users: {
    profile: `${process.env.NEXT_PUBLIC_API_USERS_ENDPOINT}/profile`,
    updateProfile: `${process.env.NEXT_PUBLIC_API_USERS_ENDPOINT}/profile`,
    changePassword: `${process.env.NEXT_PUBLIC_API_USERS_ENDPOINT}/change-password`,
    uploadAvatar: `${process.env.NEXT_PUBLIC_API_USERS_ENDPOINT}/avatar`,
  },
  jobs: {
    list: `${process.env.NEXT_PUBLIC_API_JOBS_ENDPOINT}`,
    detail: (id: string) => `${process.env.NEXT_PUBLIC_API_JOBS_ENDPOINT}/${id}`,
    create: `${process.env.NEXT_PUBLIC_API_JOBS_ENDPOINT}`,
    update: (id: string) => `${process.env.NEXT_PUBLIC_API_JOBS_ENDPOINT}/${id}`,
    delete: (id: string) => `${process.env.NEXT_PUBLIC_API_JOBS_ENDPOINT}/${id}`,
    apply: (id: string) => `${process.env.NEXT_PUBLIC_API_JOBS_ENDPOINT}/${id}/apply`,
  },
  employers: {
    list: `${process.env.NEXT_PUBLIC_API_EMPLOYERS_ENDPOINT}`,
    detail: (id: string) => `${process.env.NEXT_PUBLIC_API_EMPLOYERS_ENDPOINT}/${id}`,
    create: `${process.env.NEXT_PUBLIC_API_EMPLOYERS_ENDPOINT}`,
    update: (id: string) => `${process.env.NEXT_PUBLIC_API_EMPLOYERS_ENDPOINT}/${id}`,
    delete: (id: string) => `${process.env.NEXT_PUBLIC_API_EMPLOYERS_ENDPOINT}/${id}`,
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
  data: T;
  message?: string;
  status: number;
} 