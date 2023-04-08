import { State } from "./";

type Action = "UPDATE_IMAGE";
type ActionType = { type: Action; payload?: any };

export const imageReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "UPDATE_IMAGE":
      return { ...state, image: action.payload };
    default:
      return state;
  }
};
