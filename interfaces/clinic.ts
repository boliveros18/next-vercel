import { Comments } from "./";

export interface Clinic {
  _id: string;
  category: categoryStatus;
  certified: boolean;
  finantial: string;
  speciality: string;
  technology: string;
  avatar: string;
  photo: string;
  name: string;
  city: string;
  country: string;
  instagram: string;
  qualification: number;
  certifications: string;
  address: string;
  comments: Comments;
}

export type categoryStatus = "principal" | "general";
