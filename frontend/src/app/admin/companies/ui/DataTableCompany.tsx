"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Trash, Eye, ChevronLeft, ChevronRight, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Company } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { axiosClient } from "@/lib/axios-client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getProvinces } from "@/services/locationService";

interface DataTableCompanyProps {
  data: Company[];
  onRefresh: () => void;
  onSelectCompany: (companyId: string) => void;
  selectedCompanies: string[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onFiltersChange: (filters: {
    keyword: string;
    industry?: string;
    companySize: string;
    address: string;
  }) => void;
}

const industries = [
  "Công nghệ thông tin",
  "Phát triển phần mềm",
  "Dịch vụ CNTT",
  "Thương mại điện tử",
  "An ninh mạng",
  "Điện toán đám mây (Cloud Computing)",
  "Trí tuệ nhân tạo (AI)",
  "Học máy (Machine Learning)",
  "Blockchain",
  "Phân tích dữ liệu (Data Analytics)",
  "Internet vạn vật (IoT)",
  "Phát triển trò chơi (Game Development)",
  "Thiết kế giao diện người dùng (UI/UX)",
  "Quản trị hệ thống và mạng",
  "Khoa học máy tính ứng dụng"
];

const companySizes = [
  "1-50",
  "51-150",
  "151-300",
  "301-500",
  "500+"
];

export function DataTableCompany({
  data,
  onRefresh,
  onSelectCompany,
  selectedCompanies = [],
  pagination,
  onPageChange,
  onPageSizeChange,
  onFiltersChange,
}: DataTableCompanyProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [showDeleteSelectedDialog, setShowDeleteSelectedDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filters, setFilters] = useState<{
    keyword: string;
    industry?: string;
    companySize: string;
    address: string;
  }>({
    keyword: "",
    industry: undefined,
    companySize: "",
    address: "",
  });
  const [provinces, setProvinces] = useState<{ name: string; code: number }[]>([]);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (typeof onSelectCompany === 'function') {
      if (checked) {
        data.forEach(company => onSelectCompany(company.id));
      } else {
        data.forEach(company => onSelectCompany(company.id));
      }
    }
  };

  const handleSelectCompany = (companyId: string) => {
    if (typeof onSelectCompany === 'function') {
      onSelectCompany(companyId);
    }
  };

  const handleDelete = (company: Company) => {
    setCompanyToDelete(company);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!companyToDelete) return;

    try {
      setLoading(true);
      const response = await axiosClient.delete("/api/Company", {
        data: {
          companysId: [companyToDelete.id]
        }
      });

      if (response.data && response.data.result === true) {
        toast.success(response.data.message || "Xóa công ty thành công");
        setShowDeleteDialog(false);
        setCompanyToDelete(null);
        if (typeof onRefresh === 'function') {
          await onRefresh();
        }
      } else {
        toast.error(response.data?.message || "Có lỗi xảy ra khi xóa công ty");
        setShowDeleteDialog(false);
      }
    } catch (error: any) {
      console.error("Error deleting company:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa công ty");
      setShowDeleteDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteSelected = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.delete("/api/Company", {
        data: {
          companysId: selectedCompanies
        }
      });

      if (response.data && response.data.result === true) {
        toast.success(response.data.message || "Xóa các công ty đã chọn thành công");
        setShowDeleteSelectedDialog(false);
        if (typeof onRefresh === 'function') {
          await onRefresh();
        }
      } else {
        toast.error(response.data?.message || "Có lỗi xảy ra khi xóa các công ty đã chọn");
        setShowDeleteSelectedDialog(false);
      }
    } catch (error: any) {
      console.error("Error deleting selected companies:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa các công ty đã chọn");
      setShowDeleteSelectedDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setShowEditDialog(true);
  };

