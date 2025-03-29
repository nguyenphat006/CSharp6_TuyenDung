"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import { DataTableUsers, User } from "./ui/DataTableUsers";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";

// Mock data
const mockUsers: User[] = [
  {
    id: "01458",
    name: "Nguyễn Văn A",
    email: "a@example.com",
    phone: "0123456789",
    role: "user",
    status: "active",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    applications: 5,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "01459",
    name: "Trần Thị B",
    email: "b@example.com",
    phone: "0987654321",
    role: "user",
    status: "pending",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    applications: 3,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "01460",
    name: "Lê Văn C",
    email: "c@example.com",
    phone: "0369852147",
    role: "user",
    status: "blocked",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    applications: 8,
    avatar: "https://github.com/shadcn.png",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [users, setUsers] = useState<User[]>(mockUsers);
  useSetPageTitle();

  const handleUpdateUser = (
    userId: string,
    updatedUser: Omit<User, "id" | "createdAt" | "lastLogin" | "applications">
  ) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              ...updatedUser,
            }
          : user
      )
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
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
      <DataTableUsers data={users} onUpdateUser={handleUpdateUser} />
    </div>
  );
}
