import { createContext } from "react";
import { User } from "../../interfaces";

interface ContextProps {
  user: User;
  getUser: (id: string) => Promise<void>;
}
export const UserContext = createContext({} as ContextProps);
