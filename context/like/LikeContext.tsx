import { createContext } from "react";
import { Like } from '../../interfaces';

interface ContextProps {
  likes: Like[];
  like: Like;
  getLike: (id: string) => Promise<void>;
  getLikes: () => Promise<void>
  createLike: (payload: Like) => Promise<void>;
  deleteLike: (id: string) => Promise<void>;
}

export const LikeContext = createContext({} as ContextProps);
