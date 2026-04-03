import type { Batch, Student, Teacher } from "@/types/admin.types";
import type { ApiResponse } from "@/types/api";

export const adminQueryKeys = {
  teachers: ["admin", "teachers"] as const,
  students: ["admin", "students"] as const,
  batches: ["admin", "batches"] as const,
};

async function getApiData<T>(input: string): Promise<ApiResponse<T>> {
  const response = await fetch(input, {
    cache: "no-store",
    credentials: "include",
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export function fetchAdminTeachersQuery() {
  return getApiData<Teacher[]>("/api/admin/teachers");
}

export function fetchAdminStudentsQuery() {
  return getApiData<Student[]>("/api/admin/students");
}

export function fetchAdminBatchesQuery() {
  return getApiData<Batch[]>("/api/admin/batches");
}
