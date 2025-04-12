"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    console.log('User in AdminProtected:', user);
    if (!user) {
      router.push("/login");
      return;
    }

    console.log('User role:', user.role);
    if (user.role !== "Admin") {
      router.push("/");
      return;
    }
  }, [user, router]);

  if (!user || user.role !== "Admin") {
    return null;
  }

  return <>{children}</>;
} 
 
 
 
 
 