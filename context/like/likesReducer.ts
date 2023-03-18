import { State } from "./";

type Action = "DELETE_LIKE" | "ADD_LIKES";
type ActionType = { type: Action; payload?: any };

export const likesReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "DELETE_LIKE":
      const filtered = state.likes.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, likes: filtered };
    case "ADD_LIKES":
      const attach = state.likes.concat(action.payload);
      const likes = attach.filter(
        (object, index) =>
          attach.findIndex((item) => item._id === object._id) === index
      );
      return { ...state, likes: likes };
    default:
      return state;
  }
};
