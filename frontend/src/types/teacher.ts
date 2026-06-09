export interface Teacher {
  id: number;
  name: string;
  subject?: string | null;
  photoUrl?: string | null;
  slug: string;
  pinCode?: string | null;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    letters: number;
  };
}
