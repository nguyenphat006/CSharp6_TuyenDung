"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, X, Pencil, Trash } from "lucide-react";
import { DataTableJobs } from "./ui/DataTableJobs";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { toast } from "sonner";
import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/services/jobService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JobForm } from "./components/JobForm";
import { jobService } from "@/services/jobService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function JobsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [companyFilter, setCompanyFilter] = useState<string>("");
  const [minSalary, setMinSalary] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const { jobs, loading, error, updateParams, fetchJobs } = useJobs({
    pageNumber: 1,
    pageSize: 10,
  });

  useSetPageTitle();

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await jobService.deleteMany([id]);
      toast.success("Xóa công việc thành công");
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Có lỗi xảy ra khi xóa công việc");
    }
  };

  const handleDeleteMany = async () => {
    if (selectedJobs.length === 0) {
      toast.error("Vui lòng chọn ít nhất một công việc để xóa");
      return;
    }

    try {
      setDeleteLoading(true);
      await jobService.deleteMany(selectedJobs);
      toast.success(`Đã xóa thành công ${selectedJobs.length} công việc`);
      setSelectedJobs([]);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting jobs:", error);
      toast.error("Có lỗi xảy ra khi xóa công việc");
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleSelectJob = (id: string) => {
    setSelectedJobs((prev) =>
      prev.includes(id)
        ? prev.filter((jobId) => jobId !== id)
        : [...prev, id]
    );
  };

  const handleSearch = () => {
    updateParams({
      keyword: searchQuery,
      level: levelFilter === "all" ? undefined : levelFilter,
      location: locationFilter || undefined,
      companyName: companyFilter || undefined,
      minSalary: minSalary ? Number(minSalary) : undefined,
      maxSalary: maxSalary ? Number(maxSalary) : undefined,
      isActive: statusFilter === "all" ? undefined : statusFilter === "active",
      pageNumber: 1,
    });
    setIsSearchOpen(false);
  };

  const handlePageChange = (pageNumber: number) => {
    updateParams({
      pageNumber,
    });
  };

  const handlePageSizeChange = (pageSize: number) => {
    updateParams({
      pageSize,
      pageNumber: 1,
    });
  };

  const handleCreate = async (data: any) => {
    try {
      await jobService.create(data);
      setShowForm(false);
      fetchJobs();
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Có lỗi xảy ra khi tạo công việc");
    }
  };

  const handleEdit = (job: Job) => {
    router.push(`/admin/jobs/${job.id}/edit`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý việc làm</h1>
        <div className="flex gap-2">
          {selectedJobs.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleteLoading}
            >
              <Trash className="mr-2 h-4 w-4" />
              Xóa {selectedJobs.length} công việc
            </Button>
          )}
          <Button variant="outline" onClick={() => setIsSearchOpen(true)}>
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm
          </Button>
          <Link href="/admin/jobs/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm việc làm
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div>
        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <DataTableJobs 
            data={jobs?.data.items || []} 
            onUpdateJob={async (jobId, updatedJob) => {
              await router.push(`/admin/jobs/${jobId}/edit`);
            }}
            onDeleteJob={handleDelete}
            onSelectJob={handleSelectJob}
            selectedJobs={selectedJobs}
            pagination={{
              currentPage: jobs?.data.currentPage || 1,
              totalPages: jobs?.data.totalPages || 1,
              pageSize: jobs?.data.pageSize || 10,
              onPageChange: handlePageChange,
              onPageSizeChange: handlePageSizeChange,
            }}
          />
        )}
      </div>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Tìm kiếm việc làm</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Từ khóa</label>
              <Input
                placeholder="Tìm kiếm theo tiêu đề, công ty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cấp bậc</label>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn cấp bậc" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="intern">Thực tập sinh</SelectItem>
                  <SelectItem value="fresher">Fresher</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Middle</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Địa điểm</label>
              <Input
                placeholder="Nhập địa điểm..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Công ty</label>
              <Input
                placeholder="Nhập tên công ty..."
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mức lương tối thiểu</label>
              <Input
                type="number"
                placeholder="Nhập mức lương tối thiểu"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mức lương tối đa</label>
              <Input
                type="number"
                placeholder="Nhập mức lương tối đa"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Trạng thái</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang tuyển</SelectItem>
                  <SelectItem value="inactive">Đã đóng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsSearchOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Thêm công việc mới</DialogTitle>
          </DialogHeader>
          <JobForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa nhiều</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa {selectedJobs.length} công việc đã chọn?
              <br />
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMany}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? "Đang xử lý..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
