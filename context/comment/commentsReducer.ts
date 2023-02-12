import { State } from "./";

type Action = "COMMENT_GET";
type ActionType = { type: Action; payload?: any };

export const commentsReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "COMMENT_GET":
      return { ...state, comment: action.payload };
    default:
      return state;
  }
};
