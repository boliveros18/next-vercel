import { FC, ReactNode, useReducer, useState } from "react";
import { LikeContext, likesReducer } from "./";
import { Like } from "../../interfaces";
import { LikeService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  like: Like;
}

const INITIAL_STATE: State = {
  like: {} as Like,
};

export const LikeProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(likesReducer, INITIAL_STATE);

  const [likes, setLikes] = useState<Like[]>([]);
  const [length, setLength] = useState<number>(0);

  const createLike = async (payload: Like) => {
    const data = await LikeService.createOne(payload);
    dispatch({ type: "LIKE_GET", payload: data });
    setLikes([...likes, data])
    return data
  };

  const getLike = async (id: string) => {
    const data = await LikeService.getLike(id);
    dispatch({ type: "LIKE_GET", payload: data });
    return data;
  };

  const deleteLike = async (id: string) => {
    const data = await LikeService.deleteOne(id);
    dispatch({ type: "LIKE_GET", payload: id });
    return data
  };

  return (
    <LikeContext.Provider
      value={{ ...state, createLike, getLike, deleteLike, length, setLength, setLikes, likes }}
    >
      {children}
    </LikeContext.Provider>
  );
};
