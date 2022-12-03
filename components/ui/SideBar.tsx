import { FC, ReactNode } from "react";
import * as React from "react";
import {Divider, Paper, MenuList, MenuItem, ListItemText, ListItemIcon, Typography  } from "@mui/material";
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';

interface Props {
  children?: ReactNode;
}

export const SideBar: FC<Props> = ({}) => {
  return (
    <Paper sx={{ width: 290, height: "90vh", maxWidth: "100%" }}>
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
          <ListItemText sx={{ ml: 2 }}>Trends | <span style={{ color: 'gray'}}>Surgeries</span></ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AccessibilityNewOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2 }}>Principal | <span style={{ color: 'gray'}}>Treatment</span></ListItemText>
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
      <Typography style={{marginTop: '38vh'}} align="center">Powered by Stripe.com</Typography>
      <Typography align="center">Super Medical group (c) 2022</Typography>
    </Paper>
  );
};
