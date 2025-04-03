"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { DataTableRole } from "./ui/DataTableRole";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { AddRoleForm } from "./ui/AddRoleForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { EditRoleForm } from "./ui/EditRoleForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { 
  fetchRoles, 
  addRole, 
  updateRole, 
  deleteRoles,
  setSelectedRoles 
} from "@/redux/features/roleSlice";
import { Role } from "@/types/role";
import { RootState } from "@/redux/store";

export default function RolesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { roles, loading, selectedRoles } = useAppSelector((state: RootState) => state.roles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  useSetPageTitle();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleAddRole = async (data: { name: string; isActive: boolean }) => {
    try {
      await dispatch(addRole(data)).unwrap();
      toast.success("Thêm vai trò thành công");
      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi thêm vai trò");
      throw error;
    }
  };

  const handleUpdateRole = async (data: { name: string; isActive: boolean; id: string }) => {
    try {
      console.log('Updating role with data:', data);
      const result = await dispatch(updateRole(data)).unwrap();
      console.log('Update result:', result);
      
      toast.success("Cập nhật vai trò thành công");
      setIsEditDialogOpen(false);
      setSelectedRole(null);
      
      // Refresh the roles list
      dispatch(fetchRoles());
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật vai trò");
      throw error;
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      await dispatch(deleteRoles([id])).unwrap();
      toast.success("Xóa vai trò thành công");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xóa vai trò");
    }
  };

  const handleDeleteMultipleRoles = async (roleIds: string[]) => {
    try {
      const result = await dispatch(deleteRoles(roleIds)).unwrap();
      toast.success(`Đã xóa ${result.result.deletedCount}/${result.result.totalRequested} vai trò`);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xóa vai trò");
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditDialogOpen(true);
  };

  if (loading) {
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
        setSelectedRoles={(roles) => dispatch(setSelectedRoles(roles))}
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
