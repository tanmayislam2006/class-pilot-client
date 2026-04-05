

// ==============================
// MAIN DATA
// ==============================
export interface TeacherDashboardData {
  summary: Summary;
  charts: Charts;
  attendanceSummary: AttendanceSummary;
  recentQuizzes: Quiz[];
  recentSubmissions: Submission[];
  batchSummary: BatchSummary[];
}

// ==============================
// SUMMARY
// ==============================
export interface Summary {
  totalBatches: number;
  totalStudents: number;
  totalQuizzes: number;
  totalPublishedQuizzes: number;
  totalDraftQuizzes: number;
  totalSubmissions: number;
  averageScorePercentage: number;
  attendanceRate: number;
}

// ==============================
// CHARTS
// ==============================
export interface Charts {
  barChart: BarChart;
  pieChart: PieChart;
}

// ===== BAR CHART =====
export interface BarChart {
  title: string;
  description: string;
  categories: string[];
  series: BarChartSeries[];
}

export interface BarChartSeries {
  key: "students" | "quizzes" | "submissions" | string;
  label: string;
  data: number[];
}

// ===== PIE CHART =====
export interface PieChart {
  title: string;
  description: string;
  total: number;
  series: PieChartSeries[];
}

export interface PieChartSeries {
  key: "present" | "absent" | string;
  label: string;
  value: number;
}

// ==============================
// ATTENDANCE SUMMARY
// ==============================
export interface AttendanceSummary {
  period: string; // e.g. "last_30_days"
  presentCount: number;
  absentCount: number;
  totalAttendanceRecords: number;
  attendanceRate: number;
}

// ==============================
// QUIZ
// ==============================
export interface Quiz {
  id: string;
  batchId: string;
  title: string;
  isPublished: boolean;
  dueDate: string; // ISO Date
  createdAt: string; // ISO Date
  batch: {
    id: string;
    name: string;
  };
  _count: {
    questions: number;
    submissions: number;
  };
}

// ==============================
// SUBMISSION
// ==============================
export interface Submission {
  id: string;
  score: number;
  totalPoints: number;
  submittedAt: string; // ISO Date
  quiz: {
    id: string;
    title: string;
    batch: {
      id: string;
      name: string;
    };
  };
  student: {
    id: string;
    batchId: string;
    user: User;
  };
}

// ==============================
// BATCH SUMMARY
// ==============================
export interface BatchSummary {
  id: string;
  name: string;
  schedule: string;
  startDate: string; // ISO Date
  endDate: string; // ISO Date
  teacher: Teacher;
  studentCount: number;
  quizCount: number;
  submissionCount: number;
  averageScorePercentage: number;
}

// ==============================
// SHARED TYPES
// ==============================
export interface Teacher {
  id: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  status?: string;
}

// ==============================
// MY BATCHES (API 1)
// ==============================
export interface TeacherAssignedBatch {
  id: string;
  name: string;
  description: string;
  schedule: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  teacher: {
    id: string;
    user: User;
  };
  _count: {
    students: number;
  };
}

// ==============================
// BATCH STUDENTS (API 2)
// ==============================
export interface TeacherBatchStudent {
  id: string;
  batchId: string;
  phone: string;
  enrollmentDate: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface TeacherBatchWithStudents {
  id: string;
  name: string;
  schedule: string;
  startDate: string;
  endDate: string;
  teacher: {
    id: string;
    user: User;
  };
  students: TeacherBatchStudent[];
  _count: {
    students: number;
  };
}