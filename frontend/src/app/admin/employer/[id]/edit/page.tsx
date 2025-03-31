"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Employer {
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
  avatar: string;
}

export default function EditEmployerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [employer, setEmployer] = useState<Employer | null>(null);

  useEffect(() => {
    // TODO: Thay thế bằng API call thực tế
    const fetchEmployer = async () => {
      try {
        // Giả lập API call
        const mockEmployer: Employer = {
          id: params.id,
          name: "Nguyễn Văn A",
          email: "example@email.com",
          phone: "0123456789",
          company: "Công ty ABC",
          position: "Giám đốc",
          status: "active",
          createdAt: new Date(),
          lastLogin: new Date(),
          jobsPosted: 5,
          avatar: "https://github.com/shadcn.png"
        };
        setEmployer(mockEmployer);
      } catch (error) {
        console.error("Error fetching employer:", error);
        toast.error("Không thể tải thông tin nhà tuyển dụng");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employer) return;

    setSaving(true);
    try {
      // TODO: Thay thế bằng API call thực tế
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Cập nhật thông tin thành công");
      router.push("/admin/employer");
    } catch (error) {
      console.error("Error updating employer:", error);
      toast.error("Không thể cập nhật thông tin");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!employer) {
    return <div>Không tìm thấy nhà tuyển dụng</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Chỉnh sửa thông tin nhà tuyển dụng</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={employer.avatar} />
                <AvatarFallback>{employer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar">Ảnh đại diện</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    // TODO: Xử lý upload ảnh
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Họ tên</Label>
                <Input
                  id="name"
                  value={employer.name}
                  onChange={(e) => setEmployer({ ...employer, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={employer.email}
                  onChange={(e) => setEmployer({ ...employer, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={employer.phone}
                  onChange={(e) => setEmployer({ ...employer, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="company">Công ty</Label>
                <Input
                  id="company"
                  value={employer.company}
                  onChange={(e) => setEmployer({ ...employer, company: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="position">Chức vụ</Label>
                <Input
                  id="position"
                  value={employer.position}
                  onChange={(e) => setEmployer({ ...employer, position: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={employer.status}
                  onValueChange={(value: "active" | "pending" | "blocked") =>
                    setEmployer({ ...employer, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="pending">Chờ xác minh</SelectItem>
                    <SelectItem value="blocked">Bị khóa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/employer")}
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