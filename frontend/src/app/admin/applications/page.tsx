"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Application } from "@/types/application";
import { ApplicationSidebar } from "./_components/application-sidebar";

const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "candidateName",
    header: "Tên người nộp",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "PENDING" ? "secondary" : status === "APPROVED" ? "success" : "destructive"}>
          {status === "PENDING" ? "Đang chờ" : status === "APPROVED" ? "Đã duyệt" : "Từ chối"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "jobTitle",
    header: "Job liên quan",
  },
  {
    accessorKey: "companyName",
    header: "Company liên quan",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: vi });
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày cập nhật",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: vi });
    },
  },
];

// Dữ liệu mẫu
const sampleData: Application[] = [
  {
    id: "1",
    candidateName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    status: "PENDING",
    jobTitle: "Frontend Developer",
    companyName: "Công ty ABC",
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "2",
    candidateName: "Trần Thị B",
    email: "tranthib@example.com",
    status: "APPROVED",
    jobTitle: "Backend Developer",
    companyName: "Công ty XYZ",
    createdAt: "2024-04-02T14:30:00Z",
    updatedAt: "2024-04-03T09:15:00Z",
  },
  {
    id: "3",
    candidateName: "Lê Văn C",
    email: "levanc@example.com",
    status: "REJECTED",
    jobTitle: "Fullstack Developer",
    companyName: "Công ty DEF",
    createdAt: "2024-04-03T16:45:00Z",
    updatedAt: "2024-04-04T11:20:00Z",
  },
];

export default function ApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn xin việc</h1>
      </div>

      <DataTable
        columns={columns}
        data={sampleData}
        onRowClick={(row) => {
          setSelectedApplication(row);
          setIsSidebarOpen(true);
        }}
      />

      <ApplicationSidebar
        application={selectedApplication}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
} 