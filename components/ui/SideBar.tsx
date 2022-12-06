import { FC, ReactNode } from "react";
import * as React from "react";
import {
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box
} from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import { WindowSize} from "../../utils/useWindowSize"
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

export const SideBar: FC<Props> = ({}) => {
  const size = WindowSize()

  return (
    <>
    <Paper sx={{ width: 290, height: size.height - 130, maxWidth: "100%"}} elevation={0}>
       <MenuList>
        <MenuItem>
          <ListItemIcon>
            <HomeOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2 }}>Home</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <MedicalServicesOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2 }}>Treatment & Surgeries</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TrendingUpOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2 }}>
            Trends | <span style={{ color: "gray" }}>Surgeries</span>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AccessibilityNewOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2 }}>
            Principal | <span style={{ color: "gray" }}>Treatment</span>
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AirplanemodeActiveOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2 }}>Tickets</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <RoomServiceOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2 }}>Hotel reservation</ListItemText>
        </MenuItem>
      </MenuList>
       <Box sx={{ flexGrow: 1 }} />
    </Paper>
          <Typography sx={{ fontSize: 13 }} align="center">
          Super Medical group -{" "}
          <Link href="./privacynotice">
            <a style={{ textDecoration: "none", fontWeight: "500", color: "#001B87" }}>
              Privacy notice
            </a>
          </Link>
          <br/>
          Powered by Stripe.com
          <br/>
          <Link href="./conditionuse">
            <a style={{ textDecoration: "none", fontWeight: "500", color: "#001B87"}}>
              Condition of Use
            </a>
          </Link>{" "}
          Copyright (c) 2022
        </Typography>

        </>
  );
};
