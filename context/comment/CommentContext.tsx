import { createContext, Dispatch, SetStateAction } from "react";
import { Comment } from "../../interfaces";

interface ContextProps {
  comments: Comment[];
  comment: Comment;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  updateComment: (id: string, payload: Comment) => Promise<void>;
}

export const CommentContext = createContext({} as ContextProps);
