"use client";

import { ActivityLogDataTable } from "./ui/ActivityLogDataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LogsPage() {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Nhật ký hoạt động</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityLogDataTable />
        </CardContent>
      </Card>
    </div>
  );
} 