import { ApiResponse } from "@/types/api";
import {
  StudentDashboardData,
  AssignedQuizzesData,
  SubmissionHistoryData,
  SubmissionDetailsData,
  AttendanceSummaryData,
  FeeSummaryData,
  FeeHistoryData,
} from "@/types/student.types";

export const studentQueryKeys = {
  dashboard: ["student", "dashboard"] as const,
  assignedQuizzes: ["student", "assigned-quizzes"] as const,
  submissionHistory: ["student", "submission-history"] as const,
  submissionDetails: (id: string) => ["student", "submission-details", id] as const,
  attendanceSummary: ["student", "attendance-summary"] as const,
  feeSummary: ["student", "fee-summary"] as const,
  feeHistory: ["student", "fee-history"] as const,
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
