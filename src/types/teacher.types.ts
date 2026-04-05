

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
    quizzes: number;
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

// ==============================
// BATCH QUIZZES (API 3)
// ==============================
export interface TeacherBatchQuiz {
  id: string;
  title: string;
  description: string;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  _count: {
    questions: number;
    submissions: number;
  };
}

export interface TeacherBatchQuizzesResponse {
  batchId: string;
  batchName: string;
  quizzes: TeacherBatchQuiz[];
}

export interface QuizSubmissionData {
  id: string;
  score: number;
  totalPoints: number;
  submittedAt: string;
  _count: {
    answers: number;
  };
  student: {
    id: string;
    phone: string;
    user: User;
  };
}

export interface QuizSubmissionsResponseData {
  batch: {
    id: string;
    name: string;
  };
  quiz: {
    id: string;
    title: string;
    dueDate: string;
  };
  submissions: QuizSubmissionData[];
}

// ==============================
// ATTENDANCE
// ==============================
export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

export interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface SubmitAttendancePayload {
  attendance: {
    date: string; // ISO Date
    records: AttendanceRecord[];
  };
}

// GET attendance response — flat records array from backend
export interface FetchedAttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    batchId: string;
    user: User;
  };
}

export interface BatchAttendanceResponse {
  batchId: string;
  batchName: string;
  attendance: FetchedAttendanceRecord[];
}

// We will derive this on the client
export interface AttendanceSession {
  id: string; // date string
  date: string;
  batchId: string;
  records: FetchedAttendanceRecord[];
}

// ==============================
// CREATE QUIZ
// ==============================
export interface CreateQuizQuestionPayload {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D" | string;
  point: number;
}

export interface CreateQuizPayload {
  quiz: {
    title: string;
    description: string;
    duration: number;
    dueDate: string;
    questions: CreateQuizQuestionPayload[];
  };
}

export interface UpdateQuizPayload {
  quiz: {
    title?: string;
    description?: string;
    duration?: number;
    dueDate?: string;
  };
}

export interface AddQuizQuestionPayload {
  question: {
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    point?: number;
  };
}


export interface UpdateQuizQuestionPayload {
  question: {
    questionText?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    correctAnswer?: string;
    point?: number;
  };
}

// ==============================
// GLOBAL QUIZZES (API GET /quiz/my-all-quizzes)
// ==============================
export interface TeacherAllQuizItem {
  id: string;
  batchId: string;
  title: string;
  description: string;
  duration: number;
  isPublished: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  batch: {
    id: string;
    name: string;
  };
}

// ==============================
// QUIZ DETAILS (API GET /quiz/:batchId/quizzes/:quizId)
// ==============================
export interface TeacherQuizQuestionItem {
  id: string;
  order: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  point: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherQuizDetailsData {
  id: string;
  batchId: string;
  title: string;
  description: string;
  duration: number;
  isPublished: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  batch: {
    id: string;
    name: string;
  };
  questions: TeacherQuizQuestionItem[];
  _count: {
    questions: number;
    submissions: number;
  };
}