import { State } from "./";
import { User } from "../../interfaces";

type ActionType =
  | { type: "AUTH_LOGIN"; payload: User }
  | { type: "AUTH_LOGOUT" };

export const authReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case "AUTH_LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
};
