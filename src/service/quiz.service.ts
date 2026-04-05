import { httpClient } from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { CreateQuizPayload, Quiz } from "@/types/teacher.types";

export const quizService = {
  createQuiz: async (batchId: string, payload: CreateQuizPayload): Promise<ApiResponse<Quiz>> => {
    return await httpClient.post<ApiResponse<Quiz>>(
      `/quiz/${batchId}/quizzes`,
      payload
    );
  },
};
