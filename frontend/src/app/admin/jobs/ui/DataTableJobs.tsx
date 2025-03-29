"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  status: "active" | "pending" | "expired";
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  deadline: string;
  createdAt: string;
  applications: number;
}

interface DataTableJobsProps {
  data: Job[];
  onUpdateJob?: (jobId: string, updatedJob: Omit<Job, "id" | "createdAt" | "applications">) => void;
}

export function DataTableJobs({ data, onUpdateJob }: DataTableJobsProps) {
  const router = useRouter();

  const handleDelete = (jobId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete job:", jobId);
  };

  const handleEdit = (jobId: string) => {
    router.push(`/admin/jobs/${jobId}/edit`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Công ty</TableHead>
            <TableHead>Địa điểm</TableHead>
            <TableHead>Loại hình</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Mức lương</TableHead>
            <TableHead>Hạn nộp</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Đơn ứng tuyển</TableHead>
            <TableHead className="w-[100px]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.id}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {job.type === "full-time"
                    ? "Toàn thời gian"
                    : job.type === "part-time"
                    ? "Bán thời gian"
                    : job.type === "contract"
                    ? "Hợp đồng"
                    : "Thực tập"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    job.status === "active"
                      ? "default"
                      : job.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {job.status === "active"
                    ? "Đang tuyển"
                    : job.status === "pending"
                    ? "Chờ duyệt"
                    : "Hết hạn"}
                </Badge>
              </TableCell>
              <TableCell>
                {job.salary.min.toLocaleString("vi-VN")} -{" "}
                {job.salary.max.toLocaleString("vi-VN")} {job.salary.currency}
              </TableCell>
              <TableCell>
                {new Date(job.deadline).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>
                {new Date(job.createdAt).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>{job.applications}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Mở menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(job.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 