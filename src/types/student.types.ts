import { ApiResponse } from "./api";

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  status: string;
}

export interface QuizOption {
  key: string;
  value: string;
}

export interface StudentAnswer {
  questionId: string;
  questionText: string;
  options: QuizOption[];
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  explanation: string | null;
}

export interface SubmissionDetailsData {
  submission: {
    id: string;
    submittedAt: string;
    score: number;
    totalPoints: number;
    percentage: number;
    result: "PASS" | "FAIL";
  };
  quiz: {
    id: string;
    title: string;
    description: string;
    totalQuestions: number;
    duration: number;
  };
  answers: StudentAnswer[];
  summary: {
    correctCount: number;
    wrongCount: number;
    skippedCount: number;
  };
}

export type SubmissionDetailsResponse = ApiResponse<SubmissionDetailsData>;

export interface TeacherInfo {
  id: string;
  phone: string;
  subject: string;
  user: StudentUser;
}

export interface StudentBatch {
  id: string;
  name: string;
  description: string;
  schedule: string;
  startDate: string;
  endDate: string;
  teacher?: TeacherInfo;
}

export interface StudentProfile {
  id: string;
  batchId: string;
  phone: string;
  enrollmentDate: string;
  user: StudentUser;
  batch: StudentBatch;
}

export interface DashboardSummary {
  assignedQuizCount: number;
  submittedQuizCount: number;
  pendingQuizCount: number;
  overdueQuizCount: number;
  attendanceRate: number;
  totalDueAmount: number;
  totalPaidAmount: number;
  totalUnpaidAmount: number;
  pendingFeeCount: number;
  averageScorePercentage: number;
}

export interface ChartSeries {
  key: string;
  label: string;
  data?: number[];
  value?: number;
}

export interface DashboardCharts {
  barChart: {
    title: string;
    description: string;
    categories: string[];
    series: ChartSeries[];
  };
  pieChart: {
    title: string;
    description: string;
    total: number;
    series: ChartSeries[];
  };
}

export interface StudentSubmission {
  id: string;
  score: number;
  totalPoints: number;
  percentage: number;
  submittedAt: string;
  answerCount?: number;
}

export interface StudentQuiz {
  id: string;
  batchId: string;
  title: string;
  description: string;
  duration: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  batch: {
    id: string;
    name: string;
  };
  questionCount: number;
  submissionCount: number;
  status: "pending" | "submitted" | "overdue";
  submission: StudentSubmission | null;
}

export interface StudentDashboardData {
  student: StudentProfile;
  summary: DashboardSummary;
  charts: DashboardCharts;
  recentAssignedQuizzes: StudentQuiz[];
  recentSubmissions: (StudentSubmission & { quiz: Partial<StudentQuiz> & { batch: { name: string } } })[];
}

export type StudentDashboardResponse = ApiResponse<StudentDashboardData>;

export interface AssignedQuizzesData {
  student: StudentProfile;
  counts: {
    totalAssigned: number;
    submitted: number;
    pending: number;
    overdue: number;
  };
  quizzes: StudentQuiz[];
}

export type AssignedQuizzesResponse = ApiResponse<AssignedQuizzesData>;

export interface SubmissionHistoryData {
  student: StudentProfile;
  summary: {
    totalSubmittedQuizzes: number;
    averageScorePercentage: number;
    bestScorePercentage: number;
  };
  history: (StudentSubmission & { quiz: StudentQuiz })[];
}

export type SubmissionHistoryResponse = ApiResponse<SubmissionHistoryData>;

export interface AttendanceSummaryData {
  student: StudentProfile;
  summary: {
    presentCount: number;
    absentCount: number;
    totalRecords: number;
    attendanceRate: number;
  };
  charts: DashboardCharts;
  recentAttendance: {
    id: string;
    date: string;
    status: "PRESENT" | "ABSENT";
    remarks: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
}

export type AttendanceSummaryResponse = ApiResponse<AttendanceSummaryData>;

export interface StudentFee {
  id: string;
  amount: number;
  month: string;
  year: number;
  status: "PAID" | "UNPAID";
  dueDate: string;
  paidAt: string | null;
  createdAt: string;
  normalizedStatus: "paid" | "overdue" | "pending";
}

export interface FeeSummaryData {
  student: StudentProfile;
  summary: {
    totalDueAmount: number;
    totalPaidAmount: number;
    totalUnpaidAmount: number;
    pendingFeeCount: number;
    overdueFeeCount: number;
  };
  charts: DashboardCharts;
  recentFees: StudentFee[];
  dues: StudentFee[];
}

export type FeeSummaryResponse = ApiResponse<FeeSummaryData>;

export interface FeeHistoryData {
  student: StudentProfile;
  summary: {
    totalRecords: number;
    totalAmount: number;
    paidCount: number;
    unpaidCount: number;
    overdueCount: number;
  };
  history: StudentFee[];
}

export type FeeHistoryResponse = ApiResponse<FeeHistoryData>;

export interface QuizDetailsQuestion {
  id: string;
  order: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  point: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizDetailsData {
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
  questions: QuizDetailsQuestion[];
  _count: {
    questions: number;
    submissions: number;
  };
}

export type QuizDetailsResponse = ApiResponse<QuizDetailsData>;

export interface QuizSubmissionResponseData {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  totalPoints: number;
  submittedAt: string;
  createdAt: string;
  quiz: {
    id: string;
    batchId: string;
    title: string;
  };
  answers: {
    id: string;
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
    createdAt: string;
  }[];
}

export type QuizSubmissionResponse = ApiResponse<QuizSubmissionResponseData>;

export interface QuizSubmissionPayload {
  submission: {
    answers: {
      questionId: string;
      selectedAnswer: string;
    }[];
  };
}

export type { ApiResponse };
