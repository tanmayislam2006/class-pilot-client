export type AdminStudentRow = {
  batch: string;
  email: string;
  feeStatus: "Paid" | "Due";
  id: string;
  name: string;
  performance: string;
  status: "Active" | "Suspended";
};

export const adminStudentRows: AdminStudentRow[] = [
  {
    id: "S-2001",
    name: "Ishrat Nabila",
    email: "ishrat.nabila@student.classpilot.com",
    batch: "Batch A1",
    feeStatus: "Paid",
    performance: "91%",
    status: "Active",
  },
  {
    id: "S-2002",
    name: "Mehedi Hasan",
    email: "mehedi.hasan@student.classpilot.com",
    batch: "Batch A2",
    feeStatus: "Due",
    performance: "84%",
    status: "Active",
  },
  {
    id: "S-2003",
    name: "Farzana Akter",
    email: "farzana.akter@student.classpilot.com",
    batch: "Batch B1",
    feeStatus: "Paid",
    performance: "88%",
    status: "Active",
  },
  {
    id: "S-2004",
    name: "Rakibul Islam",
    email: "rakibul.islam@student.classpilot.com",
    batch: "Batch C1",
    feeStatus: "Due",
    performance: "72%",
    status: "Suspended",
  },
];
