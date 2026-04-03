import "server-only";

import { httpClient } from "@/lib/httpClient";
import {
  AdminOverviewData,
  Batch,
  Student,
  Teacher,
  UpdateAdminUserStatusPayload,
} from "@/types/admin.types";
import { ApiResponse } from "@/types/api";

export const adminService = {
  getDashboardData: async (): Promise<ApiResponse<AdminOverviewData>> => {
    return await httpClient.get<ApiResponse<AdminOverviewData>>(
      "/admin/overview",
    );
  },
  getAllTeachers: async (): Promise<ApiResponse<Teacher[]>> => {
    return await httpClient.get<ApiResponse<Teacher[]>>("/admin/teachers");
  },
  getAllBatches: async (): Promise<ApiResponse<Batch[]>> => {
    return await httpClient.get<ApiResponse<Batch[]>>("/admin/batches");
  },
  getAllStudents: async (): Promise<ApiResponse<Student[]>> => {
    return await httpClient.get<ApiResponse<Student[]>>("/admin/students");
  },
  updateStatus: async (
    userId: string,
    payload: UpdateAdminUserStatusPayload,
  ) => {
    return await httpClient.patch<ApiResponse<null>>(
      `/admin/users/${userId}/status`,
      payload,
    );
  },
};
