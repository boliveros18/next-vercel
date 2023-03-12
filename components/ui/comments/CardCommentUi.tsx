import { FC, useContext, useState, FormEvent, ChangeEvent } from "react";
import { LikeContext } from "../../../context/like";
import { AuthContext } from "../../../context/auth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getFormatDistanceToNow } from "../../../utils";
import { CommentContext } from "../../../context/comment";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { CommentForm, StyledInputComment } from "../styled/CommentForm";
import Link from "next/link";
import { Comment } from "../../../interfaces";
import { EditCommentUi } from "../comments/EditCommentUi";

interface Props {
  item: Comment;
  parent_id?: string;
}

export const CardCommentUi: FC<Props> = ({ item, parent_id }) => {
  const { createComment, getCommentsByParentId } =
    useContext(CommentContext);
  const [tag, setTag] = useState({ user_name: "", user_id: "" });
  const [value, setValue] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const { likes, createLike, deleteLike } = useContext(LikeContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});

  const handleLike = (id: string) => {
    if (likes.filter((i) => i.parent_id === id).length === 1) {
      const index = likes.findIndex((i) => i.parent_id === id);
      deleteLike(likes[index]._id || "");
      likes.splice(index, 1);
    } else {
      createLike({
        user_id: user?._id || "",
        user_name: user?.name || "",
        parent_id: id || "",
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createComment({
      ...inputs,
      parent_id: parent_id,
      user_photo: user?.avatar,
      user_name: user?.name,
      user_id: user?._id,
      user_tag_name: "@" + tag.user_name,
      user_tag_id: tag.user_id
    } as Comment)
      .then(() => {
        setInputs("");
        setValue("");
        setOnFocus(false);
        getCommentsByParentId(parent_id || "")
        getCommentsByParentId(item._id)
      })
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value);
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({
      ...inputs,
      [target.name]: value.substring(tag.user_name.length + 3),
    });
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
                <a
                  style={{ fontWeight: "500", cursor: "pointer" }}
                  onClick={() => {
                    setValue(" @" + item.user_name + " ");
                    setOnFocus(true);
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
      {isLoggedIn && onFocus && (
        <Grid container sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={12}>
            <CommentForm style={{ color: "black" }}>
              <StyledInputComment
                value={value}
                type="text"
                name="description"
                inputProps={{ "aria-label": "comment" }}
                inputRef={(input: any) => onFocus && input?.focus()}
                onChange={handleInput}
                autoComplete="off"
              />
            </CommentForm>
          </Grid>
          <Grid item xs={2} sm={2} md={2}></Grid>
          <Box sx={{ flexGrow: 1 }} />
          <Grid item xs={2} sm={2} md={1} sx={{ mr: 2 }}>
            <IconButton
              aria-label="settings"
              style={{
                color: "black",
              }}
              onClick={() => setOnFocus(false)}
            >
              <Typography
                sx={{ fontSize: 15, textTransform: "capitalize" }}
                variant="subtitle2"
              >
                Cancel
              </Typography>
            </IconButton>
          </Grid>
          <Grid item xs={2} sm={2} md={1} sx={{ mr: 2 }}>
            <IconButton
              aria-label="settings"
              style={{
                color: "black",
              }}
              onClick={handleSubmit}
            >
              <Typography
                sx={{ fontSize: 15, textTransform: "capitalize" }}
                variant="subtitle2"
              >
                Post
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Card>
  );
};
