"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActivityLogs } from "@/services/activityLogService";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ActivityLog } from "@/types/activityLog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RecentActivities() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getActivityLogs({
          pageNumber: 0,
          pageSize: 5
        });

        if (response.result && response.data) {
          setActivities(response.data);
        }
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Đang tải...</div>
          ) : activities.length === 0 ? (
            <div className="text-center text-muted-foreground">Không có hoạt động nào</div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col space-y-1 rounded-lg border p-3 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">
                      {activity.userName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(activity.createdAt)}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">
                      {activity.action}
                    </span>
                    <span className="text-muted-foreground">
                      {activity.targetType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 