"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { Switch } from "@/components/ui/switch";

interface NewRole {
  name: string;
  isActive: boolean;
}

export default function AddRolePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [role, setRole] = useState<NewRole>({
    name: "",
    isActive: true,
  });
  useSetPageTitle();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.name) {
      toast.error("Vui lòng nhập tên vai trò");
      return;
    }

    setSaving(true);
    try {
      // TODO: Thay thế bằng API call thực tế
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Thêm vai trò thành công");
      router.push("/admin/roles");
    } catch (error) {
      console.error("Error creating role:", error);
      toast.error("Không thể thêm vai trò");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Thêm vai trò mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Tên vai trò</Label>
                <Input
                  id="name"
                  value={role.name}
                  onChange={(e) => setRole({ ...role, name: e.target.value })}
                  placeholder="Nhập tên vai trò"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={role.isActive}
                  onCheckedChange={(checked) => setRole({ ...role, isActive: checked })}
                />
                <Label htmlFor="isActive">Trạng thái hoạt động</Label>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/roles")}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Đang lưu..." : "Thêm mới"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 