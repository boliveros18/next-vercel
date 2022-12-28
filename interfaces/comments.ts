import { Likes } from "./likes";

export interface Comments {
  user_photo: string;
  user_name: string;
  user_id: string;
  description: string;
  createdAt: number;
  likes: Likes[]
  answers: [];
}
