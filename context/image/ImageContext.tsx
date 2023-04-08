import { createContext } from "react";
import { Image } from "../../interfaces";


interface ContextProps {
  image: Image;
  setImage: (payload: Image) => void;
  getImageByParentId: (parent_id: string) => void;
  createImage: (payload: Image) => Promise<void>;
  updateImage: (id: string, payload: Image) => Promise<void>;
}

export const ImageContext = createContext({} as ContextProps);