export type AdminTeacherRow = {
  id: string;
  batches: number;
  email: string;
  joinedAt: string;
  name: string;
  specialty: string;
  status: "Active" | "On Leave";
};

export const adminTeacherRows: AdminTeacherRow[] = [
  {
    id: "T-1001",
    name: "Ayesha Rahman",
    email: "ayesha.rahman@classpilot.com",
    specialty: "Mathematics",
    batches: 3,
    status: "Active",
    joinedAt: "12 Jan 2026",
  },
  {
    id: "T-1002",
    name: "Tanvir Hasan",
    email: "tanvir.hasan@classpilot.com",
    specialty: "Physics",
    batches: 2,
    status: "Active",
    joinedAt: "03 Feb 2026",
  },
  {
    id: "T-1003",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@classpilot.com",
    specialty: "Biology",
    batches: 4,
    status: "On Leave",
    joinedAt: "24 Nov 2025",
  },
  {
    id: "T-1004",
    name: "Sabbir Ahmed",
    email: "sabbir.ahmed@classpilot.com",
    specialty: "Chemistry",
    batches: 2,
    status: "Active",
    joinedAt: "17 Dec 2025",
  },
];
