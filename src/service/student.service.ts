import { httpClient } from "@/lib/httpClient";
import {
  StudentDashboardResponse,
  AssignedQuizzesResponse,
  SubmissionHistoryResponse,
  SubmissionDetailsResponse,
  AttendanceSummaryResponse,
  FeeSummaryResponse,
  FeeHistoryResponse,
  QuizSubmissionPayload,
  QuizDetailsResponse,
  QuizSubmissionResponse,
  PaymentSessionResponse,
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

  getSubmissionDetails: async (submissionId: string) => {
    return await httpClient.get<SubmissionDetailsResponse>(`/student/submissions/${submissionId}`);
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
    return await httpClient.post<PaymentSessionResponse, Record<string, never>>(`/student/fees/${feeId}/pay`, {});
  },

  submitQuiz: async (batchId: string, quizId: string, payload: QuizSubmissionPayload) => {
    return await httpClient.post<QuizSubmissionResponse, QuizSubmissionPayload>(
      `/quiz/${batchId}/quizzes/${quizId}/submit`,
      payload
    );
  },

  getQuizDetails: async (batchId: string, quizId: string) => {
    return await httpClient.get<QuizDetailsResponse>(`/quiz/${batchId}/quizzes/${quizId}`);
  },
};
