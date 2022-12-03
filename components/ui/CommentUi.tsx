import { FC } from "react";
import * as React from "react";
import { Box, Card, CardHeader, Avatar, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CardDetailUi, CommentInteractions } from "./";

interface Props {
  author: string;
  comment: any;
  photo: string;
  date: string;
  likes: string;
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
            avatar={
              <Avatar alt="Remy Sharp" src={photo} />
            }
            action={
              <IconButton
                aria-label="like"
                style={{
                  color: "black", marginRight: -10
                }}
              >
                { like ?   <CheckCircleIcon fontSize="small" sx={{color:'blue'}} /> : <CheckCircleOutlineIcon fontSize="small" /> }
              </IconButton>
            }
            title={<CardDetailUi author={author} comment={comment}/>}
            subheader={<CommentInteractions date={date} likes={likes}/>}
          />
        </Card>
      </Box>
  );
};
