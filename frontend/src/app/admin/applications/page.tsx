"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Application } from "@/types/application";
import { ApplicationSidebar } from "./_components/application-sidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import React from "react";

interface ApiResponse {
  result: boolean;
  status: number;
  data: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    items: Application[];
  };
  message: string;
}

interface FilterParams {
  email?: string;
  status?: string;
  companyId?: string;
  jobId?: string;
  pageNumber: number;
  pageSize: number;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const columns: ColumnDef<Application>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user.name",
    header: "Tên người nộp",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "PENDING" ? "secondary" : status === "APPROVED" ? "success" : "destructive"}>
          {status === "PENDING" ? "Đang chờ" : status === "APPROVED" ? "Đã duyệt" : "Từ chối"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "job.name",
    header: "Job liên quan",
  },
  {
    accessorKey: "company.name",
    header: "Company liên quan",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: vi });
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày cập nhật",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      return date ? format(new Date(date), "dd/MM/yyyy HH:mm", { locale: vi }) : "-";
    },
  },
];

export default function ApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Application[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  const handleFilterChange = (key: keyof FilterParams, value: string | number) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value, pageNumber: 1 };
      
      // Clear timeout cũ nếu có
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      
      // Set timeout mới
      const timeout = setTimeout(() => {
        refetch();
      }, 300);
      
      setDebounceTimeout(timeout);
      return newFilters;
    });
  };

  const { data, isLoading, refetch } = useQuery<ApiResponse>({
    queryKey: ["applications", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:7152/api/Resume?${params.toString()}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Có lỗi xảy ra khi tải dữ liệu");
        return {
          result: false,
          status: 500,
          data: {
            currentPage: 1,
            pageSize: 10,
            totalRecords: 0,
            totalPages: 0,
            items: []
          },
          message: "Error"
        };
      }
    },
    staleTime: 30000, // Cache trong 30 giây
    gcTime: 5 * 60 * 1000, // Cache trong 5 phút
  });

  const table = useReactTable({
    data: data?.data?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageIndex: filters.pageNumber - 1,
        pageSize: filters.pageSize,
      },
    },
    manualPagination: true,
    pageCount: data?.data?.totalPages || 0,
  });

  const { mutate: deleteResumes, isPending: isDeleting } = useMutation({
    mutationFn: async (resumeIds: string[]) => {
      const token = localStorage.getItem('token');
      const response = await axios.delete("https://localhost:7152/api/Resume", {
        data: { resumeIds },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Xóa đơn ứng tuyển thành công");
      setSelectedRows([]);
    },
    onError: (error: Error) => {
      console.error("Failed to delete resumes:", error);
      toast.error("Xóa đơn ứng tuyển thất bại");
    },
  });

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một đơn ứng tuyển để xóa");
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedRows.length} đơn ứng tuyển đã chọn?`)) {
      deleteResumes(selectedRows.map(row => row.id));
    }
  };

  const pagination: PaginationProps = {
    currentPage: data?.data.currentPage || 1,
    totalPages: data?.data.totalPages || 1,
    pageSize: data?.data.pageSize || 10,
    onPageChange: (page: number) => handleFilterChange("pageNumber", page),
  };

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn xin việc</h1>
        {selectedRows.length > 0 && (
          <Button
            variant="destructive"
            onClick={handleDeleteSelected}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Xóa ({selectedRows.length})
          </Button>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Tìm kiếm theo email"
            value={filters.email || ""}
            onChange={(e) => handleFilterChange("email", e.target.value)}
            className="w-[200px]"
          />
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Đang chờ</SelectItem>
              <SelectItem value="APPROVED">Đã duyệt</SelectItem>
              <SelectItem value="REJECTED">Từ chối</SelectItem>
            </SelectContent>
          </Select>
          {(filters.email || filters.status) && (
            <Button
              variant="outline"
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  email: "",
                  status: "",
                  pageNumber: 1
                }));
              }}
            >
              Hủy bộ lọc
            </Button>
          )}
          <div className="ml-auto">
            <DataTableViewOptions table={table} />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    setSelectedApplication(row.original);
                    setIsSidebarOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <DataTablePagination
          table={table}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}

      <ApplicationSidebar
        application={selectedApplication}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
} 