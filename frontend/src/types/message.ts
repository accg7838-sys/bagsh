export type MessageStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface RainComment {
  id: number;
  studentName: string;
  className?: string | null;
  content: string;
  status?: MessageStatus;
  createdAt?: string;
}

export interface TeacherLetter {
  id: number;
  teacherId: number;
  studentName: string;
  className?: string | null;
  content: string;
  status?: MessageStatus;
  createdAt?: string;
  teacher?: {
    name: string;
    slug: string;
  };
}

export interface HomeLetter {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}
