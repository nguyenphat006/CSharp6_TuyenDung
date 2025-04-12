'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Upload, X, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ApplyJobFormProps {
  jobId: string;
  jobName: string;
  companyName: string;
  onClose: () => void;
}

export function ApplyJobForm({ jobId, jobName, companyName, onClose }: ApplyJobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null,
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, resume: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.resume) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Tạo FormData để gửi file
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', jobId);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('coverLetter', formData.coverLetter);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      // Gửi request
      const response = await fetch('https://localhost:7152/api/applications', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!data.result) {
        throw new Error(data.message || 'Có lỗi xảy ra khi gửi đơn ứng tuyển');
      }

      toast.success('Gửi đơn ứng tuyển thành công!');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra khi gửi đơn ứng tuyển');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="bg-gradient-to-r from-[rgb(84,21,28)] to-[rgb(18,18,18)] text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Ứng tuyển công việc</CardTitle>
            <CardDescription className="text-red-100 mt-1">
              {jobName} tại {companyName}
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-red-700/50" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">Họ và tên</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email của bạn"
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 font-medium">Số điện thoại</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại của bạn"
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="text-gray-700 font-medium">Thư xin việc</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Giới thiệu ngắn gọn về bản thân và lý do bạn muốn ứng tuyển vị trí này"
              rows={5}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume" className="text-gray-700 font-medium">CV/Resume</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-red-400 transition-colors">
              <div className="space-y-1 text-center">
                {fileName ? (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">{fileName}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="resume"
                        className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-700 focus-within:outline-none"
                      >
                        <span>Tải lên file</span>
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          required
                        />
                      </label>
                      <p className="pl-1">hoặc kéo thả</p>
                    </div>
                  </>
                )}
                <p className="text-xs text-gray-500">Chấp nhận file PDF, DOC, DOCX (Tối đa 5MB)</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-gray-300 hover:bg-gray-100"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                'Gửi đơn ứng tuyển'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 