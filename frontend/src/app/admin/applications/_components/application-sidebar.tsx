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

  const handleStatusChange = async (newStatus: Application["status"]) => {
    try {
      // TODO: Implement status change API call
      console.log("Changing status to:", newStatus);
      onClose();
    } catch (error) {
      console.error("Failed to change status:", error);
    }
  };

  const getInitials = (name: string) => {
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
                <AvatarImage src={`https://ui-avatars.com/api/?name=${application.candidateName}&background=random`} />
                <AvatarFallback>{getInitials(application.candidateName)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{application.candidateName}</CardTitle>
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
                  <p className="text-sm text-muted-foreground">{application.companyName}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Vị trí</p>
                  <p className="text-sm text-muted-foreground">{application.jobTitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trạng thái */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Trạng thái đơn xin việc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    application.status === "PENDING"
                      ? "secondary"
                      : application.status === "APPROVED"
                      ? "success"
                      : "destructive"
                  }
                  className="text-sm"
                >
                  {application.status === "PENDING"
                    ? "Đang chờ xét duyệt"
                    : application.status === "APPROVED"
                    ? "Đã được duyệt"
                    : "Đã bị từ chối"}
                </Badge>
                {application.status === "PENDING" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleStatusChange("APPROVED")}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Duyệt
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleStatusChange("REJECTED")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Từ chối
                    </Button>
                  </div>
                )}
              </div>
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
              <div>
                <p className="text-sm font-medium">Ngày nộp đơn</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(application.createdAt), "dd/MM/yyyy HH:mm", {
                    locale: vi,
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Cập nhật lần cuối</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(application.updatedAt), "dd/MM/yyyy HH:mm", {
                    locale: vi,
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
} 