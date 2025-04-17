"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActivityLog } from "@/types/activityLog";
import { getActivityLogs } from "@/services/activityLogService";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "sonner";

interface ActivityLogDataTableProps {
  fromDate?: string;
  toDate?: string;
}

export function ActivityLogDataTable({ fromDate, toDate }: ActivityLogDataTableProps) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await getActivityLogs({
        fromDate,
        toDate,
        pageNumber: currentPage - 1,
        pageSize,
      });

      console.log('Component received data:', response);

      if (response.result && response.data) {
        setLogs(response.data);
        setTotalPages(response.totalPages);
      } else {
        setLogs([]);
        toast.error("Không thể tải dữ liệu");
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]);
      toast.error("Có lỗi xảy ra khi tải nhật ký");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentPage, fromDate, toDate]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss", { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Hành động</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Thời gian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : !Array.isArray(logs) || logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.userName}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell>{log.targetType}</TableCell>
                  <TableCell>{formatDate(log.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
          >
            Trước
          </Button>
          <div className="text-sm">
            Trang {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || isLoading}
          >
            Sau
          </Button>
        </div>
      )}
    </div>
  );
} 