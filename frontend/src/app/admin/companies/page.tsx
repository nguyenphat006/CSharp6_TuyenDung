"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTableCompany } from "./ui/DataTableCompany";
import { toast } from "sonner";
import { Company } from "@/types/company";
import { axiosClient } from "@/lib/axios-client";

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const response = await axiosClient.get("/api/Company");
      if (response.data.result) {
        setCompanies(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi tải danh sách công ty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axiosClient.delete(`/api/Company/${id}`);
      if (response.data.result) {
        toast.success("Xóa công ty thành công");
        setCompanies(companies.filter((company) => company.id !== id));
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xóa công ty");
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý công ty</h2>
          <p className="text-muted-foreground">
            Quản lý danh sách các công ty trong hệ thống
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => router.push("/admin/companies/add")}>
            <Plus className="mr-2 h-4 w-4" /> Thêm công ty
          </Button>
        </div>
      </div>
      <DataTableCompany data={companies} onDelete={handleDelete} />
    </div>
  );
} 