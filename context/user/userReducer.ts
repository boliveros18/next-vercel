import { State } from "./";

type Action =
  | "GET_USER";
type ActionType = { type: Action; payload?: any };

export const userReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
