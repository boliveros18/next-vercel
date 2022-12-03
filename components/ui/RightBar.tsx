import { FC, ReactNode } from "react";
import * as React from "react";
import {Paper, BottomNavigation, BottomNavigationAction} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface Props {
  children?: ReactNode;
}

export const RightBar: FC<Props> = ({ children }) => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: '79vh'
        }}
      >
        {children}
      </Paper>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Cart" icon={<AddShoppingCartIcon />} />
          <BottomNavigationAction
            label="Chats"
            icon={<ChatBubbleOutlineIcon />}
          />
          <BottomNavigationAction label="People" icon={<PeopleAltIcon />} />
          <BottomNavigationAction
            label="Notifications"
            icon={<NotificationsNoneIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};
