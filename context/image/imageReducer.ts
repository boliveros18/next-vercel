import { State } from "./";

type Action =
  | "CREATE_IMAGE"
  | "UPDATE_IMAGE";
type ActionType = { type: Action; payload?: any };

export const imageReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "CREATE_IMAGE":
      return { ...state, image: action.payload };
    case "UPDATE_IMAGE":
      return { ...state, image: action.payload };
    default:
      return state;
  }
};
