import { FC, ReactNode, SyntheticEvent, useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { WindowSize } from "../../../utils";

interface Props {
  children?: ReactNode;
}

export const RightBar: FC<Props> = ({ children }) => {
  const size = WindowSize();
  const [value, setValue] = useState("recents");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: size.height - 130,
        }}
      >
        {children}
      </Paper>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          bottom: 0,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Cart"
            icon={<AddShoppingCartIcon />}
            sx={{ color: "#c4bebe" }}
          />
          <BottomNavigationAction
            label="Chats"
            icon={<ChatBubbleOutlineIcon />}
            sx={{ color: "#c4bebe" }}
          />
          <BottomNavigationAction
            label="People"
            icon={<PeopleAltIcon />}
            sx={{ color: "#c4bebe" }}
          />
          <BottomNavigationAction
            label="Notifications"
            icon={<NotificationsNoneIcon />}
            sx={{ color: "#c4bebe" }}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};
