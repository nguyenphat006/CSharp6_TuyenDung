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
import { DataTableJobs, Job } from "./ui/DataTableJobs";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { AddJobForm } from "./ui/AddJobForm";

// Mock data
const mockJobs: Job[] = [
  {
    id: "01458",
    title: "Senior Frontend Developer",
    company: "Công ty A",
    location: "Hà Nội",
    type: "full-time",
    status: "active",
    salary: {
      min: 20000000,
      max: 30000000,
      currency: "VND",
    },
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 25,
  },
  {
    id: "01459",
    title: "UI/UX Designer",
    company: "Công ty B",
    location: "TP.HCM",
    type: "part-time",
    status: "pending",
    salary: {
      min: 15000000,
      max: 20000000,
      currency: "VND",
    },
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 12,
  },
  {
    id: "01460",
    title: "Backend Developer",
    company: "Công ty C",
    location: "Đà Nẵng",
    type: "full-time",
    status: "expired",
    salary: {
      min: 25000000,
      max: 35000000,
      currency: "VND",
    },
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    applications: 45,
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
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

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  const handleAddJob = (newJob: Omit<Job, "id" | "createdAt" | "applications">) => {
    const job: Job = {
      ...newJob,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      applications: 0,
    };
    setJobs([...jobs, job]);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý việc làm</h1>
        <AddJobForm onSubmit={handleAddJob} />
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
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="expired">Hết hạn</SelectItem>
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
        onDeleteJob={handleDeleteJob}
      />
    </div>
  );
}
