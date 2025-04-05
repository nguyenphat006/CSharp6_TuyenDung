"use client";

import { JobForm } from "../ui/JobForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddJobPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      // Giả lập API call
      console.log("Adding job:", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thêm việc làm thành công!");
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Có lỗi xảy ra khi thêm việc làm!");
    }
  };

  return <JobForm onSubmit={handleSubmit} />;
} 