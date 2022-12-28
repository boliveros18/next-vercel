import { FC } from "react";
import * as React from "react";
import { Box, Card, CardHeader, Avatar, IconButton, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardDetailUi } from "../";

interface Props {
  author: string;
  comment: any;
  photo: string;
  date: string;
  likes: number;
  like: boolean;
  answers?: [];
}

export const CommentUi: FC<Props> = ({
  author,
  comment,
  photo,
  likes,
  like,
  date,
  answers,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        maxHeight: 85,
        bgcolor: "background.paper",
        overflow: "auto",
      }}
    >
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          avatar={<Avatar alt="Remy Sharp" src={photo} />}
          action={
            <IconButton
              aria-label="like"
              style={{
                color: "black",
                marginRight: -10,
              }}
            >
              {like ? (
                <CheckCircleIcon sx={{ color: "blue",fontSize: "15px"  }} />
              ) : (
                <CheckCircleOutlineIcon sx={{fontSize: "15px"  }} />
              )}
            </IconButton>
          }
          title={<CardDetailUi author={author} comment={comment} />}
          subheader={
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <span>{date}</span>
              </Grid>
              <Grid item xs={3}>
                <span>{likes} Likes</span>
              </Grid>
              <Grid item xs={2}>
                <a style={{ fontWeight: "500", cursor: "pointer" }}>Answer</a>
              </Grid>
            </Grid>
          }
        />
      </Card>
    </Box>
  );
};
