import { FC, ReactNode, useReducer, useState } from "react";
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

  const [principalLike, setPrincipalLike] = useState<Like[]>([]);
  const [likeLength, setLikeLength] = useState<number>(0);

  const getLikes = async () => {
    const data = await LikeService.getLikes();
    dispatch({ type: "LIKE_LIST", payload: data });
  };

  const createLike = async (payload: Like) => {
    const data = await LikeService.createOne(payload);
    dispatch({ type: "LIKE_CREATE", payload: data });
    setPrincipalLike([data])
    return data
  };

  const getLike = async (id: string) => {
    const data = await LikeService.getLike(id);
    dispatch({ type: "LIKE_GET", payload: data });
    return data;
  };

  const deleteLike = async (id: string) => {
    const data = await LikeService.deleteOne(id);
    dispatch({ type: "LIKE_DELETED", payload: id });
    return data
  };

  return (
    <LikeContext.Provider
      value={{ ...state, createLike, getLikes, getLike, deleteLike, principalLike, setPrincipalLike, likeLength, setLikeLength }}
    >
      {children}
    </LikeContext.Provider>
  );
};
