"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AddCompanyForm } from "../../ui/AddCompanyForm";
import { sampleCompanies } from "../../data/sampleData";

interface EditCompanyPageProps {
  params: {
    id: string;
  };
}

export default function EditCompanyPage({ params }: EditCompanyPageProps) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    // TODO: Thay thế bằng API call
    const foundCompany = sampleCompanies.find((c) => c.id === params.id);
    if (foundCompany) {
      setCompany(foundCompany);
    }
  }, [params.id]);

  const handleSubmit = async (data: Partial<Company>) => {
    try {
      // TODO: Gọi API để cập nhật công ty
      console.log("Cập nhật công ty:", data);
      router.push("/admin/companies");
    } catch (error) {
      console.error("Lỗi khi cập nhật công ty:", error);
    }
  };

  if (!company) {
    return (
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => router.push("/admin/companies")}
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Chỉnh sửa công ty</h2>
          <p className="text-muted-foreground">
            Cập nhật thông tin chi tiết về công ty
          </p>
        </div>
      </div>
      <div className="border rounded-lg p-4">
        <AddCompanyForm
          initialData={company}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/companies")}
        />
      </div>
    </div>
  );
} 