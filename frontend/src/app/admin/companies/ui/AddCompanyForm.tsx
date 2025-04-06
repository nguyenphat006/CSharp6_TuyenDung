"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Company } from "@/types/company";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddCompanyFormProps {
  initialData?: Company;
  onSubmit: (data: Partial<Company>) => Promise<void>;
  onCancel: () => void;
}

const emptyCompany: Partial<Company> = {
  name: "",
  companyModel: "",
  industry: "",
  companySize: "",
  address: "",
  description: "",
  workingTime: "",
  isActive: true,
  logo: "",
};

// Dữ liệu cho các select
const companyModels = [
  "Sản phẩm",
  "Outsourcing",
  "Hybrid",
  "Consulting",
  "Agency",
];

const industries = [
  "Công nghệ thông tin",
  "Tài chính - Ngân hàng",
  "Thương mại điện tử",
  "Giáo dục",
  "Y tế",
  "Bảo hiểm",
  "Khác",
];

const companySizes = [
  "1-50 nhân viên",
  "51-150 nhân viên",
  "151-300 nhân viên",
  "301-500 nhân viên",
  "501-1000 nhân viên",
  "1000+ nhân viên",
];

export function AddCompanyForm({ initialData, onSubmit, onCancel }: AddCompanyFormProps) {
  const [formData, setFormData] = useState<Partial<Company>>(initialData || emptyCompany);
  const [previewLogo, setPreviewLogo] = useState<string>(initialData?.logo || "");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Tạo URL preview cho logo
      const previewUrl = URL.createObjectURL(file);
      setPreviewLogo(previewUrl);

      // Đọc file như base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name?.trim()) {
      alert("Vui lòng nhập tên công ty");
      return;
    }

    if (!formData.companyModel?.trim()) {
      alert("Vui lòng chọn mô hình công ty");
      return;
    }

    if (!formData.industry?.trim()) {
      alert("Vui lòng chọn lĩnh vực công ty");
      return;
    }

    if (!formData.companySize?.trim()) {
      alert("Vui lòng chọn quy mô công ty");
      return;
    }

    if (!formData.address?.trim()) {
      alert("Vui lòng nhập địa chỉ");
      return;
    }

    if (!formData.workingTime?.trim()) {
      alert("Vui lòng nhập thời gian làm việc");
      return;
    }

    if (formData.description && formData.description.length < 50) {
      alert("Mô tả công ty phải có ít nhất 50 ký tự");
      return;
    }

    try {
      await onSubmit(formData);
      setFormData(emptyCompany);
      setPreviewLogo("");
    } catch (error) {
      // Lỗi sẽ được xử lý ở component cha
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Logo upload */}
      <div className="space-y-4">
        <Label>Logo công ty</Label>
        <div className="flex items-center gap-4">
          <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
            {previewLogo ? (
              <Image
                src={previewLogo}
                alt="Company logo preview"
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="max-w-[250px]"
            />
            <p className="text-sm text-gray-500 mt-1">
              Chọn ảnh logo công ty (PNG, JPG)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái */}
        <div className="space-y-4">
          {/* Tên công ty */}
          <div>
            <Label htmlFor="name">Tên công ty</Label>
            <Input
              id="name"
              placeholder="Nhập tên công ty..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={255}
              required
            />
          </div>

          {/* Mô hình công ty */}
          <div>
            <Label htmlFor="companyModel">Mô hình công ty</Label>
            <Select
              value={formData.companyModel}
              onValueChange={(value) =>
                setFormData({ ...formData, companyModel: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn mô hình công ty" />
              </SelectTrigger>
              <SelectContent>
                {companyModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lĩnh vực */}
          <div>
            <Label htmlFor="industry">Lĩnh vực</Label>
            <Select
              value={formData.industry}
              onValueChange={(value) =>
                setFormData({ ...formData, industry: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn lĩnh vực công ty" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-4">
          {/* Quy mô */}
          <div>
            <Label htmlFor="companySize">Quy mô công ty</Label>
            <Select
              value={formData.companySize}
              onValueChange={(value) =>
                setFormData({ ...formData, companySize: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn quy mô công ty" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Địa chỉ */}
          <div>
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              placeholder="Nhập địa chỉ..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              maxLength={500}
              required
            />
          </div>

          {/* Thời gian làm việc */}
          <div>
            <Label htmlFor="workingTime">Thời gian làm việc</Label>
            <Input
              id="workingTime"
              placeholder="Ví dụ: Thứ 2 - Thứ 6, 9h - 18h"
              value={formData.workingTime}
              onChange={(e) => setFormData({ ...formData, workingTime: e.target.value })}
              maxLength={100}
              required
            />
          </div>

          {/* Trạng thái */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Đang hoạt động</Label>
          </div>
        </div>
      </div>

      {/* Mô tả */}
      <div className="space-y-2">
        <Label>Mô tả công ty</Label>
        <RichTextEditor
          value={formData.description || ""}
          onChange={(value: string) => setFormData({ ...formData, description: value })}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">
          Thêm công ty
        </Button>
      </div>
    </form>
  );
} 