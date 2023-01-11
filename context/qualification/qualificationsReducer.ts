import { State } from "./";

type Action = "QUALIFICATION_UPDATED";
type ActionType = { type: Action; payload?: any };

export const qualificationsReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "QUALIFICATION_UPDATED":
      return { ...state, qualification: action.payload };
    default:
      return state;
  }
};
