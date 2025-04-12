'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '@/redux/features/authSlice';
import Cookies from 'js-cookie';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy token từ localStorage hoặc cookie
    const token = localStorage.getItem('token') || Cookies.get('token');
    if (token) {
      dispatch(setToken(token));
    }

    // Lấy thông tin user từ localStorage hoặc cookie
    const userStr = localStorage.getItem('user') || Cookies.get('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('User from storage:', user);
        dispatch(setUser(user));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Nếu có lỗi khi parse, xóa dữ liệu
        localStorage.removeItem('user');
        Cookies.remove('user');
      }
    }
  }, [dispatch]);

  return <>{children}</>;
} 
 
 
 
 
 