"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTableRole } from "./ui/DataTableRole";
import { AddRoleForm } from "./ui/AddRoleForm";
import { EditRoleForm } from "./ui/EditRoleForm";
import { Role, getRoles, createRole, updateRole, deleteRole } from "@/services/roleService";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RolesPage() {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      console.log('API Response:', response); // Debug log
      if (response.result) {
        setRoles(response.data);
        console.log('Roles set:', response.data); // Debug log
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi tải danh sách vai trò");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Không thể tải danh sách vai trò");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async (data: { name: string; isActive: boolean }) => {
    try {
      const response = await createRole(data);
      if (response.result) {
        await fetchRoles();
        setIsAddDialogOpen(false);
        toast.success(response.message || "Thêm vai trò thành công");
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi thêm vai trò");
      }
    } catch (error) {
      console.error("Error adding role:", error);
      toast.error("Không thể thêm vai trò");
      throw error;
    }
  };

  const handleUpdateRole = async (data: { name: string; isActive: boolean }) => {
    if (!selectedRole) return;

    try {
      const response = await updateRole(selectedRole.id, data);
      if (response.result) {
        await fetchRoles();
        setIsEditDialogOpen(false);
        setSelectedRole(null);
        toast.success(response.message || "Cập nhật vai trò thành công");
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi cập nhật vai trò");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Không thể cập nhật vai trò");
      throw error;
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      const response = await deleteRole(id);
      if (response.result) {
        await fetchRoles();
        toast.success(response.message || "Xóa vai trò thành công");
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi xóa vai trò");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Không thể xóa vai trò");
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditDialogOpen(true);
  };

  console.log('Current roles state:', roles); // Debug log

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý vai trò</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm vai trò
        </Button>
      </div>

      <DataTableRole
        roles={roles}
        onDeleteRole={handleDeleteRole}
        onEditRole={handleEditRole}
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm vai trò mới</DialogTitle>
          </DialogHeader>
          <AddRoleForm
            onSubmit={handleAddRole}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <EditRoleForm
        role={selectedRole}
        onUpdateRole={handleUpdateRole}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}
