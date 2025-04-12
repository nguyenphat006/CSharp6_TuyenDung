"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || (user.role !== "Admin" && user.role !== "HR")) {
    return null;
  }

  return <>{children}</>;
} 
 
 
 
 
 