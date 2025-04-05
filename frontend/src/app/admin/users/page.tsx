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
import { Download, Plus, Trash2 } from "lucide-react";
import { DataTableUser } from "./ui/DataTableUser";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { AddUserForm } from "./ui/AddUserForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { EditUserForm } from "./ui/EditUserForm";
import { ChangePasswordForm } from "./ui/ChangePasswordForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { 
  fetchUsers, 
  addUser, 
  updateUser, 
  deleteUsers,
  setSelectedUsers,
  changePassword 
} from "@/redux/features/userSlice";
import { User } from "@/types/user";

export default function UsersPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users, loading, selectedUsers } = useAppSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  useSetPageTitle();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = async (data: any) => {
    try {
      await dispatch(addUser(data)).unwrap();
      toast.success("Thêm người dùng thành công");
      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi thêm người dùng");
      throw error;
    }
  };

  const handleUpdateUser = async (data: any) => {
    if (!selectedUser) return;

    try {
      await dispatch(updateUser({ ...data, id: selectedUser.id })).unwrap();
      toast.success("Cập nhật người dùng thành công");
      setIsEditDialogOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật người dùng");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await dispatch(deleteUsers([id])).unwrap();
      toast.success("Xóa người dùng thành công");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xóa người dùng");
    }
  };

  const handleDeleteMultipleUsers = async (userIds: string[]) => {
    try {
      const result = await dispatch(deleteUsers(userIds)).unwrap();
      toast.success(`Đã xóa ${result.result.deletedCount}/${result.result.totalRequested} người dùng`);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xóa người dùng");
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleChangePassword = async (data: { newPassword: string; confirmPassword: string }) => {
    if (!selectedUser) return;

    try {
      const result = await dispatch(changePassword({ 
        id: selectedUser.id, 
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword 
      })).unwrap();

      if (result.result) {
        toast.success(result.message || "Đổi mật khẩu thành công");
        setIsChangePasswordDialogOpen(false);
        setSelectedUser(null);
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi đổi mật khẩu");
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi đổi mật khẩu");
    }
  };

  const handleOpenChangePassword = (user: User) => {
    setSelectedUser(user);
    setIsChangePasswordDialogOpen(true);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <div className="flex gap-2">
          {selectedUsers.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => handleDeleteMultipleUsers(selectedUsers)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Xóa {selectedUsers.length} người dùng
            </Button>
          )}
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      <DataTableUser
        data={users}
        onDelete={handleDeleteUser}
        onEditUser={handleEditUser}
        onChangePassword={handleOpenChangePassword}
        selectedUsers={selectedUsers}
        setSelectedUsers={(users) => dispatch(setSelectedUsers(users))}
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
          </DialogHeader>
          <AddUserForm
            onSubmit={handleAddUser}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <EditUserForm
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu người dùng</DialogTitle>
          </DialogHeader>
          <ChangePasswordForm
            user={selectedUser}
            onSubmit={handleChangePassword}
            onCancel={() => setIsChangePasswordDialogOpen(false)}
            isLoading={loading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
