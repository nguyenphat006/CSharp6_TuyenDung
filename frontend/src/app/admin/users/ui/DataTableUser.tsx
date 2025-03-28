"use client";

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
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "candidate" | "employer" | "admin";
  status: "active" | "pending" | "blocked";
  avatar?: string;
  createdAt: Date;
}

interface DataTableUserProps {
  data: User[];
}

export function DataTableUser({ data }: DataTableUserProps) {
  const router = useRouter();

  const getStatusBadge = (status: User["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-orange-100 text-orange-800",
      blocked: "bg-red-100 text-red-800",
    };
    const labels = {
      active: "✅ Hoạt động",
      pending: "⏳ Chờ xác minh",
      blocked: "🚫 Bị khóa",
    };
    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  const getRoleLabel = (role: User["role"]) => {
    const labels = {
      candidate: "Ứng viên",
      employer: "Nhà tuyển dụng",
      admin: "Admin",
    };
    return labels[role];
  };

  const handleEdit = (userId: string) => {
    router.push(`/admin/users/${userId}/edit`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã User</TableHead>
            <TableHead>Ảnh đại diện</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Ngày đăng ký</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[100px]">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50">
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleLabel(user.role)}</TableCell>
              <TableCell>
                {formatDistanceToNow(user.createdAt, {
                  addSuffix: true,
                  locale: vi,
                })}
              </TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                      📝 Chỉnh sửa thông tin
                    </DropdownMenuItem>
                    <DropdownMenuItem>🔄 Cập nhật vai trò</DropdownMenuItem>
                    <DropdownMenuItem>
                      {user.status === "blocked" ? "🔓 Mở khóa" : "🔒 Khóa"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>🔍 Xem hồ sơ</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      🗑 Xóa người dùng
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
