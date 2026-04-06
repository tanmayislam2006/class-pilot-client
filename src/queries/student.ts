import { ApiResponse } from "@/types/api";
import {
  StudentDashboardData,
  AssignedQuizzesData,
  SubmissionHistoryData,
  SubmissionDetailsData,
  AttendanceSummaryData,
  FeeSummaryData,
  FeeHistoryData,
  QuizDetailsData,
  QuizSubmissionPayload,
  QuizSubmissionResponseData,
} from "@/types/student.types";

export const studentQueryKeys = {
  dashboard: ["student", "dashboard"] as const,
  assignedQuizzes: ["student", "assigned-quizzes"] as const,
  submissionHistory: ["student", "submission-history"] as const,
  submissionDetails: (id: string) => ["student", "submission-details", id] as const,
  attendanceSummary: ["student", "attendance-summary"] as const,
  feeSummary: ["student", "fee-summary"] as const,
  feeHistory: ["student", "fee-history"] as const,
  quizDetails: (batchId: string, quizId: string) => ["student", "quiz-details", batchId, quizId] as const,
};

async function getApiData<T>(input: string): Promise<ApiResponse<T>> {
  const response = await fetch(input, {
    cache: "no-store",
    credentials: "include", // Forward cookies for proxy
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export function fetchStudentDashboardQuery() {
  return getApiData<StudentDashboardData>("/api/student/dashboard");
}

export function fetchAssignedQuizzesQuery() {
  return getApiData<AssignedQuizzesData>("/api/student/quizzes/assigned");
}

export function fetchSubmissionHistoryQuery() {
  return getApiData<SubmissionHistoryData>("/api/student/quizzes/submissions");
}

export function fetchSubmissionDetailsQuery(submissionId: string) {
  return getApiData<SubmissionDetailsData>(`/api/student/quizzes/submissions/${submissionId}`);
}

export function fetchAttendanceSummaryQuery() {
  return getApiData<AttendanceSummaryData>("/api/student/attendance");
}

export function fetchFeeSummaryQuery() {
  return getApiData<FeeSummaryData>("/api/student/fees");
}

export function fetchFeeHistoryQuery() {
  return getApiData<FeeHistoryData>("/api/student/fees/history");
}

export function fetchQuizDetailsQuery(batchId: string, quizId: string) {
  return getApiData<QuizDetailsData>(`/api/student/quizzes/${batchId}/${quizId}`);
}

export async function submitQuizMutation(batchId: string, quizId: string, payload: QuizSubmissionPayload) {
  const response = await fetch(`/api/student/quizzes/${batchId}/${quizId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json() as ApiResponse<QuizSubmissionResponseData>;

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to submit quiz");
  }

  return data;
}
