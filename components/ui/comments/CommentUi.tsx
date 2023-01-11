import { FC, useContext, useState, useEffect } from "react";
import * as React from "react";
import { CommentContext } from "../../../context/comment";
import { AuthContext } from "../../../context/auth";
import { Clinic } from "../../../interfaces";
import { AnswerUi, ItemRefUi } from "../";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getFormatDistanceToNow } from "../../../utils";

interface Props {
  parent_id: string;
}

export const CommentUi: FC<Props> = ({ parent_id }) => {
  const [toogle, setToogle] = useState(false);
  const { comment } = useContext(CommentContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({} as Clinic);

  const handleAnswers = () => {
    setToogle(!toogle);
  };

  const answers = comment.length;

  const handleLike = async () => {
    if (
      clinics[0]?.comments[id].likes.filter((i) => i.user_id === user?._id)
        .length === 1
    ) {
      inputs.comments[id].likes[index].approved =
        !clinics[0]?.comments[id].likes[index].approved;
      setInputs({ ...inputs });
      await updateClinic(clinics[0]._id, inputs);
    } else {
      inputs.comments[id].likes.push({
        user_id: user?._id || "",
        user_name: user?.name || "",
        approved: true,
      });
      setInputs({ ...inputs });
      await updateClinic(clinics[0]?._id, inputs);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Card sx={{ maxWidth: "100%" }} elevation={0}>
        <CardHeader
          avatar={
            <Avatar
              alt={clinics[0]?.comments[id].user_name}
              src={clinics[0]?.comments[id].user_photo}
            />
          }
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
              {clinics[0]?.comments[id].likes[index]?.approved && isLoggedIn ? (
                <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
              ) : (
                <CheckCircleOutlineIcon sx={{ fontSize: "15px" }} />
              )}
            </IconButton>
          }
          title={
            <ItemRefUi
              author={clinics[0]?.comments[id].user_name}
              link={`./api/user/${clinics[0]?.comments[id].user_id}`}
              tag={false}
            >
              {clinics[0]?.comments[id].description}
            </ItemRefUi>
          }
          subheader={
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <span>
                  {getFormatDistanceToNow(clinics[0]?.comments[id].createdAt)}
                </span>
              </Grid>
              <Grid item xs={4}>
                <span>
                  {
                    clinics[0]?.comments[id].likes.filter(
                      (i) => i.approved === true
                    ).length
                  }{" "}
                  Likes
                </span>
              </Grid>
              <Grid item xs={2}>
                {isLoggedIn && (
                  <a style={{ fontWeight: "500", cursor: "pointer" }}>Answer</a>
                )}
              </Grid>
            </Grid>
          }
        />
      </Card>
      <Box
        sx={{
          maxWidth: "100%",
          mt: -2,
          mb: 2,
          ml: 6,
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {answers > 0 ? (
          <Divider textAlign="right" sx={{ width: "30%" }}>
            <a
              style={{ fontWeight: "500", cursor: "pointer", color: "gray" }}
              onClick={handleAnswers}
            >
              {!toogle
                ? "See " + answers + (answers > 1 ? " answers" : " answer")
                : "Hide answers"}
            </a>
          </Divider>
        ) : null}
      </Box>
      {toogle && clinics[0]?.comments[id]?.answers.length > 0 ? (
        clinics[0]?.comments[id]?.answers.map((item, Oid) => (
          <Box key={item.user_id}>
            <AnswerUi id={id} Oid={Oid} />
          </Box>
        ))
      ) : (
        <div />
      )}
    </Box>
  );
};
