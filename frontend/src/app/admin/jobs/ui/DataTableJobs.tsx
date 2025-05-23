'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash, Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Job } from "@/services/jobService"
import { Checkbox } from "@/components/ui/checkbox"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface DataTableJobsProps {
  data: Job[]
  onUpdateJob: (jobId: string, updatedJob: Partial<Job>) => Promise<void>
  onDeleteJob: (jobId: string) => Promise<void>
  onSelectJob: (jobId: string) => void
  selectedJobs: string[]
  pagination: PaginationProps
}

export function DataTableJobs({ data, onUpdateJob, onDeleteJob, onSelectJob, selectedJobs, pagination }: DataTableJobsProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null)

  const handleDelete = (job: Job) => {
    setJobToDelete(job)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (jobToDelete) {
      await onDeleteJob(jobToDelete.id)
      setDeleteDialogOpen(false)
      setJobToDelete(null)
    }
  }

  const handleEdit = (jobId: string) => {
    router.push(`/admin/jobs/${jobId}/edit`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'closed':
        return 'bg-red-500'
      case 'draft':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang tuyển'
      case 'closed':
        return 'Đã đóng'
      case 'draft':
        return 'Nháp'
      default:
        return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'Toàn thời gian'
      case 'part-time':
        return 'Bán thời gian'
      case 'contract':
        return 'Hợp đồng'
      case 'internship':
        return 'Thực tập'
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("vi-VN").format(new Date(dateString));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const levelLabels: Record<string, string> = {
    intern: "Thực tập sinh",
    fresher: "Fresher",
    junior: "Junior",
    mid: "Middle",
    senior: "Senior",
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    data.length > 0 && selectedJobs.length === data.length
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      data.forEach((job) => onSelectJob(job.id));
                    } else {
                      data.forEach((job) => onSelectJob(job.id));
                    }
                  }}
                />
              </TableHead>
              <TableHead>Tên công việc</TableHead>
              <TableHead>Công ty</TableHead>
              <TableHead>Kỹ năng</TableHead>
              <TableHead>Địa điểm</TableHead>
              <TableHead>Mức lương</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Trình độ</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => onSelectJob(job.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{job.name}</TableCell>
                <TableCell>{job.companyName || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {job.skillsList.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  {formatCurrency(job.salary)}
                </TableCell>
                <TableCell>{job.quantity}</TableCell>
                <TableCell>{levelLabels[job.level] || job.level}</TableCell>
                <TableCell>
                  {formatDate(job.startDate)} - {formatDate(job.endDate)}
                </TableCell>
                <TableCell>
                  <Badge variant={job.isActive ? "default" : "secondary"}>
                    {job.isActive ? "Đang tuyển" : "Đã đóng"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/jobs/${job.id}/edit`} className="flex items-center">
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Chỉnh sửa</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDeleteJob(job.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Xóa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Phân trang */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Số dòng mỗi trang:</span>
          <Select 
            value={pagination.pageSize.toString()} 
            onValueChange={(value) => pagination.onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Trước
          </Button>
          <span>
            Trang {pagination.currentPage} / {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Sau
          </Button>
        </div>
      </div>

      {/* Dialog xác nhận xóa */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa công việc này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 