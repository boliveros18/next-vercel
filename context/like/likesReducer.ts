import { State } from "./";

type Action =
  | "LIKE_CREATE"
  | "LIKE_LIST"
  | "LIKE_GET"
  | "LIKE_DELETED"
type ActionType = { type: Action; payload?: any };

export const likesReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "LIKE_CREATE":
      return { ...state, like: action.payload };
    case "LIKE_LIST":
      return { ...state, likes: [...state.likes, action.payload] };
    case "LIKE_GET":
      return { ...state, like: action.payload };
    case "LIKE_DELETED":
      return { ...state, like: action.payload };
    default:
      return state;
  }
};
