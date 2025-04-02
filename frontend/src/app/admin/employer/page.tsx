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
import { DataTableEmployer, Employer } from "./ui/DataTableEmployer";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { AddEmployerForm } from "./ui/AddEmployerForm";

// Mock data
const mockEmployers: Employer[] = [
  {
    id: "01458",
    name: "Nguyễn Văn A",
    email: "a@company.com",
    phone: "0123456789",
    company: "Công ty A",
    position: "HR Manager",
    status: "active",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    jobsPosted: 12,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "01459",
    name: "Trần Thị B",
    email: "b@company.com",
    phone: "0987654321",
    company: "Công ty B",
    position: "Recruiter",
    status: "pending",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    jobsPosted: 8,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "01460",
    name: "Lê Văn C",
    email: "c@company.com",
    phone: "0369852147",
    company: "Công ty C",
    position: "HR Director",
    status: "blocked",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    jobsPosted: 15,
    avatar: "https://github.com/shadcn.png",
  },
];

export default function EmployerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [employers, setEmployers] = useState<Employer[]>(mockEmployers);
  useSetPageTitle();

  const handleUpdateEmployer = (
    employerId: string,
    updatedEmployer: Omit<Employer, "id" | "createdAt" | "lastLogin" | "jobsPosted">
  ) => {
    setEmployers(
      employers.map((employer) =>
        employer.id === employerId
          ? {
              ...employer,
              ...updatedEmployer,
            }
          : employer
      )
    );
  };

  const handleDeleteEmployer = (employerId: string) => {
    setEmployers(employers.filter((employer) => employer.id !== employerId));
  };

  const handleAddEmployer = (newEmployer: Omit<Employer, "id" | "createdAt" | "lastLogin" | "jobsPosted" | "avatar">) => {
    const employer: Employer = {
      ...newEmployer,
      id: String(Date.now()),
      createdAt: new Date(),
      lastLogin: new Date(),
      jobsPosted: 0,
      avatar: "https://github.com/shadcn.png",
    };
    setEmployers([...employers, employer]);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý nhà tuyển dụng</h1>
        <AddEmployerForm onSubmit={handleAddEmployer} />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Tìm kiếm theo tên, email, công ty..."
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
      <DataTableEmployer 
        data={employers} 
        onUpdateEmployer={handleUpdateEmployer}
        onDeleteEmployer={handleDeleteEmployer}
      />
    </div>
  );
}
