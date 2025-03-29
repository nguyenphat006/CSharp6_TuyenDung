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
  avatar?: string;
}

interface DataTableEmployerProps {
  data: Employer[];
}

export function DataTableEmployer({ data }: DataTableEmployerProps) {
  const router = useRouter();

  const handleDelete = (employerId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete employer:", employerId);
  };

  const handleEdit = (employerId: string) => {
    router.push(`/admin/employer/${employerId}/edit`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Thông tin</TableHead>
            <TableHead>Công ty</TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Đăng nhập cuối</TableHead>
            <TableHead>Việc đã đăng</TableHead>
            <TableHead className="w-[100px]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((employer) => (
            <TableRow key={employer.id}>
              <TableCell className="font-medium">{employer.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={employer.avatar} />
                    <AvatarFallback>
                      {employer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{employer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {employer.email}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {employer.phone}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{employer.company}</TableCell>
              <TableCell>{employer.position}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    employer.status === "active"
                      ? "default"
                      : employer.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {employer.status === "active"
                    ? "Hoạt động"
                    : employer.status === "pending"
                    ? "Chờ xác minh"
                    : "Bị khóa"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(employer.createdAt).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>
                {new Date(employer.lastLogin).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>{employer.jobsPosted}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Mở menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(employer.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(employer.id)}
                      className="text-red-600"
                    >
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
  );
} 