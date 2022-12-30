import { Likes } from "./";

export interface Comments {
  user_photo: string;
  user_name: string;
  user_id: string;
  description: string;
  likes: Likes[];
  answers: [];
  createdAt: number;
  updatedAt: number;
}
