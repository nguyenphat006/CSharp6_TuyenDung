"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditUserForm } from "../../ui/EditUserForm";
import { User } from "../../ui/DataTableUser";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";

// Mock data - sau này sẽ được thay thế bằng API call
const mockUsers: User[] = [
  {
    id: "01458",
    name: "Nguyễn Văn A",
    email: "a@email.com",
    role: "candidate",
    status: "active",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: "01459",
    name: "Trần Thị B",
    email: "b@email.com",
    role: "employer",
    status: "pending",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "01460",
    name: "Lê Văn C",
    email: "c@email.com",
    role: "admin",
    status: "blocked",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useSetPageTitle();

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        // Sau này sẽ thay thế bằng API call thật
        const foundUser = mockUsers.find((u) => u.id === params.id);
        if (!foundUser) {
          throw new Error("Không tìm thấy người dùng");
        }
        setUser(foundUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleUpdateUser = async (updatedUser: Omit<User, "id" | "createdAt">) => {
    try {
      // Sau này sẽ thay thế bằng API call thật
      console.log("Updating user:", updatedUser);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Sau khi update thành công, quay lại trang danh sách
      router.push("/admin/users");
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push("/admin/users")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Quay lại
        </button>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-6">
      <EditUserForm user={user} onUpdateUser={handleUpdateUser} />
    </div>
  );
}
