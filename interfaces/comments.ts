export interface Comments {
  _id: string;
  user_photo: string;
  user_name: string;
  user_id: string;
  description: string;
  approved: boolean;
  likes: number;
  createdAt: number;
  answers: [];
}
