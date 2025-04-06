"use client";

import { useRouter } from "next/navigation";
import { CompanyForm } from "../ui/CompanyForm";
import { toast } from "sonner";
import { axiosClient } from "@/lib/axios-client";

export default function AddCompanyPage() {
  const router = useRouter();

  const handleSubmit = async (values: any, logoFile: File | null) => {
    try {
      // Thêm công ty
      const response = await axiosClient.post("/api/Company", values);
      
      if (response.data.result) {
        const companyId = response.data.data.id;

        // Upload logo nếu có
        if (logoFile) {
          const formData = new FormData();
          formData.append("CompanyId", companyId);
          formData.append("Logo", logoFile);

          const uploadResponse = await axiosClient.post("/api/Company/upload-logo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (!uploadResponse.data.result) {
            toast.error("Có lỗi xảy ra khi upload logo");
          }
        }

        toast.success(response.data.message || "Thêm công ty thành công");
        router.push("/admin/companies");
        router.refresh();
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi thêm công ty");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi thêm công ty";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-full flex-1 flex-col p-8 flex">
      <CompanyForm onSubmit={handleSubmit} />
    </div>
  );
} 