import { State } from "./";

type Action =
  | "LIKE_GET"
type ActionType = { type: Action; payload?: any };

export const likesReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "LIKE_GET":
      return { ...state, like: action.payload };
    default:
      return state;
  }
};
