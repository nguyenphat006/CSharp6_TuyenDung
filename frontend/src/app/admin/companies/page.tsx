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

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/Company");
      if (response.data.result) {
        setCompanies(response.data.data);
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi tải dữ liệu");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDeleteSelected = () => {
    setShowDeleteDialog(true);
  };

  const confirmDeleteSelected = async () => {
    try {
      setDeleteLoading(true);
      const selectedIds = Object.keys(rowSelection).map(
        (index) => companies[parseInt(index)].id
      );

      const response = await axiosClient.delete("/api/Company", {
        data: {
          companysId: selectedIds
        }
      });

      if (response.data.result) {
        toast.success(response.data.message || "Xóa các công ty đã chọn thành công");
        setRowSelection({});
        fetchCompanies();
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi xóa các công ty đã chọn");
      }
    } catch (error: any) {
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
          {Object.keys(rowSelection).length > 0 && (
            <Button
              variant="destructive"
              onClick={handleDeleteSelected}
              disabled={deleteLoading}
            >
              <Trash className="mr-2 h-4 w-4" />
              Xóa {Object.keys(rowSelection).length} công ty
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
              Bạn có chắc chắn muốn xóa {Object.keys(rowSelection).length} công ty đã chọn?
              <br />
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteSelected}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? "Đang xử lý..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {loading ? (
        <div className="flex items-center justify-center h-24">
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <DataTableCompany 
          data={companies} 
          onRefresh={fetchCompanies}
          onRowSelectionChange={setRowSelection}
        />
      )}
    </div>
  );
} 