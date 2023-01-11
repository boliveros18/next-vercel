import { createContext, Dispatch, SetStateAction } from "react";
import { Like } from '../../interfaces';

interface ContextProps {
  likes: Like[];
  like: Like;
  setLikes: Dispatch<SetStateAction<Like[]>>;
  createLike: (payload: Like) => Promise<void>;
  deleteLike: (id: string) => Promise<void>;
}

export const LikeContext = createContext({} as ContextProps);
