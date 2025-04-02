"use client";

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Role } from '@/services/roleService'

interface DataTableRoleProps {
  roles: Role[]
  onDeleteRole: (id: string) => void
  onEditRole: (role: Role) => void
}

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

export function DataTableRole({ roles, onDeleteRole, onEditRole }: DataTableRoleProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null)

  const totalPages = Math.ceil(roles.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentData = roles.slice(startIndex, endIndex)

  const handleDelete = (id: string) => {
    setRoleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (roleToDelete) {
      onDeleteRole(roleToDelete)
      setDeleteDialogOpen(false)
      setRoleToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Người tạo</TableHead>
              <TableHead>Thời gian tạo</TableHead>
              <TableHead className="w-[100px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((role, index) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <Badge className={role.isActive ? 'bg-green-500' : 'bg-red-500'}>
                    {role.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </Badge>
                </TableCell>
                <TableCell>{role.createdBy || 'N/A'}</TableCell>
                <TableCell>
                  {formatDate(role.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditRole(role)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(role.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
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
          <Select value={rowsPerPage.toString()} onValueChange={(value) => {
            setRowsPerPage(Number(value))
            setCurrentPage(1)
          }}>
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </Button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Sau
          </Button>
        </div>
      </div>

      {/* Dialog xác nhận xóa */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa vai trò này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 