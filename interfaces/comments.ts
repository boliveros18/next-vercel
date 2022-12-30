
export interface Comments {
  user_photo: string;
  user_name: string;
  user_id: string;
  description: string;
  likes: {
    user_id: string;
    user_name: string;
    approved: boolean;
  };

  answers: [];
  createdAt: number;
  updatedAt: number;
}
