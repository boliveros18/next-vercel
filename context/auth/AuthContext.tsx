import { createContext } from "react";
import { User } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: User;
  setUser: (payload: User) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    photo: string,
    role: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  logout: () => void;
  getUser: (id: string) => Promise<void>;
  updateUser: (id: string, payload: User) => Promise<{ hasError: boolean; message?: string }>;
  deleteUser: (id: string) => Promise<void>;
}

export const AuthContext = createContext({} as ContextProps);
