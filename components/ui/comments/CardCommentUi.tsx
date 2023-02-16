import { FC, useContext } from "react";
import { LikeContext } from "../../../context/like";
import { AuthContext } from "../../../context/auth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getFormatDistanceToNow } from "../../../utils";
import { Card, CardHeader, Avatar, IconButton, Grid } from "@mui/material";
import Link from "next/link";
import { Comment } from "../../../interfaces";
import { EditCommentUi } from "../comments/EditCommentUi";

interface Props {
  item: Comment;
  parent_id?: string;
}

export const CardCommentUi: FC<Props> = ({ item, parent_id }) => {
  const { likes, createLike, deleteLike } = useContext(LikeContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleLike = (id: string) => {
    if (likes.filter((i) => i.parent_id === id).length === 1) {
      const i = likes.findIndex((i) => i.parent_id === id);
      deleteLike(likes[i]._id || "");
      likes.splice(i, 1);
    } else {
      createLike({
        user_id: user?._id || "",
        user_name: user?.name || "",
        parent_id: id || "",
      });
    }
  };

  return (
    <Card sx={{ maxWidth: "100%" }} elevation={0}>
      <CardHeader
        avatar={<Avatar alt={item.user_name} src={item.user_photo} />}
        title={
          <Grid container>
            <Grid item xs={10} sm={10} md={10}>
              <Link href={`./user/${item.user_id}`}>
                <a
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  {item.user_name + " "}
                </a>
              </Link>
              <span>
                <Link href={`./user/${item.user_tag_id}`}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#001B87",
                    }}
                  >
                    {item.user_tag_name}
                  </a>
                </Link>
                {" " + item.description}
              </span>
            </Grid>
            <Grid item xs={1} sm={1} md={1} sx={{ mt: -0.5 }}>
              <IconButton
                disabled={!isLoggedIn}
                aria-label="like"
                style={{
                  color: "black",
                }}
                onClick={() => handleLike(item._id || "")}
              >
                {likes.filter((i) => i.parent_id === item._id).length === 1 &&
                isLoggedIn ? (
                  <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
                ) : (
                  <CheckCircleOutlineIcon sx={{ fontSize: "15px" }} />
                )}
              </IconButton>
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              {(user?._id === item.user_id &&
                item.parent_id === parent_id &&
                isLoggedIn) ||
              user?.role === "admin" ||
              user?._id === item.user_id ? (
                <EditCommentUi item={item} />
              ) : null}
            </Grid>
          </Grid>
        }
        subheader={
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <span>{getFormatDistanceToNow(item.createdAt)}</span>
            </Grid>
            <Grid item xs={4}>
              <span>
                {likes?.filter((i) => i.parent_id === item._id)?.length + " "}
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
  );
};
