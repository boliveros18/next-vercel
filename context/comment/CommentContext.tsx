import { createContext, Dispatch, SetStateAction } from "react";
import { Comment } from "../../interfaces";

interface ContextProps {
  comment: Comment;
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
  createComment: (payload: Comment) => Promise<void>;
  updateComment: (id: string, payload: Comment) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}

export const CommentContext = createContext({} as ContextProps);
