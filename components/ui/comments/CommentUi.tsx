import { FC, useContext, useState } from "react";
import * as React from "react";
import { ClinicContext } from "../../../context/clinic";
import { AuthContext } from "../../../context/auth";
import { Clinic, Comments, Likes } from "../../../interfaces";
import { Box, Card, CardHeader, Avatar, IconButton, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardDetailUi } from "../";

interface Props {
  author: string;
  comment: any;
  photo: string;
  date: string;
  like: number;
  answers?: [];
}

export const CommentUi: FC<Props> = ({
  author,
  comment,
  photo,
  like,
  date,
  answers,
}) => {

  const { clinics, updateClinic } = useContext(ClinicContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({} as Clinic);
  const [comments, setComments] = useState<Comments[]>(clinics[0]?.comments);
  const [likes, setLikes] = useState<Likes[]>(clinics[0]?.comments[0].likes);

  const index = clinics[0]?.comments?.map(i=>i.likes.findIndex(
    (i) => i.user_id === user?._id)
  )[0];

  const handleLike = () => {
    if (
      clinics[0]?.comments.map(i=>i.likes.filter((i) => i.user_id === user?._id))[0]
        .length === 1
    ) {
      comments[0].likes[index].approved = !comments[0].likes[index].approved;
      setInputs({ ...inputs,  comments });
      updateClinic(clinics[0]._id, inputs);
    } else {
      setLikes({ ...likes });
      comments[0].likes.push({
        user_id: user?._id || "",
        user_name: user?.name || "",
        approved: true,
      });
      setComments({ ...comments });
      setInputs({ ...inputs, comments });
      updateClinic(clinics[0]._id, inputs);
    }
  };

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
                disabled={!isLoggedIn}
                aria-label="like"
                style={{
                  color: "black",
                  marginRight: -10,
                }}
                onClick={handleLike}
              >
                {  clinics[0]?.comments[0].likes[index]?.approved && isLoggedIn ? (
                  <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
                ) : (
                  <CheckCircleOutlineIcon sx={{ fontSize: "15px" }} />
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
                  <span>{like} Likes</span>
                </Grid>
                <Grid item xs={2}>
                  {isLoggedIn && <a style={{ fontWeight: "500", cursor: "pointer"}}>Answer</a>}
                </Grid>
              </Grid>
            }
          />
        </Card>
      </Box>
  );
};
