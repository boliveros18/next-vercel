import { FC, useContext, useState } from "react";
import * as React from "react";
import { CommentContext } from "../../../context/comment";
import { LikeContext } from "../../../context/like";
import { AnswerContext } from "../../../context/answer";
import { AuthContext } from "../../../context/auth";
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
  const [ind, setInd] = useState<number>(0);
  const [toogle, setToogle] = useState(false);
  const { comments } = useContext(CommentContext);
  const { answers } = useContext(AnswerContext);
  const { likes, createLike, deleteLike } = useContext(LikeContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleAnswers = () => {
    setToogle(!toogle);
  };

  const getIndex = (ind: number) => {
    setInd(ind);
  };

  const handleLike = () => {
    const index = likes?.findIndex(
      (i) =>
        i.parent_id ===
          comments?.filter((i) => i.parent_id === parent_id)[ind]?._id &&
        i.user_id === user?._id
    );
    console.log(index)
    if (index > -1) {
      deleteLike(likes[index]?._id || "");
    } else {
      createLike({
        user_id: user?._id || "",
        user_name: user?.name || "",
        parent_id:
          comments?.filter((i) => i.parent_id === parent_id)[ind]?._id || "",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      {comments?.map((i) => i.parent_id === parent_id).length > 0 ? (
        comments
          ?.filter((i) => i.parent_id === parent_id)
          .map((item, index) => (
            <div
              key={index}
              style={{ marginBottom: -6, marginTop: -2 }}
              onChange={() => getIndex(index || 0)}
            >
              <Card sx={{ maxWidth: "100%" }} elevation={0}>
                <CardHeader
                  avatar={<Avatar alt={item.user_name} src={item.user_photo} />}
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
                      {likes?.filter(
                        (i) =>
                          i.user_id === user?._id && i.parent_id === parent_id
                      )?.length === 1 && isLoggedIn ? (
                        <CheckCircleIcon
                          sx={{ color: "blue", fontSize: "15px" }}
                        />
                      ) : (
                        <CheckCircleOutlineIcon sx={{ fontSize: "15px" }} />
                      )}
                    </IconButton>
                  }
                  title={
                    <ItemRefUi
                      author={item.user_name}
                      link={`./api/user/${item.user_id}`}
                      tag={false}
                    >
                      {item.description}
                    </ItemRefUi>
                  }
                  subheader={
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <span>{getFormatDistanceToNow(item.createdAt)}</span>
                      </Grid>
                      <Grid item xs={4}>
                        <span>
                          {likes?.filter((i) => i.parent_id === parent_id)
                            ?.length + " "}
                          Likes
                        </span>
                      </Grid>
                      <Grid item xs={2}>
                        {isLoggedIn && (
                          <a style={{ fontWeight: "500", cursor: "pointer" }}>
                            Answer
                          </a>
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
                {answers?.filter(
                  (i) =>
                    i.parent_id ===
                    comments?.filter((i) => i.parent_id === parent_id)[index]
                      ?._id
                ).length > 0 ? (
                  <Divider textAlign="right" sx={{ width: "30%" }}>
                    <a
                      style={{
                        fontWeight: "500",
                        cursor: "pointer",
                        color: "gray",
                      }}
                      onClick={handleAnswers}
                    >
                      {!toogle
                        ? "See " +
                          answers?.filter(
                            (i) =>
                              i.parent_id ===
                              comments?.filter(
                                (i) => i.parent_id === parent_id
                              )[index]?._id
                          ).length +
                          (answers?.filter(
                            (i) =>
                              i.parent_id ===
                              comments?.filter(
                                (i) => i.parent_id === parent_id
                              )[index]?._id
                          ).length > 1
                            ? " answers"
                            : " answer")
                        : "Hide answers"}
                    </a>
                  </Divider>
                ) : null}
              </Box>
              {toogle &&
              answers?.filter(
                (i) =>
                  i.parent_id ===
                  comments?.filter((i) => i.parent_id === parent_id)[index]?._id
              ).length ? (
                <AnswerUi
                  parent_id={
                    comments?.filter((i) => i.parent_id === parent_id)[index]
                      ?._id || ""
                  }
                />
              ) : (
                <div />
              )}
            </div>
          ))
      ) : (
        <div />
      )}
    </Box>
  );
};
