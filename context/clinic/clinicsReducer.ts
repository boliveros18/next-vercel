import { State } from "./";

type Action = "SET_PRINCIPAL" | "CLINIC_UPDATED" | "CLINIC_GET";
type ActionType = { type: Action; payload?: any };

export const clinicsReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_PRINCIPAL":
      return { ...state, principal: action.payload };
    case "CLINIC_UPDATED":
      return { ...state, clinic: action.payload };
    case "CLINIC_GET":
      return { ...state, clinic: action.payload };
    default:
      return state;
  }
};
