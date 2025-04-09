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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Trash, Eye, ChevronLeft, ChevronRight, Search } from "lucide-react";
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
import { useState } from "react";
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

interface DataTableCompanyProps {
  data: Company[];
  onRefresh: () => void;
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
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
    industry: string;
    companySize: string;
    address: string;
  }) => void;
}

export function DataTableCompany({ 
  data, 
  onRefresh,
  onRowSelectionChange,
  pagination,
  onPageChange,
  onPageSizeChange,
  onFiltersChange
}: DataTableCompanyProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [showDeleteSelectedDialog, setShowDeleteSelectedDialog] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filters, setFilters] = useState({
    keyword: "",
    industry: "",
    companySize: "",
    address: ""
  });

  // Notify parent component when row selection changes
  React.useEffect(() => {
    onRowSelectionChange?.(rowSelection);
  }, [rowSelection, onRowSelectionChange]);

  // Update filters when column filters change
  React.useEffect(() => {
    const newFilters = {
      keyword: "",
      industry: "",
      companySize: "",
      address: ""
    };

    columnFilters.forEach((filter) => {
      if (filter.id === "name") {
        newFilters.keyword = filter.value as string;
      } else if (filter.id === "industry") {
        newFilters.industry = filter.value as string;
      } else if (filter.id === "companySize") {
        newFilters.companySize = filter.value as string;
      } else if (filter.id === "address") {
        newFilters.address = filter.value as string;
      }
    });

    // Chỉ cập nhật khi có sự thay đổi
    if (
      newFilters.keyword !== filters.keyword ||
      newFilters.industry !== filters.industry ||
      newFilters.companySize !== filters.companySize ||
      newFilters.address !== filters.address
    ) {
      setFilters(newFilters);
      onFiltersChange(newFilters);
    }
  }, [columnFilters]);

  // Lấy danh sách unique các giá trị cho bộ lọc
  const uniqueLocations = React.useMemo(() => {
    return Array.from(
      new Set(
        data
          .map((company) => company.address)
          .filter((address) => address && address.trim() !== "")
      )
    ).sort();
  }, [data]);

  const uniqueIndustries = React.useMemo(() => {
    return Array.from(
      new Set(
        data
          .map((company) => company.industry)
          .filter((industry) => industry && industry.trim() !== "")
      )
    ).sort();
  }, [data]);

  const companyModels = ["Onsite", "Remote", "Hybrid"];
  const companySizes = ["1-50", "51-150", "151-300", "301-500", "500+"];

  const handleDelete = async (company: Company) => {
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

      if (response.data.result) {
        toast.success(response.data.message || "Xóa công ty thành công");
        onRefresh();
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi xóa công ty");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa công ty");
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
      setCompanyToDelete(null);
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteSelectedDialog(true);
  };

  const confirmDeleteSelected = async () => {
    try {
      setLoading(true);
      const selectedIds = Object.keys(rowSelection).map(
        (index) => data[parseInt(index)].id
      );

      const response = await axiosClient.delete("/api/Company", {
        data: {
          companysId: selectedIds
        }
      });

      if (response.data.result) {
        toast.success(response.data.message || "Xóa các công ty đã chọn thành công");
        setRowSelection({});
        onRefresh();
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi xóa các công ty đã chọn");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa các công ty đã chọn");
    } finally {
      setLoading(false);
      setShowDeleteSelectedDialog(false);
    }
  };

  const handleFilterChange = (columnId: string, value: string) => {
    const newFilters = { ...filters };
    if (columnId === "name") {
      newFilters.keyword = value;
    } else if (columnId === "industry") {
      newFilters.industry = value === "all" ? "" : value;
    } else if (columnId === "companySize") {
      newFilters.companySize = value === "all" ? "" : value;
    } else if (columnId === "address") {
      newFilters.address = value === "all" ? "" : value;
    }

    // Chỉ cập nhật khi có sự thay đổi
    if (
      newFilters.keyword !== filters.keyword ||
      newFilters.industry !== filters.industry ||
      newFilters.companySize !== filters.companySize ||
      newFilters.address !== filters.address
    ) {
      setFilters(newFilters);
      onFiltersChange(newFilters);
    }
  };

  const columns: ColumnDef<Company>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7152";
        return (
          <div className="relative w-10 h-10">
            {logo ? (
              <div className="w-full h-full">
                <img
                  src={`${apiUrl}${logo}`}
                  alt={`${row.getValue("name")} logo`}
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.src = "/img/company/default.png"; // Fallback image
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                <span className="text-xs text-muted-foreground">No logo</span>
              </div>
            )}
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
                    setSelectedCompany(company);
                    setShowDescription(true);
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
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm công ty..."
            className="pl-8"
            value={filters.keyword}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilterChange("name", e.target.value);
              }
            }}
          />
        </div>
        <Select
          value={filters.industry || "all"}
          onValueChange={(value) => handleFilterChange("industry", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ngành nghề" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {uniqueIndustries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.companySize || "all"}
          onValueChange={(value) => handleFilterChange("companySize", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Quy mô" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {companySizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.address || "all"}
          onValueChange={(value) => handleFilterChange("address", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Địa điểm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {uniqueLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={Object.keys(rowSelection).length === data.length}
                  onChange={(e) => {
                    const newSelection: Record<string, boolean> = {};
                    if (e.target.checked) {
                      data.forEach((_, index) => {
                        newSelection[index] = true;
                      });
                    }
                    setRowSelection(newSelection);
                    onRowSelectionChange?.(newSelection);
                  }}
                />
              </TableHead>
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
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={rowSelection[index] || false}
                    onChange={(e) => {
                      setRowSelection((prev) => ({
                        ...prev,
                        [index]: e.target.checked,
                      }));
                      onRowSelectionChange?.(rowSelection);
                    }}
                  />
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
                          setSelectedCompany(company);
                          setShowDescription(true);
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
              Bạn có chắc chắn muốn xóa {Object.keys(rowSelection).length} công ty đã chọn?
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

      <Dialog open={showDescription} onOpenChange={setShowDescription}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mô tả công ty</DialogTitle>
          </DialogHeader>
          <div 
            className="prose prose-stone dark:prose-invert max-w-none [&>ul]:list-disc [&>ul]:pl-10 [&>ol]:list-decimal [&>ol]:pl-10 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_li]:pl-2 [&_ul]:my-2 [&_ol]:my-2"
            dangerouslySetInnerHTML={{ __html: selectedCompany?.description || "" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 