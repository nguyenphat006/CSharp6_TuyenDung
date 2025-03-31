import { fetcher } from "@/lib/fetcher";

interface LoginResponse {
  result: boolean;
  status: number;
  data: {
    token: string;
    refreshToken: string;
    data: {
      id: string;
      name: string;
      email: string;
      age: number;
      gender: string;
      role: string;
      createAt: string;
    }
  };
  message: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  name: string;
  email: string;
  age: number;
  password: string;
}

interface RegisterResponse {
  data: {
    result: boolean;
    status: number;
    data: {
      message: string;
    };
    message: string | null;
  };
  message: string | null;
  status: number;
}

export const login = async (credentials: LoginParams): Promise<LoginResponse> => {
  const response = await fetcher("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  // Lưu token và thông tin user vào localStorage
  if (response.data) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.data.data.data));
  }

  return response;
};

export const signUp = async (credentials: RegisterParams): Promise<RegisterResponse> => {
  const response = await fetcher("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return response;
};

export const resetPassword = async (credentials: any) => {  // chưa có resetPassword
  const response = await fetcher("/users/", {
    method: "POST",
    body: JSON.stringify(credentials),
  }, true);

  return response;
};

export const forgotPassword = async (credentials: any) => { // chưa có forgotPassword
  const response = await fetcher("/users/", {
    method: "POST",
    body: JSON.stringify(credentials),
  }, true);

  return response;
};

export const verifyOtpEmail = async (credentials: any) => { // chưa có verifyOtp
  const response = await fetcher("/users/", {
    method: "POST",
    body: JSON.stringify(credentials),
  }, true);

  return response;
};

export const resendVerificationEmail = async (credentials: any) => { // chưa có resendVerificationCode
  const response = await fetcher("/users/", {
    method: "POST",
    body: JSON.stringify(credentials),
  }, true);

  return response;
};

export const verifyOtpCode = async (credentials: any) => { // chưa có verifyOtp
  const response = await fetcher("/users/", {
    method: "POST",
    body: JSON.stringify(credentials),
  }, true);

  return response;
};

export const resendVerificationCode = async (credentials: any) => { // chưa có resendVerificationCode
  const response = await fetcher("/users/", {
    method: "POST",
    body: JSON.stringify(credentials),
  }, true);

  return response;
};
