import { FC, ReactNode, useReducer } from "react";
import { UserContext, userReducer } from "./";
import { User } from "../../interfaces";
import { UserService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  user: User;
}

const INITIAL_STATE: State = {
  user: {} as User,
};

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const getUser = async (id: string) => {
    const data = await UserService.getUser(id);
    dispatch({ type: "GET_USER", payload: id });
    return data;
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
