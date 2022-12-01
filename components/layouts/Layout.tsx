import { FC, ReactNode } from "react";
import { NavBar } from "../ui";

interface Props {
  children?: ReactNode;
}

export const Layout: FC<Props> = ({children}) => {
  return (
    <div>
      <NavBar/>
      {children}
    </div>
  );
};
