import { FC, ReactNode, useReducer, useCallback } from "react";
import { ImageContext, imageReducer } from "./";
import { Image } from "../../interfaces";
import { Pagination } from "./ImageContext";
import { ImageService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  images: Image[];
  image: Image;
}

const INITIAL_STATE: State = {
  images: [],
  image: {} as Image
};

export const ImageProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, INITIAL_STATE);

  const setImage = useCallback(async (payload: Image) => {
    dispatch({ type: "UPDATE_IMAGE", payload: payload });
  }, []);

  const createImage = async (payload: Image) => {
    const data = await ImageService.createOne(payload);
    dispatch({ type: "UPDATE_IMAGE", payload: data });
    return data;
  };

  const updateImage = async (id: string, payload: Image) => {
    const data = await ImageService.updateOne(id, payload);
    dispatch({ type: "UPDATE_IMAGE", payload: data });
    return data;
  };

  const getImageByParentId = useCallback(async (
    parent_id: string
  ) => {
    const data: Image[] = await ImageService.getImageByParentId(
      parent_id
    );
    dispatch({ type: "UPDATE_IMAGE", payload: data });
  },[]);

  return (
    <ImageContext.Provider
      value={{
        ...state,
        setImage,
        createImage,
        updateImage,
        getImageByParentId
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
