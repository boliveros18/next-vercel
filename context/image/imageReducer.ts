import { State } from "./";

type Action = "UPDATE_IMAGE" | "ADD_IMAGES";
type ActionType = { type: Action; payload?: any };

export const imageReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "UPDATE_IMAGE":
      return { ...state, image: action.payload };
    case "ADD_IMAGES":
      const attach = state.images.concat(action.payload);
      const images = attach.filter(
        (object, index) =>
          attach.findIndex((item) => item._id === object._id) === index
      );
      return { ...state, images: images };
    default:
      return state;
  }
};
