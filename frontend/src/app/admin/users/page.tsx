"use client";

import { useState } from "react";
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
import { Download, Plus } from "lucide-react";
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

// Dữ liệu mẫu
const mockUsers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    role: "admin" as const,
    status: "active" as const,
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date("2024-03-31"),
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0987654321",
    role: "user" as const,
    status: "pending" as const,
    createdAt: new Date("2024-01-02"),
    lastLogin: new Date("2024-03-30"),
    avatar: "https://github.com/shadcn.png",
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [users, setUsers] = useState(mockUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  useSetPageTitle();

  const handleAddUser = async (data: any) => {
    try {
      // TODO: Gọi API thêm user
      const newUser = {
        id: String(users.length + 1),
        ...data,
        createdAt: new Date(),
        lastLogin: new Date(),
        avatar: "https://github.com/shadcn.png",
      };
      setUsers([...users, newUser]);
      setIsAddDialogOpen(false);
      toast.success("Thêm người dùng thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm người dùng");
    }
  };

  const handleUpdateUser = async (id: string, data: any) => {
    try {
      // TODO: Gọi API cập nhật user
      setUsers(users.map(user => user.id === id ? { ...user, ...data } : user));
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      // TODO: Gọi API xóa user
      setUsers(users.filter(user => user.id !== id));
      toast.success("Xóa người dùng thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa người dùng");
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm người dùng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm người dùng mới</DialogTitle>
            </DialogHeader>
            <AddUserForm onAddUser={handleAddUser} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Tìm kiếm theo tên, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="pending">Chờ xác minh</SelectItem>
              <SelectItem value="blocked">Bị khóa</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="6months">6 tháng gần nhất</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTableUser
        data={users}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
