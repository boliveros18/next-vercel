import { State } from "./";

type Action =  "LIKE_CREATE" | "LIKE_DELETED"  ;
type ActionType = { type: Action; payload?: any };

export const likesReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "LIKE_CREATE":
      return { ...state, like: action.payload };
    case "LIKE_DELETED":
      const filtered = state.likes.filter((item) => item._id !== action.payload);
      return { ...state, likes: filtered };
    default:
      return state;
  }
};
