"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Plus, Trash2 } from "lucide-react";
import { DataTableCompany } from "./ui/DataTableCompany";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { AddCompanyForm } from "./ui/AddCompanyForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { EditCompanyForm } from "./ui/EditCompanyForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { 
  fetchCompanies, 
  addCompany, 
  updateCompany, 
  deleteCompanies,
  setSelectedCompanies,
} from "@/redux/features/companySlice";
import { Company } from "@/types/company";
import { sampleCompanies } from "./data/sampleData";

export default function CompaniesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { companies, loading, selectedCompanies } = useAppSelector((state) => state.companies);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companiesState, setCompaniesState] = useState<Company[]>(sampleCompanies);
  useSetPageTitle();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleAddCompany = async (data: any) => {
    try {
      await dispatch(addCompany(data)).unwrap();
      toast.success("Thêm công ty thành công");
      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi thêm công ty");
      throw error;
    }
  };

  const handleUpdateCompany = async (data: any) => {
    if (!selectedCompany) return;

    try {
      await dispatch(updateCompany({ ...data, id: selectedCompany.id })).unwrap();
      toast.success("Cập nhật công ty thành công");
      setIsEditDialogOpen(false);
      setSelectedCompany(null);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật công ty");
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      await dispatch(deleteCompanies([id])).unwrap();
      toast.success("Xóa công ty thành công");
      setCompaniesState(companiesState.filter((company) => company.id !== id));
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xóa công ty");
    }
  };

  const handleDeleteMultipleCompanies = async (companyIds: string[]) => {
    try {
      const result = await dispatch(deleteCompanies(companyIds)).unwrap();
      toast.success(`Đã xóa ${result.result.deletedCount}/${result.result.totalRequested} công ty`);
      setCompaniesState(companiesState.filter((company) => !companyIds.includes(company.id)));
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xóa công ty");
    }
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý công ty</h1>
      </div>
      <DataTableCompany
        data={companiesState}
        onDelete={handleDeleteCompany}
        onEditCompany={handleEditCompany}
        selectedCompanies={selectedCompanies}
        setSelectedCompanies={(companies) => dispatch(setSelectedCompanies(companies))}
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm công ty mới</DialogTitle>
          </DialogHeader>
          <AddCompanyForm
            onSubmit={handleAddCompany}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <EditCompanyForm
        company={selectedCompany}
        onUpdateCompany={handleUpdateCompany}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
} 