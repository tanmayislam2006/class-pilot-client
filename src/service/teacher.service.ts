import { httpClient } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { TeacherDashboardData, TeacherAssignedBatch, TeacherBatchWithStudents, TeacherBatchQuizzesResponse, QuizSubmissionsResponseData } from "@/types/teacher.types";

export const teacherService = {
    getDashboardData: async (): Promise<ApiResponse<TeacherDashboardData>> => {
        return await httpClient.get<ApiResponse<TeacherDashboardData>>(
            "/teacher/dashboard",
        );
    },
    getMyBatches: async (): Promise<ApiResponse<TeacherAssignedBatch[]>> => {
        return await httpClient.get<ApiResponse<TeacherAssignedBatch[]>>(
            "/teacher/my-batches",
        );
    },
    getBatchStudents: async (batchId: string): Promise<ApiResponse<TeacherBatchWithStudents>> => {
        return await httpClient.get<ApiResponse<TeacherBatchWithStudents>>(
            `/teacher/batches/${batchId}/students`
        );
    },
    getBatchQuizzes: async (batchId: string): Promise<ApiResponse<TeacherBatchQuizzesResponse>> => {
        return await httpClient.get<ApiResponse<TeacherBatchQuizzesResponse>>(
            `/teacher/batches/${batchId}/quizzes`
        );
    },
    getQuizSubmissions: async (batchId: string, quizId: string): Promise<ApiResponse<QuizSubmissionsResponseData>> => {
        return await httpClient.get<ApiResponse<QuizSubmissionsResponseData>>(
            `/quiz/${batchId}/quizzes/${quizId}/submissions`
        );
    }
}