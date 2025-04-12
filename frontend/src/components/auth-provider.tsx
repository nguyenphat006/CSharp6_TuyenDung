'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '@/redux/features/authSlice';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token) {
      dispatch(setToken(token));
    }

    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('User role from localStorage:', parsedUser.role);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  return <>{children}</>;
} 
 
 
 
 
 