import { FC, ReactNode, useReducer, useEffect } from "react";
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

  const getLikes = async () => {
    const data   = await LikeService.getLikes()
    dispatch({ type: "LIKE_LIST", payload: data });
  };

  const createLike = async (payload: Like) => {
    const { status, data } = await LikeService.createOne(payload);
    if (status) dispatch({ type: "LIKE_CREATE", payload: data });
    getLikes()
  };

  const getLike = async (id: string) => {
    const { status, data } = await LikeService.getLike(id);
    if (status) dispatch({ type: "LIKE_GET", payload: data });
    return data;
  };

  const deleteLike = async (id: string) => {
    const { status } = await LikeService.deleteOne(id);
    if (status) dispatch({ type: "LIKE_DELETED", payload: id });
    getLikes()
  };

  useEffect(() => {
    getLikes();
  }, []);


  return (
    <LikeContext.Provider
      value={{ ...state, createLike, getLikes, getLike, deleteLike }}
    >
      {children}
    </LikeContext.Provider>
  );
};
