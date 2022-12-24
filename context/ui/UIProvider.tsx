import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { UIContext, uiReducer } from "./";

interface ProviderProps {
  children: ReactNode;
}

export interface UIState {
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
};

export const UIProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const [loading, setLoading] = useState<boolean>(false);

  const openSideMenu = () => {
    dispatch({ type: "UI-Open Sidebar" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "UI-Close Sidebar" });
  };
   
  useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <UIContext.Provider value={{ ...state, openSideMenu, closeSideMenu, loading, setLoading }}>
      {children}
    </UIContext.Provider>
  );
};
