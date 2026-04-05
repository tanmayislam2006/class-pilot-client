import type { Teacher } from "@/types/admin.types";

export type AdminTeacherRow = {
  id: string;
  userId: string;
  batches: number;
  email: string;
  createdAt: string;
  name: string;
  specialty: string;
  status: string;
};

function formatDate(value?: string) {
  if (!value) return "Recently added";

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(status?: string) {
  return status
    ? `${status.slice(0, 1)}${status.slice(1).toLowerCase()}`
    : "Unknown";
}

export function mapTeacherToRow(teacher: Teacher): AdminTeacherRow {
  return {
    id: teacher.id,
    userId: teacher.user.id,
    name: teacher.user.name,
    email: teacher.user.email,
    specialty: teacher.subject ?? teacher.subjects ?? teacher.bio ?? "General",
    batches: teacher._count?.batches ?? 0,
    status: formatStatus(teacher.user.status),
    createdAt: formatDate(teacher.createdAt),
  };
}
