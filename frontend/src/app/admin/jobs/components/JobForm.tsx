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
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Job, CreateJobRequest } from "@/services/jobService";
import { Company, companyService } from "@/services/companyService";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosClient from "@/lib/axiosClient";

const formSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên công việc"),
  level: z.string().min(1, "Vui lòng chọn cấp bậc"),
  location: z.string().min(1, "Vui lòng nhập địa điểm"),
  salary: z.coerce.number().min(0, "Mức lương không được âm"),
  quantity: z.coerce.number().min(1, "Số lượng phải lớn hơn 0"),
  skills: z.array(z.string()),
  description: z.string().min(1, "Vui lòng nhập mô tả công việc"),
  isActive: z.boolean(),
  companyId: z.string().min(1, "Vui lòng chọn công ty"),
  startDate: z.string(),
  endDate: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const jobLevels = ["intern", "fresher", "junior", "mid", "senior"];

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: CreateJobRequest) => Promise<void>;
  onCancel: () => void;
}

export function JobForm({ initialData, onSubmit, onCancel }: JobFormProps) {
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  const fetchCompanies = async () => {
    try {
      const response = await axiosClient.get("/Company");
      if (response.data.result) {
        setCompanies(response.data.data.items);
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra khi tải danh sách công ty");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi tải danh sách công ty");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: initialData?.isActive ?? true,
      companyId: initialData?.companyId ?? '',
      name: initialData?.name ?? '',
      skills: initialData?.skillsList ?? [],
      location: initialData?.location ?? '',
      salary: initialData?.salary ?? 0,
      quantity: initialData?.quantity ?? 0,
      level: initialData?.level ?? '',
      description: initialData?.description ?? '',
      startDate: initialData?.startDate ?? new Date().toISOString(),
      endDate: initialData?.endDate ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      await onSubmit(values as CreateJobRequest);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Có lỗi xảy ra khi lưu công việc");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-6 p-6 bg-card rounded-lg border">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {initialData ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
            </h2>
            <p className="text-muted-foreground">
              {initialData ? "Cập nhật thông tin công việc" : "Điền thông tin công việc vào form bên dưới"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Công ty</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn công ty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companies?.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên công việc</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên công việc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cấp bậc</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn cấp bậc" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level === "intern"
                                ? "Thực tập sinh"
                                : level === "fresher"
                                ? "Fresher"
                                : level === "junior"
                                ? "Junior"
                                : level === "mid"
                                ? "Middle"
                                : "Senior"}
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa điểm</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa điểm làm việc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mức lương</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập mức lương"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập số lượng cần tuyển"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kỹ năng</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value.join(", ")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.split(",").map((s) => s.trim())
                            )
                          }
                          placeholder="Nhập kỹ năng, phân cách bằng dấu phẩy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mô tả công việc</CardTitle>
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
                          placeholder="Nhập mô tả chi tiết về công việc..."
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
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Trạng thái tuyển dụng</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Bật để hiển thị công việc trên trang tuyển dụng
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

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {initialData ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </div>

        <Dialog open={showDescription} onOpenChange={setShowDescription}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Xem mô tả công việc</DialogTitle>
            </DialogHeader>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: form.watch("description") }}
            />
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
} 