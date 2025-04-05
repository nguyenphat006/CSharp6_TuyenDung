"use client";

import { JobForm } from "../../ui/JobForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      // Giả lập API call
      console.log("Updating job:", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Cập nhật việc làm thành công!");
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Có lỗi xảy ra khi cập nhật việc làm!");
    }
  };

  return <JobForm jobId={params.id} onSubmit={handleSubmit} />;
} 