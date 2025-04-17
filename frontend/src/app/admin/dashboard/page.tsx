"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentActivities } from "./ui/RecentActivities";
import { Users, Briefcase, FileCheck, TrendingUp, BarChart } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUsers } from "@/redux/features/userSlice";
import { jobService, JobResponse } from "@/services/jobService";
import { resumeService, ResumeListResponse } from "@/services/resumeService";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StatsOverviewCard() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Thống kê tổng quan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tỷ lệ ứng tuyển</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div className="h-2 w-[75%] rounded-full bg-primary"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tỷ lệ phỏng vấn</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div className="h-2 w-[45%] rounded-full bg-primary"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tỷ lệ tuyển dụng</span>
              <span className="font-medium">25%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div className="h-2 w-[25%] rounded-full bg-primary"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [totalResumes, setTotalResumes] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await dispatch(fetchUsers()).unwrap();
        setTotalUsers(usersResponse.length);

        // Fetch jobs
        const jobsResponse = await jobService.getAllJobs({});
        if (jobsResponse && jobsResponse.data && typeof jobsResponse.data.totalRecords === 'number') {
          setTotalJobs(jobsResponse.data.totalRecords);
        } else {
          setTotalJobs(0);
        }

        // Fetch resumes
        const resumesResponse = await resumeService.getAll();
        if (resumesResponse && resumesResponse.data && typeof resumesResponse.data.totalRecords === 'number') {
          setTotalResumes(resumesResponse.data.totalRecords);
        } else {
          setTotalResumes(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalJobs(0);
        setTotalResumes(0);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h2>
      <div className="grid gap-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <StatCard
            title="Tổng người dùng"
            value={totalUsers.toString()}
            description="Số lượng người dùng trong hệ thống"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Công việc đang tuyển"
            value={totalJobs.toString()}
            description="Số lượng công việc đang tuyển dụng"
            icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Hồ sơ ứng tuyển"
            value={totalResumes.toString()}
            description="Số lượng hồ sơ đã nộp"
            icon={<FileCheck className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-3">
            <RecentActivities />
          </div>
          <StatsOverviewCard />
        </div>
      </div>
    </div>
  );
}

