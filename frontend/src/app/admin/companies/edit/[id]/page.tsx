"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyForm } from "../../ui/CompanyForm";
import { toast } from "sonner";
import { axiosClient } from "@/lib/axios-client";

interface EditCompanyPageProps {
  params: {
    id: string;
  };
}

export default function EditCompanyPage({ params }: EditCompanyPageProps) {
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axiosClient.get(`/api/Company/${params.id}`);
        if (response.data.result) {
          const companyData = response.data.data;
          // Chuyển đổi dữ liệu để phù hợp với form
          setCompany({
            name: companyData.name,
            companyModel: companyData.companyModel,
            industry: companyData.industry,
            companySize: companyData.companySize,
            address: companyData.address,
            description: companyData.description,
            workingTime: companyData.workingTime,
            isActive: companyData.isActive,
            logoUrl: companyData.logoUrl
          });
        } else {
          toast.error("Không tìm thấy thông tin công ty");
          router.push("/admin/companies");
        }
      } catch (error: any) {
        console.error("Error fetching company:", error);
        toast.error(
          error.response?.data?.message || 
          "Không tìm thấy thông tin công ty"
        );
        router.push("/admin/companies");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCompany();
    }
  }, [params.id, router]);

  const handleSubmit = async (values: any, logoFile: File | null) => {
    try {
      // Cập nhật thông tin công ty
      const response = await axiosClient.put(`/api/Company/${params.id}`, {
        ...values,
        id: params.id,
        logoUrl: undefined // Không gửi logoUrl khi cập nhật
      });
      
      if (response.data.result) {
        // Upload logo mới nếu có
        if (logoFile) {
          const formData = new FormData();
          formData.append("CompanyId", params.id);
          formData.append("Logo", logoFile);

          try {
            const uploadResponse = await axiosClient.post("/api/Company/upload-logo", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (!uploadResponse.data.result) {
              toast.error("Có lỗi xảy ra khi upload logo");
            }
          } catch (uploadError: any) {
            console.error("Error uploading logo:", uploadError);
            toast.error("Có lỗi xảy ra khi upload logo");
          }
        }

        toast.success("Cập nhật công ty thành công");
        router.push("/admin/companies");
        router.refresh();
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi cập nhật công ty");
      }
    } catch (error: any) {
      console.error("Error updating company:", error);
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi cập nhật công ty";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex-1 flex-col p-8 flex">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="h-full flex-1 flex-col p-8 flex">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Không tìm thấy thông tin công ty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex-col p-8 flex">
      <CompanyForm
        companyId={params.id}
        onSubmit={handleSubmit}
        defaultValues={company}
        isEdit
        defaultLogoUrl={company.logoUrl}
      />
    </div>
  );
} 