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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  status: "active" | "closed" | "draft";
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  deadline: Date;
  createdAt: Date;
  applications: number;
}

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    // TODO: Thay thế bằng API call thực tế
    const fetchJob = async () => {
      try {
        // Giả lập API call
        const mockJob: Job = {
          id: params.id,
          title: "Lập trình viên Frontend",
          company: "Công ty ABC",
          location: "Hà Nội",
          type: "full-time",
          status: "active",
          salary: {
            min: 10000000,
            max: 20000000,
            currency: "VND"
          },
          deadline: new Date("2024-12-31"),
          createdAt: new Date(),
          applications: 5
        };
        setJob(mockJob);
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Không thể tải thông tin việc làm");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setSaving(true);
    try {
      // TODO: Thay thế bằng API call thực tế
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Cập nhật thông tin thành công");
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Không thể cập nhật thông tin");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!job) {
    return <div>Không tìm thấy việc làm</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Chỉnh sửa thông tin việc làm</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  value={job.title}
                  onChange={(e) => setJob({ ...job, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="company">Công ty</Label>
                <Input
                  id="company"
                  value={job.company}
                  onChange={(e) => setJob({ ...job, company: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Địa điểm</Label>
                <Input
                  id="location"
                  value={job.location}
                  onChange={(e) => setJob({ ...job, location: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Loại hình</Label>
                <Select
                  value={job.type}
                  onValueChange={(value: 'full-time' | 'part-time' | 'contract' | 'internship') =>
                    setJob({ ...job, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Toàn thời gian</SelectItem>
                    <SelectItem value="part-time">Bán thời gian</SelectItem>
                    <SelectItem value="contract">Hợp đồng</SelectItem>
                    <SelectItem value="internship">Thực tập</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={job.status}
                  onValueChange={(value: 'active' | 'closed' | 'draft') =>
                    setJob({ ...job, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang tuyển</SelectItem>
                    <SelectItem value="closed">Đã đóng</SelectItem>
                    <SelectItem value="draft">Nháp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deadline">Hạn nộp</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={job.deadline.toISOString().split('T')[0]}
                  onChange={(e) => setJob({ ...job, deadline: new Date(e.target.value) })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="salaryMin">Lương tối thiểu</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  value={job.salary.min}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      salary: { ...job.salary, min: Number(e.target.value) }
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="salaryMax">Lương tối đa</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  value={job.salary.max}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      salary: { ...job.salary, max: Number(e.target.value) }
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/jobs')}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 