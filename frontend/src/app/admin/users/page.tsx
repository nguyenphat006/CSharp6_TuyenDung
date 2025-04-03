"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Plus, Trash2 } from "lucide-react";
import { DataTableUser } from "./ui/DataTableUser";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { AddUserForm } from "./ui/AddUserForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { EditUserForm } from "./ui/EditUserForm";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  role: string;
  createdBy: string | null;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  isActive: boolean;
  deletedBy: string | null;
  isDeleted: boolean;
}

export default function UsersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  useSetPageTitle();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7152/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Lỗi khi tải danh sách người dùng");
      }

      const result = await response.json();
      if (result.result) {
        setUsers(result.data);
        console.log('Users set:', result.data); // Debug log
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi tải danh sách người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
      toast.error("Không thể tải danh sách người dùng");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (data: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const requestBody = {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        gender: data.gender,
        role: data.role,
        isActive: data.isActive
      };

      console.log('Request body:', requestBody);

      const response = await fetch("https://localhost:7152/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log('API response:', result);

      if (!response.ok) {
        // Nếu API trả về thông báo lỗi cụ thể, sử dụng nó
        if (result.message) {
          throw new Error(result.message);
        }
        throw new Error("Có lỗi xảy ra khi thêm người dùng");
      }

      if (result.result) {
        setUsers((prevUsers) => [...prevUsers, result.data]);
        toast.success("Thêm người dùng thành công");
        setIsAddDialogOpen(false);
      } else {
        throw new Error(result.message || "Có lỗi xảy ra khi thêm người dùng");
      }
    } catch (error: any) {
      console.error("Error adding user:", error);
      // Ném lại lỗi với message từ API
      throw new Error(error.message || "Có lỗi xảy ra khi thêm người dùng");
    }
  };

  const handleUpdateUser = async (data: {
    name: string;
    email: string;
    age: number;
    gender: string;
    role: string;
    isActive: boolean;
  }) => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7152/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          id: selectedUser.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật người dùng");
      }

      const result = await response.json();
      if (result.result) {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === selectedUser.id ? result.data : user
          )
        );
        setIsEditDialogOpen(false);
        setSelectedUser(null);
        toast.success(result.message || "Cập nhật người dùng thành công");
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi cập nhật người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      toast.error("Không thể cập nhật người dùng");
    }
  };

  const handleDeleteMultipleUsers = async (userIds: string[]) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7152/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIds }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi xóa người dùng");
      }

      const result = await response.json();
      if (result.result) {
        const updatedUsers = users.filter(user => !userIds.includes(user.id));
        setUsers(updatedUsers);
        setSelectedUsers([]);
        toast.success(`Đã xóa ${result.data.deletedCount}/${result.data.totalRequested} người dùng`);
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi xóa người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      toast.error("Không thể xóa người dùng");
    }
  };

  const handleDeleteUser = async (id: string) => {
    await handleDeleteMultipleUsers([id]);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <div className="flex gap-2">
          {selectedUsers.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => handleDeleteMultipleUsers(selectedUsers)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Xóa {selectedUsers.length} người dùng
            </Button>
          )}
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      <DataTableUser
        data={users}
        onDelete={handleDeleteUser}
        onEditUser={handleEditUser}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
          </DialogHeader>
          <AddUserForm
            onSubmit={handleAddUser}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <EditUserForm
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}
