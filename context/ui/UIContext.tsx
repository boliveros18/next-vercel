import { createContext, Dispatch, SetStateAction } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  onFocus: boolean;
  setOnFocus: Dispatch<SetStateAction<boolean>>;
}

export const UIContext = createContext({} as ContextProps);
