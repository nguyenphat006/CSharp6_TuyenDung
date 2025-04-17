"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JobForm } from "../../components/JobForm";
import { Job, jobService } from "@/services/jobService";
import { toast } from "sonner";

interface EditJobPageProps {
  params: {
    id: string;
  };
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobService.getById(params.id);
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Không thể tải thông tin công việc");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      await jobService.update(params.id, data);
      toast.success("Cập nhật công việc thành công");
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Có lỗi xảy ra khi cập nhật công việc");
    }
  };

  const handleCancel = () => {
    router.push("/admin/jobs");
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!job) {
    return <div>Không tìm thấy công việc</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cập nhật công việc</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <JobForm
          initialData={job}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
} 