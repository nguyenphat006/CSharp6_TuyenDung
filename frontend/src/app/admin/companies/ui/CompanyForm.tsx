"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "@/components/RichTextEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên công ty"),
  companyModel: z.string().min(1, "Vui lòng chọn mô hình công ty"),
  industry: z.string().min(1, "Vui lòng nhập lĩnh vực"),
  companySize: z.string().min(1, "Vui lòng chọn quy mô công ty"),
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  description: z.string().min(1, "Vui lòng nhập mô tả"),
  workingTime: z.string().min(1, "Vui lòng nhập thời gian làm việc"),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const companyModels = ["Onsite", "Remote", "Hybrid"];
const companySizes = ["1-50", "51-150", "151-300", "301-500", "500+"];
const industries = [
  "Công nghệ thông tin",
  "Phát triển phần mềm",
  "Dịch vụ CNTT",
  "Thương mại điện tử",
  "An ninh mạng",
  "Điện toán đám mây (Cloud Computing)",
  "Trí tuệ nhân tạo (AI)",
  "Học máy (Machine Learning)",
  "Blockchain",
  "Phân tích dữ liệu (Data Analytics)",
  "Internet vạn vật (IoT)",
  "Phát triển trò chơi (Game Development)",
  "Thiết kế giao diện người dùng (UI/UX)",
  "Quản trị hệ thống và mạng",
  "Khoa học máy tính ứng dụng"
];


interface CompanyFormProps {
  companyId?: string;
  onSubmit: (data: FormValues, logoFile: File | null) => Promise<void>;
  defaultValues?: Partial<FormValues>;
  isEdit?: boolean;
  defaultLogoUrl?: string;
}

export function CompanyForm({ 
  companyId, 
  onSubmit,
  defaultValues,
  isEdit = false,
  defaultLogoUrl
}: CompanyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultLogoUrl);
  const [showDescription, setShowDescription] = useState(false);

  const handleLogoSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Kiểm tra kích thước file (giới hạn 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Kích thước file không được vượt quá 2MB");
      return;
    }

    // Kiểm tra định dạng file
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc GIF");
      return;
    }

    // Tạo preview URL và cleanup URL cũ nếu là blob
    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setLogoFile(file);
  };

  // Cleanup blob URL khi component unmount
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Cập nhật previewUrl khi defaultLogoUrl thay đổi
  useEffect(() => {
    if (defaultLogoUrl) {
      setPreviewUrl(defaultLogoUrl);
    }
  }, [defaultLogoUrl]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: true,
      ...defaultValues,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      await onSubmit(values, logoFile);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLogoUrl = (logo: string | null): string => {
    if (!logo) return "/img/company/default.jpg";
    if (logo.startsWith('http')) return logo;
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7152'}${logo}`;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-6 p-6 bg-card rounded-lg border">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {isEdit ? "Chỉnh sửa công ty" : "Thêm công ty mới"}
            </h2>
            <p className="text-muted-foreground">
              {isEdit ? "Cập nhật thông tin công ty" : "Điền thông tin công ty vào form bên dưới"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Logo công ty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    {previewUrl ? (
                      <img
                        src={getLogoUrl(previewUrl)}
                        alt="Preview logo"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/img/company/default.jpg";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <p className="text-sm text-muted-foreground">Chưa có logo</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={loading}
                      onClick={() => document.getElementById("logo-upload")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isEdit ? "Thay đổi logo" : "Chọn logo"}
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,image/gif"
                      onChange={handleLogoSelect}
                      disabled={loading}
                      aria-label="Upload company logo"
                    />
                    <p className="text-sm text-muted-foreground">
                      Chấp nhận file: JPG, PNG, GIF. Tối đa 2MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên công ty</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên công ty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô hình làm việc</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mô hình làm việc" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companyModels.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lĩnh vực</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn lĩnh vực" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quy mô công ty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn quy mô công ty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size} nhân viên
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa chỉ công ty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian làm việc</FormLabel>
                      <FormControl>
                        <Input placeholder="VD: 8:00 - 17:00, Thứ 2 - Thứ 6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mô tả công ty</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDescription(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Xem mô tả
                </Button>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Nhập mô tả về công ty..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Trạng thái hoạt động</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Công ty có đang hoạt động hay không
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </div>
      </form>

      <Dialog open={showDescription} onOpenChange={setShowDescription}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mô tả công ty</DialogTitle>
          </DialogHeader>
          <div 
            className="prose prose-stone dark:prose-invert max-w-none [&>ul]:list-disc [&>ul]:pl-10 [&>ol]:list-decimal [&>ol]:pl-10 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_li]:pl-2 [&_ul]:my-2 [&_ol]:my-2"
            dangerouslySetInnerHTML={{ __html: form.getValues("description") || "" }}
          />
        </DialogContent>
      </Dialog>
    </Form>
  );
} 