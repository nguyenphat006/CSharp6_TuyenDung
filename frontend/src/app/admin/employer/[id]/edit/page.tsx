"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Employer } from "../../ui/DataTableEmployer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock function to fetch employer data
const fetchEmployer = async (id: string): Promise<Employer> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "Nguyễn Văn A",
        email: "a@company.com",
        phone: "0123456789",
        company: "Công ty A",
        position: "HR Manager",
        status: "active",
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        jobsPosted: 12,
        avatar: "https://github.com/shadcn.png",
      });
    }, 1000);
  });
};

export default function EditEmployerPage() {
  const params = useParams();
  const router = useRouter();
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    status: "active" as Employer["status"],
    avatar: "",
  });

  useEffect(() => {
    const loadEmployer = async () => {
      try {
        const employerData = await fetchEmployer(params.id as string);
        setEmployer(employerData);
        setFormData({
          name: employerData.name,
          email: employerData.email,
          phone: employerData.phone,
          company: employerData.company,
          position: employerData.position,
          status: employerData.status,
          avatar: employerData.avatar || "",
        });
      } catch (err) {
        setError("Không thể tải thông tin nhà tuyển dụng");
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployer();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call
      console.log("Updating employer:", params.id, formData);
      router.push("/admin/employer");
    } catch (err) {
      setError("Có lỗi xảy ra khi cập nhật thông tin nhà tuyển dụng");
    }
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!employer) {
    return <div>Không tìm thấy nhà tuyển dụng</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chỉnh sửa thông tin nhà tuyển dụng</h1>
        <Button variant="outline" onClick={() => router.push("/admin/employer")}>
          Quay lại
        </Button>
      </div>

      <Dialog open={true} onOpenChange={() => router.push("/admin/employer")}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin nhà tuyển dụng</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Công ty</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Vị trí</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Employer["status"]) =>
                  setFormData({ ...formData, status: value })
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

            <div className="space-y-2">
              <Label htmlFor="avatar">URL ảnh đại diện</Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/employer")}
              >
                Hủy
              </Button>
              <Button type="submit">Cập nhật</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 