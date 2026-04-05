import { httpClient } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { TeacherDashboardData } from "@/types/teacher.types";

export const teacherService = {
    getDashboardData: async (): Promise<ApiResponse<TeacherDashboardData>> => {
        return await httpClient.get<ApiResponse<TeacherDashboardData>>(
            "/teacher/dashboard",
        );
    },
}