  const getLogoUrl = (logo: string | null): string => {
    if (!logo) return "/img/company/default.jpg";
    if (logo.startsWith('http')) return logo;
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7152'}${logo}`;
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;

    try {
      setLoading(true);
      const response = await axiosClient.put("/api/Company", editingCompany);

      if (response.data && response.data.result === true) {
        toast.success(response.data.message || "Cập nhật công ty thành công");
        setShowEditDialog(false);
        await onRefresh();
      } else {
        toast.error(response.data?.message || "Có lỗi xảy ra khi cập nhật công ty");
        setShowEditDialog(false);
      }
    } catch (error: any) {
      console.error("Error editing company:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật công ty");
      setShowEditDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnDef<Company>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            data.length > 0 && selectedCompanies.length === data.length
          }
          onCheckedChange={(checked) => {
            if (checked) {
              data.forEach((company) => onSelectCompany(company.id));
            } else {
              data.forEach((company) => onSelectCompany(company.id));
            }
          }}
          aria-label="Chọn tất cả"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedCompanies.includes(row.original.id)}
          onCheckedChange={() => onSelectCompany(row.original.id)}
          aria-label="Chọn hàng"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "logoUrl",
      header: "Logo",
      cell: ({ row }) => {
        const logo = row.getValue("logoUrl") as string;
        const logoUrl = getLogoUrl(logo);
        
        return (
          <div className="relative w-10 h-10">
            <img
              src={logoUrl}
              alt={`${row.getValue("name")} logo`}
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://via.placeholder.com/40x40?text=No+Logo";
              }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên công ty
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "companyModel",
      header: "Mô hình",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("companyModel")}</div>
      ),
      filterFn: (row, id, value) => {
        return value === "" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "industry",
      header: "Lĩnh vực",
      cell: ({ row }) => <div>{row.getValue("industry")}</div>,
      filterFn: (row, id, value) => {
        return value === "" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "companySize",
      header: "Quy mô",
      cell: ({ row }) => <div>{row.getValue("companySize")}</div>,
      filterFn: (row, id, value) => {
        return value === "" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "address",
      header: "Địa chỉ",
      cell: ({ row }) => <div>{row.getValue("address")}</div>,
      filterFn: (row, id, value) => {
        return value === "" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "workingTime",
      header: "Giờ làm việc",
      cell: ({ row }) => <div>{row.getValue("workingTime")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        return format(new Date(date), "dd/MM/yyyy");
      },
    },
    {
      accessorKey: "isActive",
      header: "Trạng thái",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge variant={isActive ? "success" : "secondary"}>
            {isActive ? "Đang hoạt động" : "Không hoạt động"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        const company = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Mở menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push(`/admin/companies/edit/${company.id}`)}
                className="flex items-center"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (company.description) {
                    onSelectCompany(company.id);
                  }
                }}
                className="flex items-center"
                disabled={!company.description}
              >
                <Eye className="mr-2 h-4 w-4" />
                Xem mô tả
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(company)}
                className="flex items-center text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const filteredProvinces = provinces.filter(province => 
    province.name.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm công ty..."
            className="pl-8"
            value={filters.keyword}
            onChange={(e) => {
              setFilters({ ...filters, keyword: e.target.value });
              onFiltersChange({ ...filters, keyword: e.target.value });
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                onFiltersChange({ ...filters, keyword: e.currentTarget.value });
              }
            }}
          />
        </div>
        <Select
          value={filters.industry || ""}
          onValueChange={(value) => {
            setFilters({ ...filters, industry: value });
            onFiltersChange({ ...filters, industry: value });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lĩnh vực" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.companySize || ""}
          onValueChange={(value) => {
            setFilters({ ...filters, companySize: value });
            onFiltersChange({ ...filters, companySize: value });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Quy mô" />
          </SelectTrigger>
          <SelectContent>
            {companySizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size} nhân viên
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.address || ""}
          onValueChange={(value) => {
            setFilters({ ...filters, address: value });
            onFiltersChange({ ...filters, address: value });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Địa điểm" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <div className="sticky top-0 z-10 bg-background p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm..."
                  className="pl-8 h-8"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[250px]">
              {filteredProvinces.map((province) => (
                <SelectItem key={province.code} value={province.name}>
                  {province.name}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
        {(filters.keyword || filters.industry || filters.companySize || filters.address) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newFilters = {
                keyword: "",
                industry: "",
                companySize: "",
                address: ""
              };
              setFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          >
            Xóa bộ lọc
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    data.length > 0 && selectedCompanies.length === data.length
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      data.forEach((company) => onSelectCompany(company.id));
                    } else {
                      data.forEach((company) => onSelectCompany(company.id));
                    }
                  }}
                />
              </TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Tên công ty</TableHead>
              <TableHead>Ngành nghề</TableHead>
              <TableHead>Quy mô</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((company, index) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCompanies.includes(company.id)}
                    onCheckedChange={() => onSelectCompany(company.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative w-10 h-10">
                    <img
                      src={getLogoUrl(company.logoUrl)}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://via.placeholder.com/40x40?text=No+Logo";
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.companySize}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>
                  <Badge variant={company.isActive ? "success" : "secondary"}>
                    {company.isActive ? "Đang hoạt động" : "Không hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/admin/companies/edit/${company.id}`)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          onSelectCompany(company.id);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Xem mô tả
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(company)}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Hiển thị {data.length} trong tổng số {pagination.totalRecords} công ty
          </p>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Trang {pagination.currentPage} / {pagination.totalPages}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa công ty "{companyToDelete?.name}"?
              <br />
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? "Đang xử lý..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteSelectedDialog} onOpenChange={setShowDeleteSelectedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa nhiều</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa {selectedCompanies?.length || 0} công ty đã chọn?
              <br />
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteSelected}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? "Đang xử lý..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa công ty</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Logo</Label>
              {editingCompany?.logoUrl && (
                <div className="mb-2">
                  <img
                    src={getLogoUrl(editingCompany.logoUrl)}
                    alt="Company logo"
                    className="w-32 h-32 object-contain"
                  />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditingCompany((prev) => ({
                      ...prev!,
                      logo: URL.createObjectURL(file),
                    }));
                  }
                }}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 