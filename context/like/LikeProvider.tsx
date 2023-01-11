import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { LikeContext, likesReducer } from "./";
import { Like } from "../../interfaces";
import { LikeService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  likes: Like[];
  like: Like;
}

const INITIAL_STATE: State = {
  likes: [],
  like: {} as Like,
};

export const LikeProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(likesReducer, INITIAL_STATE);

  const [likes, setLikes] = useState<Like[]>([]);
  useMemo(() => ({ likes, setLikes }), [likes]);

  const createLike = async (payload: Like) => {
    const { status, data } = await LikeService.createOne(payload);
    if (status) dispatch({ type: "LIKE_CREATE", payload: data });
  };

  const deleteLike = async (id: string) => {
    const { status } = await LikeService.deleteOne(id);
    if (status) dispatch({ type: "LIKE_DELETED", payload: id });
  };

  return (
    <LikeContext.Provider
      value={{ ...state, likes, setLikes, deleteLike, createLike }}
    >
      {children}
    </LikeContext.Provider>
  );
};
