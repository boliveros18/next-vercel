import { FC, useContext, useState, ChangeEvent } from "react";
import { LikeContext } from "../../../context/like";
import { AuthContext } from "../../../context/auth";
import { UIContext } from "../../../context/ui";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getFormatDistanceToNow } from "../../../utils";
import { CommentDialogUi } from "../utils/CommentDialogUi";
import { CommentContext } from "../../../context/comment";

import { Card, CardHeader, Avatar, IconButton, Grid } from "@mui/material";
import Link from "next/link";
import { Comment } from "../../../interfaces";
import { EditCommentUi } from "../comments/EditCommentUi";
import { pluralize } from "../../../utils/strings";
import { Like } from "../../../interfaces";
import { CommentPostUi } from "../comments/CommentPostUi";

interface Props {
  item: Comment;
  parent_id?: string;
}

export const CardCommentUi: FC<Props> = ({ item, parent_id }) => {
  const { setTag, setValue } = useContext(UIContext);
  const { updateComment } = useContext(CommentContext);
  const [onCancel, setOnCancel] = useState(false);
  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(item.description);
  const {
    createLike,
    deleteLike,
    likes,
    likeByParentAndUserId,
    likesByParentId,
  } = useContext(LikeContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleLike = (
    parent_id: string,
    user_id: string,
    grandparent_id?: string
  ) => {
    if (likeByParentAndUserId(likes, parent_id, user_id).length === 1) {
      deleteLike(likeByParentAndUserId(likes, parent_id, user_id)[0]._id || "");
    } else {
      createLike({
        user_id: user?._id || "",
        user_name: user?.name || "",
        grandparent_id: grandparent_id || "",
        parent_id: parent_id || "",
      });
    }
  };

  const reactions: any = (likes: Like[], item: Comment) => {
    return likesByParentId(likes, item._id).length === 0
      ? item.likes
      : likesByParentId(likes, item._id).length;
  };

  const editComment = () => {
    item.description = text;
    updateComment(item._id, item);
    setInputs("");
    setOpen(false);
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setText(target.value);
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  const handleClose = () => {
    setOpen(false);
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
                onClick={() =>
                  handleLike(item._id, user?._id || "", item.parent_id || "")
                }
              >
                {likeByParentAndUserId(likes, item._id || "", user?._id || "")
                  .length === 1 && isLoggedIn ? (
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
                <EditCommentUi item={item} setOpen={setOpen} />
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
                {reactions(likes, item) > 0
                  ? reactions(likes, item) +
                    pluralize(" like", reactions(likes, item))
                  : null}
              </span>
            </Grid>
            <Grid item xs={2}>
              {isLoggedIn && (
                <a
                  style={{ fontWeight: "500", cursor: "pointer" }}
                  onClick={() => {
                    setValue(" @" + item.user_name + " ");
                    setOnCancel(true);
                    setTag({
                      user_name: item.user_name,
                      user_id: item.user_id,
                    });
                  }}
                >
                  Answer
                </a>
              )}
            </Grid>
          </Grid>
        }
      />
      {isLoggedIn && onCancel && (
        <CommentPostUi
          parent_id={parent_id || ""}
          item={item}
          onCancel={onCancel}
          setOnCancel={setOnCancel}
        />
      )}
      {open && (
        <CommentDialogUi
          handleInput={handleInput}
          handleSubmit={editComment}
          onCancel={open}
          value={text}
          handleClose={handleClose}
        />
      )}
    </Card>
  );
};
