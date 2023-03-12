import { createContext,  Dispatch, SetStateAction } from "react";
import { Like } from '../../interfaces';

interface ContextProps {
  like: Like;
  likes: Like[];
  setLikes: Dispatch<SetStateAction<Like[]>>;
  likesLength: number;
  setLikesLength: Dispatch<SetStateAction<number>>;
  getLike: (id: string) => Promise<void>;
  createLike: (payload: Like) => Promise<void>;
  deleteLike: (id: string) => Promise<void>;
}

export const LikeContext = createContext({} as ContextProps);
