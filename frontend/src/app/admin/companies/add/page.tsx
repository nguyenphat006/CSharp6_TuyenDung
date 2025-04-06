"use client";

import { AddCompanyForm } from "../ui/AddCompanyForm";
import { Company } from "@/types/company";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddCompanyPage() {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Company>) => {
    try {
      // TODO: Gọi API để thêm công ty
      console.log("Thêm công ty:", data);
      router.push("/admin/companies");
    } catch (error) {
      console.error("Lỗi khi thêm công ty:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => router.push("/admin/companies")}
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Thêm công ty mới</h1>
      </div>
      <div className="border rounded-lg p-4">
        <AddCompanyForm
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/companies")}
        />
      </div>
    </div>
  );
} 