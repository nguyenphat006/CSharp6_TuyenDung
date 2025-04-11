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
      const response = await axios.put(
        `https://localhost:7152/api/Resume/${application.id}/change-status`,
        { status: newStatus }
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
      <SheetContent className="w-[500px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Chi tiết đơn xin việc</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Thông tin ứng viên */}
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${application.user?.name || "N/A"}&background=random`} />
                <AvatarFallback>{getInitials(application.user?.name)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{application.user?.name || "N/A"}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  {application.email}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Thông tin công việc */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Thông tin công việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Công ty</p>
                  <p className="text-sm text-muted-foreground">{application.company?.name || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Vị trí</p>
                  <p className="text-sm text-muted-foreground">{application.job?.name || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trạng thái */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Trạng thái
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={application.status === "PENDING" ? "secondary" : application.status === "APPROVED" ? "success" : "destructive"}>
                {application.status === "PENDING" ? "Đang chờ" : application.status === "APPROVED" ? "Đã duyệt" : "Từ chối"}
              </Badge>
            </CardContent>
          </Card>

          {/* Thời gian */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" />
                Thời gian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Ngày tạo</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(application.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                  </p>
                </div>
              </div>
              {application.updatedAt && (
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  File CV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={application.fileUrl} target="_blank" rel="noopener noreferrer">
                    Xem CV
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <SheetFooter>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleStatusChange("REJECTED")}
                className="flex-1"
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