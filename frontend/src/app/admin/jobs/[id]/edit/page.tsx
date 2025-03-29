"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Job } from "../../ui/DataTableJobs";
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

// Mock function to fetch job data
const fetchJob = async (id: string): Promise<Job> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: "Lập trình viên Frontend",
        company: "Công ty A",
        location: "Hà Nội",
        type: "full-time",
        status: "active",
        salary: {
          min: 10000000,
          max: 20000000,
          currency: "VND",
        },
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        applications: 12,
      });
    }, 1000);
  });
};

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "full-time" as Job["type"],
    status: "active" as Job["status"],
    salary: {
      min: 0,
      max: 0,
      currency: "VND",
    },
    deadline: "",
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const jobData = await fetchJob(params.id as string);
        setJob(jobData);
        setFormData({
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
          type: jobData.type,
          status: jobData.status,
          salary: jobData.salary,
          deadline: jobData.deadline.toISOString().split("T")[0],
        });
      } catch (err) {
        setError("Không thể tải thông tin việc làm");
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call
      console.log("Updating job:", params.id, formData);
      router.push("/admin/jobs");
    } catch (err) {
      setError("Có lỗi xảy ra khi cập nhật thông tin việc làm");
    }
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!job) {
    return <div>Không tìm thấy việc làm</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chỉnh sửa thông tin việc làm</h1>
        <Button variant="outline" onClick={() => router.push("/admin/jobs")}>
          Quay lại
        </Button>
      </div>

      <Dialog open={true} onOpenChange={() => router.push("/admin/jobs")}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin việc làm</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
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
              <Label htmlFor="location">Địa điểm</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Loại hình</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Job["type"]) =>
                  setFormData({ ...formData, type: value })
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

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Job["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Nháp</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="active">Đang tuyển</SelectItem>
                  <SelectItem value="expired">Hết hạn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary-min">Lương tối thiểu</Label>
                <Input
                  id="salary-min"
                  type="number"
                  value={formData.salary.min}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: {
                        ...formData.salary,
                        min: Number(e.target.value),
                      },
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary-max">Lương tối đa</Label>
                <Input
                  id="salary-max"
                  type="number"
                  value={formData.salary.max}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: {
                        ...formData.salary,
                        max: Number(e.target.value),
                      },
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Hạn nộp</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/jobs")}
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