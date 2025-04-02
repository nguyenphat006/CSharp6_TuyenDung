"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Role {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

interface DeleteRoleDialogProps {
  role: Role | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteRole: (roleId: number) => Promise<void>;
}

export function DeleteRoleDialog({ role, open, onOpenChange, onDeleteRole }: DeleteRoleDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!role) return;
    
    setLoading(true);
    try {
      await onDeleteRole(role.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting role:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận xóa vai trò</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa vai trò "{role?.name}"? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Đang xóa..." : "Xóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 