import { UIState } from "./";

type UIActionType = { type: "UI_OPEN_SIDEBAR" } | { type: "UI-CLOSE_SIDEBAR" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI_OPEN_SIDEBAR":
      return {
        ...state,
        sidemenuOpen: true,
      };
    case "UI-CLOSE_SIDEBAR":
      return {
        ...state,
        sidemenuOpen: false,
      };
    default:
      return state;
  }
};
