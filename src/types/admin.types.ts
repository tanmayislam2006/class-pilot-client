export interface AdminOverviewData {
  counts: AdminCounts;
  recentBatches: Batch[];
  recentQuizzes: Quiz[];
}


export interface AdminCounts {
  totalTeachers: number;
  totalStudents: number;
  totalBatches: number;
  totalQuizzes: number;
  totalPublishedQuizzes: number;
  totalSubmissions: number;
  activeUsers: number;
  blockedUsers: number;
}


export interface Batch {
  id: string;
  description?: string;
  schedule?: string;
  startDate?: string;
  endDate?: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  teacher: Teacher;
  _count?: {
    students?: number;
    quizzes?: number;
  };
}

export interface Teacher {
  id: string;
  user: User;
  phone?: string;
  bio?: string;
  subject?: string;
  subjects?: string;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    batches?: number;
    quizzes?: number;
    students?: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  status?: string;
  emailVerified?: boolean;
  needPasswordChange?: boolean;
}

export interface Student {
  id: string;
  batchId: string;
  phone?: string;
  enrollmentDate: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  batch: Batch;
  _count?: {
    submissions?: number;
    attendance?: number;
    fees?: number;
  };
}

export interface Quiz {
  id: string;
  batchId: string;
  title: string;
  isPublished: boolean;
  dueDate: string;
  createdAt: string;
  batch: QuizBatch;
}

export interface QuizBatch {
  id: string;
  name: string;
}

export type UpdateAdminUserStatusPayload = {
  user: {
    status: string;
  };
};
