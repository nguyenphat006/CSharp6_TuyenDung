"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { DataTableCompany } from "./ui/DataTableCompany";
import { toast } from "sonner";
import { Company } from "@/types/company";
import { axiosClient } from "@/lib/axios-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import { useCompanies } from "@/hooks/useCompanies";

export default function CompaniesPage() {
  const router = useRouter();
  const { companies, updateParams } = useCompanies();
  const [loading, setLoading] = useState(true);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePageChange = (page: number) => {
    updateParams({ pageNumber: page });
  };

  const handlePageSizeChange = (size: number) => {
    updateParams({ pageSize: size, pageNumber: 1 });
  };

  const handleFiltersChange = (filters: {
    keyword?: string;
    industry?: string;
    companySize?: string;
    address?: string;
  }) => {
    updateParams({ ...filters, pageNumber: 1 });
  };

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/api/Company');
      updateParams(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError('Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedCompanies.length === 0) {
      toast.error("Vui lòng chọn ít nhất một công ty để xóa");
      return;
    }

    try {
      setDeleteLoading(true);
      const response = await axiosClient.delete('/api/Company', {
        data: {
          companysId: selectedCompanies
        }
      });
      
      if (response.data && response.data.result === true) {
        await fetchCompanies();
        setSelectedCompanies([]);
        toast.success(response.data.message || `Đã xóa thành công ${selectedCompanies.length} công ty`);
      } else {
        toast.error(response.data?.message || "Có lỗi xảy ra khi xóa các công ty đã chọn");
      }
    } catch (error: any) {
      console.error('Error deleting companies:', error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa các công ty đã chọn");
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý công ty</h2>
          <p className="text-muted-foreground">
            Danh sách các công ty trong hệ thống
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedCompanies.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleteLoading}
            >
              <Trash className="mr-2 h-4 w-4" />
              Xóa {selectedCompanies.length} công ty
            </Button>
          )}
          <Button onClick={() => router.push("/admin/companies/add")}>
            <Plus className="mr-2 h-4 w-4" /> Thêm công ty
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa nhiều</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa {selectedCompanies.length} công ty đã chọn?
              <br />
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSelected}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? "Đang xử lý..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTableCompany
        data={companies.data?.items || []}
        pagination={{
          currentPage: companies.data?.currentPage || 1,
          pageSize: companies.data?.pageSize || 10,
          totalPages: companies.data?.totalPages || 0,
          totalRecords: companies.data?.totalRecords || 0,
        }}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onFiltersChange={handleFiltersChange}
        onSelectCompany={handleSelectCompany}
        selectedCompanies={selectedCompanies}
        onRefresh={() => updateParams({ pageNumber: 1 })}
      />
    </div>
  );
} 