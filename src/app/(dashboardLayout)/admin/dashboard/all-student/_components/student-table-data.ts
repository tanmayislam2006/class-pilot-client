import type { Student } from "@/types/admin.types";

export type AdminStudentRow = {
  batch: string;
  email: string;
  feeStatus: string;
  id: string;
  userId: string;
  name: string;
  performance: string;
  status: string;
};

function formatStatus(status?: string) {
  return status
    ? `${status.slice(0, 1)}${status.slice(1).toLowerCase()}`
    : "Unknown";
}

function deriveFeeStatus(feeCount?: number) {
  return feeCount && feeCount > 0 ? "Recorded" : "Pending";
}

export function mapStudentToRow(student: Student): AdminStudentRow {
  return {
    id: student.id,
    userId: student.user.id,
    name: student.user.name,
    email: student.user.email,
    batch: student.batch?.name ?? "No batch",
    feeStatus: deriveFeeStatus(student._count?.fees),
    performance: `${student._count?.submissions ?? 0} submissions`,
    status: formatStatus(student.user.status),
  };
}
