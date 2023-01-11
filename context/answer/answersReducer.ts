import { State } from "./";

type Action = "ANSWER_UPDATED";
type ActionType = { type: Action; payload?: any };

export const answersReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "ANSWER_UPDATED":
      return { ...state, answer: action.payload };
    default:
      return state;
  }
};
