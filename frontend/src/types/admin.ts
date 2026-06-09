export interface Admin {
  id: number;
  name: string;
  email: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: Admin;
}

export interface DashboardStats {
  teacherCount: number;
  rainCommentCount: number;
  teacherLetterCount: number;
  pendingCount: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentMessages: Array<{
    id: number;
    studentName: string;
    className: string | null;
    content: string;
    status: string;
    createdAt: string;
  }>;
}
