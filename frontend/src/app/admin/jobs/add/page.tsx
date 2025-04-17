"use client";

import { useRouter } from "next/navigation";
import { JobForm } from "../components/JobForm";
import { useJobs } from "@/hooks/useJobs";
import { toast } from "sonner";

export default function AddJobPage() {
  const router = useRouter();
  const { createJob } = useJobs({
    pageNumber: 1,
    pageSize: 10,
  });

  const handleSubmit = async (data: any) => {
    try {
      await createJob(data);
      toast.success("Tạo công việc thành công");
      router.push("/admin/jobs");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo công việc!");
    }
  };

  const handleCancel = () => {
    router.push("/admin/jobs");
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thêm công việc mới</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <JobForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
} 