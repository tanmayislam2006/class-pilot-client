import { httpClient } from "@/lib/httpClient";
import {
  StudentDashboardResponse,
  AssignedQuizzesResponse,
  SubmissionHistoryResponse,
  AttendanceSummaryResponse,
  FeeSummaryResponse,
  FeeHistoryResponse,
  QuizSubmissionPayload,
  ApiResponse,
} from "@/types/student.types";

export const studentService = {
  getDashboard: async () => {
    return await httpClient.get<StudentDashboardResponse>("/student/dashboard");
  },

  getAssignedQuizzes: async () => {
    return await httpClient.get<AssignedQuizzesResponse>("/student/assigned-quizzes");
  },

  getSubmissionHistory: async () => {
    return await httpClient.get<SubmissionHistoryResponse>("/student/submission-history");
  },

  getAttendanceSummary: async () => {
    return await httpClient.get<AttendanceSummaryResponse>("/student/attendance-summary");
  },

  getFeeSummary: async () => {
    return await httpClient.get<FeeSummaryResponse>("/student/fee-summary");
  },

  getFeeHistory: async () => {
    return await httpClient.get<FeeHistoryResponse>("/student/fees/history");
  },

  payFee: async (feeId: string) => {
    return await httpClient.post<ApiResponse<any>, any>(`/student/fees/${feeId}/pay`, {});
  },

  submitQuiz: async (batchId: string, quizId: string, payload: QuizSubmissionPayload) => {
    return await httpClient.post<ApiResponse<any>, QuizSubmissionPayload>(
      `/quiz/${batchId}/quizzes/${quizId}/submit`,
      payload
    );
  },
};
