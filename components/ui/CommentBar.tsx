import { FC } from "react";
import * as React from "react";
import { Avatar, Toolbar, IconButton, Typography } from "@mui/material";
import { CommentForm, StyledInputComment } from "./CommentForm";

interface Props {
  name: string;
  avatar: string;
}

export const CommentBar: FC<Props> = ({ name, avatar }) => {
  return (
    <Toolbar sx={{ marginTop: -2, width: "100%" }}>
      <Avatar
        alt={name}
        src="/static/images/avatar/2.jpg"
        sx={{ marginRight: 1 }}
      />
      <CommentForm style={{ color: "black" }}>
        <StyledInputComment
          placeholder="Add a comment…"
          inputProps={{ "aria-label": "comment" }}
        />
      </CommentForm>
      <IconButton
          aria-label="settings"
          style={{
            color: "black",
            marginLeft: 8,
            marginRight:-6
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
  );
};
