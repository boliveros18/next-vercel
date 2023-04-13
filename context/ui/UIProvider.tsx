import { FC, ReactNode, useReducer, useCallback } from "react";
import { ImageService } from "../../services";
import { UIContext, uiReducer } from "./";
import { tagger } from "./UIContext";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  sidemenuOpen: boolean;
  loading: boolean;
  onFocus: boolean;
  tag: tagger;
  value: string;
  onCancel: boolean;
  country: string;
  state: string;
  city: string;
}

const INITIAL_STATE: State = {
  sidemenuOpen: false,
  loading: false,
  onFocus: false,
  tag: { user_name: "", user_id: "" },
  value: "",
  onCancel: false,
  country: "",
  state: "",
  city: ""
};

export const UIProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI_OPEN_SIDEBAR" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "UI_CLOSE_SIDEBAR" });
  };

  const setLoading = useCallback((payload: boolean) => {
    dispatch({ type: "SET_LOADING", payload });
  }, []);

  const setOnFocus = useCallback((payload: boolean) => {
    dispatch({ type: "SET_ONFOCUS", payload });
  }, []);

  const setTag = useCallback((payload: tagger) => {
    dispatch({ type: "SET_TAG", payload });
  }, []);

  const setValue = useCallback((payload: string) => {
    dispatch({ type: "SET_VALUE", payload });
  }, []);

  const setOnCancel = useCallback((payload: boolean) => {
    dispatch({ type: "SET_ONCANCEL", payload });
  }, []);

  const setCountry = useCallback((payload: string) => {
    dispatch({ type: "SET_COUNTRY", payload });
  }, []);

  const setState = useCallback((payload: string) => {
    dispatch({ type: "SET_STATE", payload });
  }, []);

  const setCity = useCallback((payload: string) => {
    dispatch({ type: "SET_CITY", payload });
  }, []);

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setLoading,
        setOnFocus,
        setTag,
        setValue,
        setOnCancel,
        setCountry,
        setState,
        setCity
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
