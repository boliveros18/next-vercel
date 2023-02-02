import { FC, ReactNode, useContext } from "react";
import { IconButton, CardActions, Typography, Grid, Box } from "@mui/material";

import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import QueuePlayNextOutlinedIcon from "@mui/icons-material/QueuePlayNextOutlined";
import { AuthContext } from "../../../context/auth";
import { LikeContext } from "../../../context/like";
import { UIContext } from "../../../context/ui";

interface Props {
  children?: ReactNode;
  parent_id: string;
}

export const CardActionsUi: FC<Props> = ({ parent_id }) => {
  const { setOnFocus } = useContext(UIContext);
  const { createLike, deleteLike, principalLike, likeLength, setLikeLength } =
    useContext(LikeContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleLike = () => {
    if (principalLike[0]?._id !== "") {
      deleteLike(principalLike[0]._id || "");
      setLikeLength(likeLength - 1);
      principalLike[0]._id = "";
    } else {
      createLike({
        user_id: user?._id || "",
        user_name: user?.name || "",
        parent_id: parent_id,
      });
      setLikeLength(likeLength + 1);
    }
  };

  return (
    <>
      <CardActions
        disableSpacing
        sx={{
          mb: -3,
          mt: -0.5,
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={0} sx={{ mr: -0.5 }}>
            <IconButton
              aria-label="like"
              color={isLoggedIn ? "primary" : "default"}
              disabled={!isLoggedIn}
              onClick={handleLike}
            >
              {principalLike[0]?._id !== "" ? (
                <CheckCircleIcon sx={{ color: "blue" }} fontSize="medium" />
              ) : (
                <CheckCircleOutlineIcon fontSize="medium" />
              )}
            </IconButton>
          </Grid>
          <Grid item xs={0}>
            <IconButton
              aria-label="comment"
              color={isLoggedIn ? "primary" : "default"}
              disabled={!isLoggedIn}
              onClick={() => setOnFocus(true)}
            >
              <CommentIcon fontSize="medium" />
            </IconButton>
          </Grid>
          <Box sx={{ flexGrow: 1 }} />
          <Grid item sx={{ mt: 1 }}>
            <ArrowRightOutlinedIcon fontSize="medium" />
          </Grid>
          <Grid item xs={0}>
            <IconButton
              aria-label="comment"
              color={isLoggedIn ? "primary" : "default"}
              disabled={!isLoggedIn}
              onClick={() => setOnFocus(true)}
            >
              <QueuePlayNextOutlinedIcon fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <Typography
        sx={{ fontSize: 14, fontWeight: 500, mt: 1.5, ml: 2, mb: -1 }}
      >
        {likeLength === 0 ? "" : likeLength}
        {likeLength === 0 ? "" : likeLength > 1 ? " Likes" : " Like"}
      </Typography>
    </>
  );
};
