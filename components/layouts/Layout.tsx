import { FC, ReactNode } from "react";
import { BottomBar, NavBar, SideBar } from "../ui";

interface Props {
  children?: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <SideBar keepOpen={false} />
      {children}
      <BottomBar />
    </div>
  );
};
