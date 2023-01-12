import { FC, useContext } from "react";
import * as React from "react";

import { AuthContext } from "../../../context/auth";
import { LikeContext } from "../../../context/like";
import { AnswerContext } from "../../../context/answer";
import { Card, CardHeader, Avatar, IconButton, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardDetailUi, ItemRefUi } from "../";
import { getFormatDistanceToNow } from "../../../utils";

interface Props {
  parent_id: string;
}

export const AnswerUi: FC<Props> = ({ parent_id }) => {
  const { likes, createLike, deleteLike } = useContext(LikeContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const { answers } = useContext(AnswerContext);

  const handleLike = () => {
    const index = likes?.findIndex(
      (i) => i.parent_id === parent_id && i.user_id === user?._id
    );
    if (index > -1) {
      deleteLike(likes[index]?._id || "");
    } else {
      createLike({
        user_id: user?._id || "",
        user_name: user?.name || "",
        parent_id: parent_id,
      });
    }
  };

  return (
    <>
      {answers
        ?.filter((i) => i.parent_id === parent_id)
        .map((item, index) => (
          <Card
            key={index}
            sx={{ maxWidth: "100%", ml: 4, mt: -3 }}
            elevation={0}
          >
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
                    (i) => i.user_id === user?._id && i.parent_id === parent_id
                  )?.length === 1 && isLoggedIn ? (
                    <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
                  ) : (
                    <CheckCircleOutlineIcon sx={{ fontSize: "15px" }} />
                  )}
                </IconButton>
              }
              title={
                <CardDetailUi
                  author={item.user_name}
                  link={`./api/user/${item.user_id}`}
                  comment={
                    <ItemRefUi
                      author={
                        "@" +
                        item.user_tag_name +
                        " "
                      }
                      link={`./api/user/${item.user_tag_id}`}
                      tag={true}
                    >
                      {item.description}
                    </ItemRefUi>
                  }
                />
              }
              subheader={
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <span>
                      {getFormatDistanceToNow(
                        item.createdAt
                      )}
                    </span>
                  </Grid>
                  <Grid item xs={5}>
                    <span>
                      {
                       likes?.filter(
                        (i) =>
                           i.parent_id === parent_id
                      )?.length
                      }{" "}
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
        ))}
    </>
  );
};
