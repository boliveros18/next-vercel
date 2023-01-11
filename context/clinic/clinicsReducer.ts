import { State } from "./";

type Action = "CLINIC_UPDATED";
type ActionType = { type: Action; payload?: any };

export const clinicsReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "CLINIC_UPDATED":
      return { ...state, clinic: action.payload };
    default:
      return state;
  }
};
