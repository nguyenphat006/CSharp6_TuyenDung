"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Employer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: "active" | "pending" | "blocked";
  createdAt: Date;
  lastLogin: Date;
  jobsPosted: number;
  avatar: string;
}

interface DataTableEmployerProps {
  data: Employer[];
  onUpdateEmployer: (id: string, data: Omit<Employer, "id" | "createdAt" | "lastLogin" | "jobsPosted">) => void;
  onDeleteEmployer: (id: string) => void;
}

export function DataTableEmployer({ data, onUpdateEmployer, onDeleteEmployer }: DataTableEmployerProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employerToDelete, setEmployerToDelete] = useState<string | null>(null);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    setEmployerToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (employerToDelete) {
      onDeleteEmployer(employerToDelete);
      setDeleteDialogOpen(false);
      setEmployerToDelete(null);
    }
  };

  const handleEdit = (employerId: string) => {
    router.push(`/admin/employer/${employerId}/edit`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Thông tin</TableHead>
              <TableHead>Liên hệ</TableHead>
              <TableHead>Công ty</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Đăng nhập cuối</TableHead>
              <TableHead>Việc đã đăng</TableHead>
              <TableHead className="w-[100px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((employer) => (
              <TableRow key={employer.id}>
                <TableCell className="font-medium">{employer.id}</TableCell>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={employer.avatar} />
                    <AvatarFallback>{employer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{employer.name}</div>
                    <div className="text-sm text-muted-foreground">{employer.position}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>{employer.email}</div>
                  <div className="text-sm text-muted-foreground">{employer.phone}</div>
                </TableCell>
                <TableCell>{employer.company}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(employer.status)}>
                    {employer.status === "active" && "Hoạt động"}
                    {employer.status === "pending" && "Chờ xác minh"}
                    {employer.status === "blocked" && "Bị khóa"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(employer.createdAt, "dd/MM/yyyy", { locale: vi })}
                </TableCell>
                <TableCell>
                  {format(employer.lastLogin, "dd/MM/yyyy", { locale: vi })}
                </TableCell>
                <TableCell>{employer.jobsPosted}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(employer.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(employer.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
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

      {/* Phân trang */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Số dòng mỗi trang:</span>
          <Select value={rowsPerPage.toString()} onValueChange={(value) => {
            setRowsPerPage(Number(value));
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </Button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Sau
          </Button>
        </div>
      </div>

      {/* Dialog xác nhận xóa */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa nhà tuyển dụng này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 