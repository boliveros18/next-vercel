import { createContext,  Dispatch, SetStateAction } from "react";
import { Like } from '../../interfaces';

interface ContextProps {
  likes: Like[];
  like: Like;
  principalLike: Like[];
  setPrincipalLike: Dispatch<SetStateAction<Like[]>>;
  likeLength: number;
  setLikeLength: Dispatch<SetStateAction<number>>;
  getLike: (id: string) => Promise<void>;
  getLikes: () => Promise<void>
  createLike: (payload: Like) => Promise<void>;
  deleteLike: (id: string) => Promise<void>;
}

export const LikeContext = createContext({} as ContextProps);
