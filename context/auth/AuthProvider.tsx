import { FC, useReducer, useEffect, ReactNode, useCallback } from "react";
import { AuthContext, authReducer } from "./";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";
import axios from "axios";

import { ApiClient } from "../../apis";
import { AuthService } from "../../services";
import { User } from "../../interfaces";

export interface State {
  isLoggedIn: boolean;
  users: User[];
  user?: User;
}

interface Props {
  children?: ReactNode;
}

const INITIAL_STATE: State = {
  isLoggedIn: false,
  users: [],
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const { data, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "AUTH_LOGIN", payload: data?.user as User });
    }
  }, [status, data]);

  const setUser = useCallback(async (payload: User) => {
    dispatch({ type: "UPDATE_USER", payload: payload });
  }, []);

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
    password: string,
    photo: string,
    role: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await ApiClient.post("/user/register", {
        name,
        email,
        password,
        photo,
        role,
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

  const getUser = useCallback(async (id: string) => {
    const data = await AuthService.getUser(id);
    dispatch({ type: "GET_USER", payload: data });
    return data;
  }, []);

  const updateUser = async (
    id: string,
    payload: User
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const data = await AuthService.updateOne(id, payload);
      dispatch({ type: "UPDATE_USER", payload: data });
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

  const deleteUser = async (id: string) => {
    const data = await AuthService.deleteOne(id);
    dispatch({ type: "DELETE_USER", payload: data });
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUser,
        loginUser,
        registerUser,
        logout,
        getUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
