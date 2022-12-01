import { FC, ReactNode } from "react";
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import HealthIcon from '@mui/icons-material/HealthAndSafetyOutlined';


interface Props {
  children?: ReactNode;
}

export const SideBar: FC<Props> = ({}) => {
  return (
    <Paper sx={{ width: 290, height: '90vh', maxWidth: '100%'}} >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <HealthIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2}}>Home</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText  sx={{ ml: 2}}>Copy</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText  sx={{ ml: 2}}>Paste</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText  sx={{ ml: 2}}>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};