import { State } from ".";

type Action = "CERTIFICATION_UPDATED";
type ActionType = { type: Action; payload?: any };

export const certificationsReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "CERTIFICATION_UPDATED":
      return { ...state, certification: action.payload };
    default:
      return state;
  }
};
