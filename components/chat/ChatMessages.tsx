import { FC, ReactNode } from "react";
import * as React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemText,
  IconButton,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Search, SearchIconWrapper, StyledInputBase } from "../ui";

interface Props {
  children?: ReactNode;
}

export const ChatMessages: FC<Props> = ({}) => {
  return (
    <List sx={{ width: "100%", minWidth: 300, bgcolor: "background.paper" }}>
      <Grid container>
        <Grid item xs={11} sx={{ marginLeft: 3, marginRight:-5, marginTop: 2 }}>
        <Typography align="center" sx={{ fontWeight:'medium'}} >Chats</Typography>
        </Grid>
        <Grid item xs={1}>
        <IconButton
          aria-label="settings"
        >
          <CloseIcon />
        </IconButton>
        </Grid>
      </Grid>
      <ListItem>
        <ListItemText
          primary={
            <React.Fragment>
              <Search style={{ marginLeft: 0 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </React.Fragment>
          }
        />
      </ListItem>
      <div style={{ overflow: "auto", maxHeight: 415 }}>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline", fontWeight:'medium'}}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  Charles fernindan
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline"}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                 
                </Typography>
                <span style={{ fontWeight: '500', color:'black'}}>Neighborhood doing errands this </span> 0:13
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline", fontWeight:'medium'}}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  Charles fernindan
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline"}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  you:
                </Typography>
                {" your neighborhood doing errands thi…"}
                <span style={{ fontWeight: '500', color:'black'}}> </span>16:33
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline", fontWeight:'medium'}}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  Charles fernindan
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline"}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  you:
                </Typography>
                {" I'll be in your neighborhood …"}
                <span style={{ fontWeight: '500', color:'black'}}> </span>12:45
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline", fontWeight:'medium'}}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  Charles fernindan
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline"}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  you:
                </Typography>
                {" I'll be in your neighborhood doing errands this …"}
                <span style={{ fontWeight: '500', color:'black'}}> </span>Sat
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
    </List>
  );
};
