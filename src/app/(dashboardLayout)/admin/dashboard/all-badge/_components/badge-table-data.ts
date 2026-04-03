export type AdminBadgeRow = {
  audience: string;
  category: string;
  id: string;
  name: string;
  status: "Active" | "Draft";
  totalAwarded: number;
};

export const adminBadgeRows: AdminBadgeRow[] = [
  {
    id: "B-3001",
    name: "Perfect Attendance",
    category: "Engagement",
    audience: "Students",
    totalAwarded: 42,
    status: "Active",
  },
  {
    id: "B-3002",
    name: "Top Performer",
    category: "Achievement",
    audience: "Students",
    totalAwarded: 18,
    status: "Active",
  },
  {
    id: "B-3003",
    name: "Mentor Spotlight",
    category: "Recognition",
    audience: "Teachers",
    totalAwarded: 5,
    status: "Draft",
  },
  {
    id: "B-3004",
    name: "Quiz Champion",
    category: "Achievement",
    audience: "Students",
    totalAwarded: 27,
    status: "Active",
  },
];
