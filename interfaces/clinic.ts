import { Comments, Qualification } from "./";

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
  qualification: Qualification;
  certifications: { name: string; description: string; logo: string };
  address: string;
  comments: Comments[];
}

export type categoryStatus = "principal" | "general";
