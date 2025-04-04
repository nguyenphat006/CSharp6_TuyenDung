"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pencil, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/RichTextEditor";

const levels = [
  { value: "intern", label: "Thực tập sinh" },
  { value: "fresher", label: "Fresher" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Middle" },
  { value: "senior", label: "Senior" },
];

const locations = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Nha Trang",
  "Bình Dương",
  "Đồng Nai",
];

const skills = [
  "ReactJS",
  "TypeScript",
  "JavaScript",
  "HTML/CSS",
  "NodeJS",
  "C#",
  ".NET",
  "Java",
  "Python",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Agile",
  "English",
];

// Dữ liệu mẫu cho việc làm
const sampleJob = {
  id: "1",
  title: "Senior Frontend Developer",
  skills: ["ReactJS", "TypeScript", "JavaScript"],
  location: "Hồ Chí Minh",
  salary: {
    min: "25000000",
    max: "45000000",
    currency: "VND",
  },
  headcount: "2",
  level: "senior",
  company: "Tech Company",
  startDate: "2024-03-20",
  endDate: "2024-04-20",
  isActive: true,
  description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm làm việc với ReactJS và TypeScript. Ứng viên sẽ tham gia vào các dự án lớn và có cơ hội làm việc với các công nghệ mới nhất.",
};

interface EditJobFormProps {
  jobId: string;
  onSubmit: (data: any) => void;
}

export function EditJobForm({ jobId, onSubmit }: EditJobFormProps) {
  const [open, setOpen] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState(sampleJob);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setLoading(true);
      setError("");
      
      // Giả lập API call
      setTimeout(() => {
        if (jobId === sampleJob.id) {
          setFormData(sampleJob);
          setLoading(false);
        } else {
          setError("Không tìm thấy việc làm");
          setLoading(false);
        }
      }, 1000);
    }
  }, [open, jobId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tên công việc");
      return;
    }

    if (formData.skills.length === 0) {
      alert("Vui lòng chọn ít nhất một kỹ năng");
      return;
    }

    if (Number(formData.salary.min) < 1000000) {
      alert("Mức lương tối thiểu phải từ 1,000,000 VND");
      return;
    }

    if (Number(formData.salary.max) <= Number(formData.salary.min)) {
      alert("Mức lương tối đa phải lớn hơn mức lương tối thiểu");
      return;
    }

    if (Number(formData.headcount) < 1) {
      alert("Số lượng tuyển dụng phải từ 1 trở lên");
      return;
    }

    if (!formData.location) {
      alert("Vui lòng chọn địa điểm làm việc");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      alert("Vui lòng chọn thời gian tuyển dụng");
      return;
    }

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }

    if (formData.description.length < 50) {
      alert("Mô tả công việc phải có ít nhất 50 ký tự");
      return;
    }

    // Log dữ liệu mẫu
    console.log("Form data:", {
      ...formData,
      salary: {
        min: Number(formData.salary.min),
        max: Number(formData.salary.max),
        currency: formData.salary.currency,
      },
      headcount: Number(formData.headcount),
    });

    onSubmit({
      ...formData,
      salary: {
        min: Number(formData.salary.min),
        max: Number(formData.salary.max),
        currency: formData.salary.currency,
      },
      headcount: Number(formData.headcount),
    });

    setOpen(false);
  };

  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa việc làm</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8 text-red-500">
            {error}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột trái */}
              <div className="space-y-4">
                {/* Tên công việc */}
                <div>
                  <Label htmlFor="title">Tên công việc</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tên công việc..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    maxLength={100}
                    required
                  />
                </div>

                {/* Kỹ năng */}
                <div>
                  <Label>Kỹ năng yêu cầu</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Select 
                      value={skillInput}
                      onValueChange={setSkillInput}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kỹ năng..." />
                      </SelectTrigger>
                      <SelectContent>
                        {skills.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={handleAddSkill}>
                      Thêm
                    </Button>
                  </div>
                </div>

                {/* Mức lương */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salaryMin">Lương tối thiểu</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      min={1000000}
                      placeholder="VD: 1000000"
                      value={formData.salary.min}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: { ...formData.salary, min: e.target.value }
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
                      min={1000000}
                      placeholder="VD: 2000000"
                      value={formData.salary.max}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: { ...formData.salary, max: e.target.value }
                        })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Số lượng */}
                <div>
                  <Label htmlFor="headcount">Số lượng tuyển dụng</Label>
                  <Input
                    id="headcount"
                    type="number"
                    min={1}
                    placeholder="VD: 1"
                    value={formData.headcount}
                    onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                    required
                  />
                </div>

                {/* Trình độ */}
                <div>
                  <Label htmlFor="level">Trình độ</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Cột phải */}
              <div className="space-y-4">
                {/* Địa điểm */}
                <div>
                  <Label htmlFor="location">Địa điểm làm việc</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn địa điểm..." />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Thời gian */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Ngày bắt đầu</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Ngày kết thúc</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Trạng thái */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="isActive">Đang tuyển dụng</Label>
                </div>

                {/* Mô tả */}
                <div className="space-y-2">
                  <Label>Mô tả công việc</Label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value: string) => setFormData({ ...formData, description: value })}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">
                Lưu thay đổi
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
} 