import { Comments, Qualification, Certification } from "./";

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
  instagram: { name: string; link: string };
  qualification: Qualification []
  certifications: Certification[];
  address: string;
  comments: Comments[];
  createdAt: number;
}

export type categoryStatus = "principal" | "general";
