import { httpClient } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { CreateQuizPayload, Quiz, TeacherAllQuizItem, TeacherQuizDetailsData, TeacherQuizQuestionItem, UpdateQuizPayload, UpdateQuizQuestionPayload, AddQuizQuestionPayload } from "@/types/teacher.types";

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
  updateQuiz: async (batchId: string, quizId: string, payload: UpdateQuizPayload): Promise<ApiResponse<Quiz>> => {
    return await httpClient.patch<ApiResponse<Quiz>>(
      `/quiz/${batchId}/quizzes/${quizId}`,
      payload
    );
  },
  addQuizQuestion: async (batchId: string, quizId: string, payload: AddQuizQuestionPayload): Promise<ApiResponse<TeacherQuizQuestionItem>> => {
    return await httpClient.post<ApiResponse<TeacherQuizQuestionItem>>(
      `/quiz/${batchId}/quizzes/${quizId}/questions`,
      payload
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
  },
  updateQuizQuestion: async (batchId: string, quizId: string, questionId: string, payload: UpdateQuizQuestionPayload): Promise<ApiResponse<void>> => {
    return await httpClient.patch<ApiResponse<void>>(
      `/quiz/${batchId}/quizzes/${quizId}/questions/${questionId}`,
      payload
    );
  },
  deleteQuizQuestion: async (batchId: string, quizId: string, questionId: string): Promise<ApiResponse<void>> => {
    return await httpClient.delete<ApiResponse<void>>(
      `/quiz/${batchId}/quizzes/${quizId}/questions/${questionId}`
    );
  }
};
