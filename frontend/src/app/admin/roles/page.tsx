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
import { Download, Plus } from "lucide-react";
import { DataTableRole } from "./ui/DataTableRole";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { AddRoleForm } from "./ui/AddRoleForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getRoles } from "@/services/roleService";
import type { Role } from "@/services/roleService";

export default function RolesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [permissionFilter, setPermissionFilter] = useState<string>("all");
  const [roles, setRoles] = useState<Role[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  useSetPageTitle();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        if (response.result) {
          setRoles(response.data);
        } else {
          toast.error(response.message || "Có lỗi xảy ra khi lấy danh sách vai trò");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi lấy danh sách vai trò");
      }
    };

    fetchRoles();
  }, []);

  const handleAddRole = async (data: Partial<Role>) => {
    try {
      // TODO: Gọi API thêm role
      const newRole: Role = {
        id: String(roles.length + 1),
        name: data.name || "",
        createdAt: new Date().toISOString(),
        createdBy: null,
        updatedAt: null,
        isActive: true,
        ...data
      };
      setRoles([...roles, newRole]);
      setIsAddDialogOpen(false);
      toast.success("Thêm vai trò thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vai trò");
    }
  };

  const handleUpdateRole = async (id: string, data: Partial<Role>) => {
    try {
      // TODO: Gọi API cập nhật role
      setRoles(roles.map(role => 
        role.id === id 
          ? { ...role, ...data, updatedAt: new Date().toISOString() } 
          : role
      ));
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      // TODO: Gọi API xóa role
      setRoles(roles.filter(role => role.id !== id));
      toast.success("Xóa vai trò thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa vai trò");
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý vai trò</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm vai trò
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm vai trò mới</DialogTitle>
            </DialogHeader>
            <AddRoleForm onAddRole={handleAddRole} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Tìm kiếm theo tên, mô tả..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex gap-4">
          <Select value={permissionFilter} onValueChange={setPermissionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Quyền hạn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTableRole
        data={roles}
        onUpdateRole={handleUpdateRole}
        onDeleteRole={handleDeleteRole}
      />
    </div>
  );
} 