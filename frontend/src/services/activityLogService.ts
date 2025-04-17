import { ActivityLogQueryParams, ActivityLogResponse } from "@/types/activityLog";
import { API_URL } from "@/config/constants";

export async function getActivityLogs(params: ActivityLogQueryParams): Promise<ActivityLogResponse> {
  try {
    // Format dates to ISO string if they exist
    const formattedParams = {
      ...params,
      fromDate: params.fromDate ? new Date(params.fromDate).toISOString() : undefined,
      toDate: params.toDate ? new Date(params.toDate).toISOString() : undefined,
      pageNumber: (params.pageNumber || 0) + 1
    };

    const response = await fetch(`${API_URL}/ActivityLogs/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        request: formattedParams
      }),
    });

    const data = await response.json();
    console.log('Raw API Response:', data);

    // Trả về đúng cấu trúc response theo API thực tế
    return {
      result: data.result,
      message: data.message,
      data: data.data.items || [], // Lấy items từ data
      totalItems: data.data.totalRecords,
      totalPages: data.data.totalPages,
      currentPage: data.data.currentPage
    };
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    throw error;
  }
} 