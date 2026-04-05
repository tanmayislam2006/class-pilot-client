import type { ApiResponse } from "@/types/api";
import type { TeacherAssignedBatch, TeacherBatchWithStudents, BatchAttendanceResponse, TeacherBatchQuizzesResponse, QuizSubmissionsResponseData } from "@/types/teacher.types";

export const teacherQueryKeys = {
  dashboard: ["teacher", "dashboard"] as const,
  myBatches: ["teacher", "my-batches"] as const,
  batchStudents: (batchId: string) => ["teacher", "batch-students", batchId] as const,
  batchAttendance: (batchId: string) => ["teacher", "batch-attendance", batchId] as const,
  batchQuizzes: (batchId: string) => ["teacher", "batch-quizzes", batchId] as const,
  quizSubmissions: (batchId: string, quizId: string) => ["teacher", "quiz-submissions", batchId, quizId] as const,
};

async function getApiData<T>(input: string): Promise<ApiResponse<T>> {
  const response = await fetch(input, {
    cache: "no-store",
    credentials: "include", // Essential for forwarding the cookies
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export function fetchTeacherBatchesQuery() {
  return getApiData<TeacherAssignedBatch[]>("/api/teacher/my-batches");
}

export function fetchBatchStudentsQuery(batchId: string) {
  return getApiData<TeacherBatchWithStudents>(`/api/teacher/batches/${batchId}/students`);
}

export function fetchBatchAttendanceQuery(batchId: string) {
  return getApiData<BatchAttendanceResponse>(`/api/teacher/batches/${batchId}/attendance`);
}

export function fetchBatchQuizzesQuery(batchId: string) {
  return getApiData<TeacherBatchQuizzesResponse>(`/api/teacher/batches/${batchId}/quizzes`);
}

export function fetchQuizSubmissionsQuery(batchId: string, quizId: string) {
  return getApiData<QuizSubmissionsResponseData>(`/api/teacher/batches/${batchId}/quiz/${quizId}/submissions`);
}
