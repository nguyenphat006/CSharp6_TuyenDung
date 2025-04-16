"use client";

import { Application } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Mail, Building2, Briefcase, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface ApplicationSidebarProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationSidebar({
  application,
  isOpen,
  onClose,
}: ApplicationSidebarProps) {
  if (!application) return null;

  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async (newStatus: Application["status"]) => {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://localhost:7152/api/Resume/${application.id}/change-status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Cập nhật trạng thái thành công");
      onClose();
    },
    onError: (error) => {
      console.error("Failed to change status:", error);
      toast.error("Cập nhật trạng thái thất bại");
    },
  });

  const handleStatusChange = async (newStatus: Application["status"]) => {
    updateStatus(newStatus);
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "N/A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl font-bold">Chi tiết đơn xin việc</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Thông tin ứng viên */}
          <Card className="border-none shadow-none">
            <CardHeader className="flex flex-row items-center space-x-4 p-0">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${application.user?.name || "N/A"}&background=random`} />
                <AvatarFallback className="bg-primary/10 text-primary">{getInitials(application.user?.name)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">{application.user?.name || "N/A"}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{application.email}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Thông tin công việc */}
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center text-lg font-semibold">
                <Briefcase className="mr-2 h-5 w-5 text-primary" />
                Thông tin công việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0 mt-4">
              <div className="flex items-start space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Công ty</p>
                  <p className="text-sm text-muted-foreground">{application.company?.name || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Công việc</p>
                  <p className="text-sm text-muted-foreground">{application.job?.name || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trạng thái */}
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center text-lg font-semibold">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Trạng thái
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <Badge 
                variant={application.status === "PENDING" ? "secondary" : application.status === "APPROVED" ? "success" : "destructive"}
                className="text-sm px-3 py-1"
              >
                {application.status === "PENDING" ? "Đang chờ" : application.status === "APPROVED" ? "Đã duyệt" : "Từ chối"}
              </Badge>
            </CardContent>
          </Card>

          {/* Thời gian */}
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center text-lg font-semibold">
                <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                Thời gian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0 mt-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ngày tạo</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(application.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                  </p>
                </div>
              </div>
              {application.updatedAt && (
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Ngày cập nhật</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(application.updatedAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* File CV */}
          {application.fileUrl && (
            <Card className="border-none shadow-none">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center text-lg font-semibold">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  File CV
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary/5" 
                  asChild
                >
                  <a 
                    href={`https://localhost:7152${application.fileUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Xem CV
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <SheetFooter className="border-t pt-6">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => handleStatusChange("REJECTED")}
                className="flex-1 hover:bg-destructive/5 hover:text-destructive hover:border-destructive"
                disabled={isPending || application.status === "REJECTED"}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Từ chối
              </Button>
              <Button
                onClick={() => handleStatusChange("APPROVED")}
                className="flex-1"
                disabled={isPending || application.status === "APPROVED"}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Duyệt
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
} 