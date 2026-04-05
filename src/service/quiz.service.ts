import { httpClient } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { CreateQuizPayload, Quiz, TeacherAllQuizItem, TeacherQuizDetailsData } from "@/types/teacher.types";

export const quizService = {
  createQuiz: async (batchId: string, payload: CreateQuizPayload): Promise<ApiResponse<Quiz>> => {
    return await httpClient.post<ApiResponse<Quiz>>(
      `/quiz/${batchId}/quizzes`,
      payload
    );
  },
  getMyAllQuizzes: async (): Promise<ApiResponse<TeacherAllQuizItem[]>> => {
    return await httpClient.get<ApiResponse<TeacherAllQuizItem[]>>(
      "/quiz/my-all-quizzes"
    );
  },
  getQuizDetails: async (batchId: string, quizId: string): Promise<ApiResponse<TeacherQuizDetailsData>> => {
    return await httpClient.get<ApiResponse<TeacherQuizDetailsData>>(
      `/quiz/${batchId}/quizzes/${quizId}`
    );
  },
  togglePublish: async (batchId: string, quizId: string, isPublished: boolean): Promise<ApiResponse<void>> => {
    return await httpClient.patch<ApiResponse<void>>(
      `/quiz/${batchId}/quizzes/${quizId}/publish`,
      { quiz: { isPublished } }
    );
  },
  deleteQuiz: async (batchId: string, quizId: string): Promise<ApiResponse<void>> => {
    return await httpClient.delete<ApiResponse<void>>(
      `/quiz/${batchId}/quizzes/${quizId}`
    );
  }
};
