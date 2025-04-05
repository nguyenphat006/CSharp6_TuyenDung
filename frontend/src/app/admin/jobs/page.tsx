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
import { Download, Plus } from "lucide-react";
import { DataTableJobs } from "./ui/DataTableJobs";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import Link from "next/link";
import { toast } from "sonner";
import { Job, sampleJobs } from "./data/sampleData";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [jobs, setJobs] = useState<Job[]>(
    Object.values(sampleJobs).map(job => ({
      ...job,
      salary: {
        min: Number(job.salary.min),
        max: Number(job.salary.max),
        currency: job.salary.currency,
      },
      headcount: Number(job.headcount),
    }))
  );
  useSetPageTitle();

  const handleUpdateJob = (
    jobId: string,
    updatedJob: Omit<Job, "id" | "createdAt" | "applications">
  ) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              ...updatedJob,
            }
          : job
      )
    );
  };

  const handleDelete = async (id: string) => {
    try {
      // Giả lập API call
      console.log("Deleting job:", id);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setJobs(jobs.filter(job => job.id !== id));
      toast.success("Xóa việc làm thành công!");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Có lỗi xảy ra khi xóa việc làm!");
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý việc làm</h1>
        <Link href="/admin/jobs/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm việc làm
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Tìm kiếm theo tiêu đề, công ty..."
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
              <SelectItem value="active">Đang tuyển</SelectItem>
              <SelectItem value="inactive">Đã đóng</SelectItem>
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
      <DataTableJobs 
        data={jobs} 
        onUpdateJob={handleUpdateJob}
        onDeleteJob={handleDelete}
      />
    </div>
  );
}
