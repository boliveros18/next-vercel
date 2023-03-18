export interface Comment {
  _id: string;
  type: string;
  parent_id: string;
  user_photo: string;
  user_name: string;
  user_id: string;
  description: string;
  user_tag_id: string;
  user_tag_name: string;
  answers: number;
  likes: number;
  createdAt: number;
  updatedAt: number;
}
