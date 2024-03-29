import { createContext } from "react";
import { Image } from "../../interfaces";

export type Pagination = {
  [key: string | number]: any;
  page: number;
  pageSize: number;
};

interface ContextProps {
  image: Image;
  images: Image[];
  setImage: (payload: Image) => void;
  getImagesByParentId: (parent_id: string, pagination?: Pagination) => void;
  createImage: (payload: Image) => Promise<void>;
  updateImage: (id: string, payload: Image) => Promise<void>;
}

export const ImageContext = createContext({} as ContextProps);
