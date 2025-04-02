"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSetPageTitle } from "@/lib/hooks/useSetPageTitle";
import { Switch } from "@/components/ui/switch";

interface Role {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
}

export default function EditRolePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  useSetPageTitle();

  useEffect(() => {
    // TODO: Thay thế bằng API call thực tế
    const fetchRole = async () => {
      try {
        // Giả lập API call
        const mockRole: Role = {
          id: params.id,
          name: "Quản trị viên",
          createdBy: "Admin",
          createdAt: new Date(),
          isActive: true,
        };
        setRole(mockRole);
      } catch (error) {
        console.error("Error fetching role:", error);
        toast.error("Không thể tải thông tin vai trò");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    setSaving(true);
    try {
      // TODO: Thay thế bằng API call thực tế
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Cập nhật thông tin thành công");
      router.push("/admin/roles");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Không thể cập nhật thông tin");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!role) {
    return <div>Không tìm thấy vai trò</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Chỉnh sửa thông tin vai trò</CardTitle>
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
                  required
                />
              </div>

              <div>
                <Label htmlFor="createdBy">Người tạo</Label>
                <Input
                  id="createdBy"
                  value={role.createdBy}
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="createdAt">Ngày tạo</Label>
                <Input
                  id="createdAt"
                  value={role.createdAt.toLocaleDateString()}
                  disabled
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
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 