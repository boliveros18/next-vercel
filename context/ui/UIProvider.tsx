import { FC, ReactNode, useReducer, useState, useMemo } from "react";
import { UIContext, uiReducer } from "./";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  sidemenuOpen: boolean;
}

const INITIAL_STATE: State = {
  sidemenuOpen: false,
};

export const UIProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);
  const [loading, setLoading] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const openSideMenu = () => {
    dispatch({ type: "UI_OPEN_SIDEBAR" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "UI_CLOSE_SIDEBAR" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        loading,
        setLoading,
        onFocus,
        setOnFocus,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
