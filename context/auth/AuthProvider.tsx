import { FC, useReducer, useEffect, ReactNode } from "react";
import { AuthContext, authReducer } from "./";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";
import axios from "axios";

import { entriesApi } from "../../apis";
import { AuthService } from "../../services";
import { User } from "../../interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
}

interface Props {
  children?: ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const { data, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "AUTH_LOGIN", payload: data?.user as User });
    }
  }, [status, data]);

  const loginUser = async (email: string, password: string) => {
    const { status, data } = await AuthService.login(email, password);
    const { token, user } = data;
    Cookies.set("token", token);
    if (status) dispatch({ type: "AUTH_LOGIN", payload: user });
    return data;
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await entriesApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "AUTH_LOGIN", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "Failed to create user - try again",
      };
    }
  };

  const logout = () => {
    Cookies.remove("cart");
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
