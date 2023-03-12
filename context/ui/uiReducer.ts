import { State } from "./";

type Action = "UI_OPEN_SIDEBAR" | "UI_CLOSE_SIDEBAR" | "UI_RIGTHBAR";
type ActionType = { type: Action };

export const uiReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "UI_OPEN_SIDEBAR":
      return {
        ...state,
        sidemenuOpen: true,
      };
    case "UI_CLOSE_SIDEBAR":
      return {
        ...state,
        sidemenuOpen: false,
      };
    default:
      return state;
  }
};
