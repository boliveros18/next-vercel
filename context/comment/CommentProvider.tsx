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
  useMemo(() => ({ comments, setComments }), [comments]);

  const updateComment = async (id: string, payload: Comment) => {
    const { status, data } = await CommentService.updateOne(id, payload);
    if (status) dispatch({ type: "COMMENT_UPDATED", payload: data });
    return data;
  };

  return (
    <CommentContext.Provider
      value={{ ...state, comments, setComments, updateComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};
