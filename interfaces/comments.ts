export interface Comments {
  _id: string;
  photo: string;
  username: string;
  user_id: string;
  description: string;
  approved: boolean;
  likes: string;
  status: string;
  createdAt: number;
  answers: [];
}
