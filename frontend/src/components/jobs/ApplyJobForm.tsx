'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Upload, X, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';

interface ApplyJobFormProps {
  jobId: string;
  jobName: string;
  companyName: string;
  onClose: () => void;
}

export function ApplyJobForm({ jobId, jobName, companyName, onClose }: ApplyJobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`https://localhost:7152/api/Job/${jobId}`, {
          headers: getHeaders()
        });
        const data = await response.json();
        if (data.result && data.data) {
          setCompanyId(data.data.companyId);
        }
      } catch (error) {
        console.error('Error fetching job detail:', error);
        toast.error('Không thể lấy thông tin công việc');
      }
    };

    fetchJobDetail();
  }, [jobId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra file và companyId
    if (!resume) {
      toast.error('Vui lòng tải lên CV của bạn');
      return;
    }

    if (!companyId) {
      toast.error('Không thể lấy thông tin công ty');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Tạo FormData để gửi file
      const formDataToSend = new FormData();
      formDataToSend.append('CompanyId', companyId.toUpperCase());
      formDataToSend.append('JobId', jobId.toUpperCase());
      formDataToSend.append('File', resume, resume.name);

      // Log FormData để debug
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      // Gửi request
      const response = await fetch('https://localhost:7152/api/Resume', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend,
      });

      // Log response để debug
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // Log response để debug

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