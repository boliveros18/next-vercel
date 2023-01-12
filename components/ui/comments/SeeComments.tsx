import { FC, useContext, ReactNode, useState } from "react";
import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import { CommentForm, StyledInputComment } from "../styled/CommentForm";
import { AuthContext } from "../../../context/auth";
import { CommentContext } from "../../../context/comment";
import { UIContext } from "../../../context/ui";
import { WindowSize } from "../../../utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { CommentUi } from './CommentUi';

interface Props {
  children?: ReactNode;
  parent_id: string
}

export const SeeComments: FC<Props> = ({ children, parent_id }) => {
  const { onFocus, setOnFocus } = useContext(UIContext);
  const { comments } = useContext(CommentContext);
  const { isLoggedIn } = useContext(AuthContext);
  const height = WindowSize().height;
  const [toogle, setToogle] = useState(true);
  const handleComments = () => {
    setToogle(!toogle);
  };

  return (
    <div>
      {toogle && children}
      <Accordion elevation={0} disableGutters={true}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: "500",
              width: "100%",
              height: "100%",
            }}
            onClick={handleComments}
          >
            {!toogle ? (
              <IconButton
                aria-label="back"
                sx={{
                  color: "black",
                  paddingLeft: 2,
                }}
                onClick={handleComments}
              >
                <ArrowBackIosIcon />
              </IconButton>
            ) : (
              "See the " + comments?.filter(i=>i.parent_id===parent_id).length + " comments"
            )}
          </Typography>
        </AccordionSummary>
        <Box sx={{ height: height - 235, overflow: "auto" }}>
              <AccordionDetails
                sx={{ marginBottom: -6, marginTop: -2 }}
              >
               <CommentUi parent_id={parent_id} />
              </AccordionDetails>        
        </Box>
      </Accordion>
      {isLoggedIn && (
        <Toolbar sx={{ width: "100%", mt: -2 }}>
          <Avatar
            alt="name"
            src="/static/images/avatar/2.jpg"
            sx={{ marginRight: 1 }}
          />
          <CommentForm style={{ color: "black" }}>
            <StyledInputComment
              placeholder="Add a comment…"
              inputProps={{ "aria-label": "comment" }}
              inputRef={(input) => onFocus && input?.focus()}
              onBlur={() => setOnFocus(false)}         
            />
          </CommentForm>
          <IconButton
            aria-label="settings"
            style={{
              color: "black",
              marginLeft: 8,
              marginRight: -6,
            }}
          >
            <Typography
              sx={{ fontSize: 15, textTransform: "capitalize" }}
              variant="subtitle2"
            >
              Post
            </Typography>
          </IconButton>
        </Toolbar>
      )}
    </div>
  );
};
