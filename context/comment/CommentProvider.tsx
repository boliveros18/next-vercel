import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { CommentContext, commentsReducer } from "./";
import { Comment } from "../../interfaces";
import { CommentService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  comments: Comment[];
  comment: Comment;
}

const INITIAL_STATE: State = {
  comments: [],
  comment: {} as Comment,
};

export const CommentProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, INITIAL_STATE);

  const [comments, setComments] = useState<Comment[]>([]);

  const createComment = async (payload: Comment) => {
    const data = await CommentService.createOne(payload);
    dispatch({ type: "COMMENT_GET", payload: data });
    setComments([...comments, data])
    return data
  };

  const updateComment = async (id: string, payload: Comment) => {
    const data  = await CommentService.updateOne(id, payload);
    dispatch({ type: "COMMENT_GET", payload: data });
    return data;
  };

  const deleteComment = async (id: string) => {
    const data = await CommentService.deleteOne(id);
    dispatch({ type: "COMMENT_GET", payload: id });
    return data
  };

  return (
    <CommentContext.Provider
      value={{ ...state, comments, setComments, createComment, updateComment, deleteComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};
