import { FC } from "react";
import * as React from "react";
import { Grid } from "@mui/material";

interface Props {
  date: string;
  likes: string;
}

export const CommentInteractions: FC<Props> = ({ date, likes }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <span>{date}</span>
      </Grid>
      <Grid item xs={3}>
        <span>{likes} Likes</span>
      </Grid>
      <Grid item xs={3}>
        <a style={{ fontWeight: "500", cursor: "pointer" }}>Answer</a>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};
