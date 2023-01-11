export interface Comment {
  _id?: string;
  parent_id: string;
  user_photo: string;
  user_name: string;
  user_id: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  //like: []
  //answer: []
}
