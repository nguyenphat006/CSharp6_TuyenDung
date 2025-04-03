"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
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
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

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
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7152/api/Roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi thêm vai trò");
      }

      const result = await response.json();
      if (result.result) {
        // Thêm vai trò mới vào state
        setRoles(prevRoles => [...prevRoles, result.data]);
        setIsAddDialogOpen(false);
        toast.success(result.message || "Thêm vai trò thành công");
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi thêm vai trò");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vai trò:", error);
      toast.error("Không thể thêm vai trò");
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
      const response = await deleteRole([id]);
      if (response.result) {
        await fetchRoles();
        toast.success(response.message || `Đã xóa ${response.data.deletedCount} vai trò thành công`);
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi xóa vai trò");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Không thể xóa vai trò");
    }
  };

  const handleDeleteMultipleRoles = async (roleIds: string[]) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7152/api/Roles", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roleIds }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi xóa vai trò");
      }

      const data = await response.json();
      toast.success(`Đã xóa ${data.data.deletedCount} vai trò thành công`);
      setSelectedRoles([]); // Reset selected roles
      // Refresh data
      const updatedRoles = roles.filter(role => !roleIds.includes(role.id));
      setRoles(updatedRoles);
    } catch (error) {
      console.error("Lỗi khi xóa vai trò:", error);
      toast.error("Có lỗi xảy ra khi xóa vai trò");
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
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý vai trò</h1>
        <div className="flex gap-2">
          {selectedRoles.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => handleDeleteMultipleRoles(selectedRoles)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Xóa {selectedRoles.length} vai trò
            </Button>
          )}
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm vai trò
          </Button>
        </div>
      </div>

      <DataTableRole
        data={roles}
        onDelete={handleDeleteRole}
        onEditRole={handleEditRole}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
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
