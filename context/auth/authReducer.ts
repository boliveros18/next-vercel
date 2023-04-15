import { State } from "./";
import { User } from "../../interfaces";

type ActionType =
  | { type: "AUTH_LOGIN" }
  | { type: "AUTH_LOGOUT" }
  | { type: "GET_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "DELETE_USER"; payload: any };

export const authReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    case "GET_USER":
      return { ...state, user: action.payload };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "DELETE_USER":
      const filtered = state.users.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, users: filtered };
    default:
      return state;
  }
};
