import { FC, ReactNode, useContext } from "react";
import { IconButton, CardActions, Typography, Grid, Box } from "@mui/material";
import { useRouter } from "next/router";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { AuthContext } from "../../../context/auth";
import { LikeContext } from "../../../context/like";
import { UIContext } from "../../../context/ui";
import { pluralize } from "../../../utils/strings";
import { Like } from "../../../interfaces";

interface Props {
  children?: ReactNode;
  parent_id: string;
  initialLikes: number;
}

export const CardActionsUi: FC<Props> = ({ parent_id, initialLikes }) => {
  const router = useRouter();
  const { setOnFocus } = useContext(UIContext);
  const { createLike, deleteLike, likes, likeByParentAndUserId } =
    useContext(LikeContext);
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
        grandparent_id: "",
        parent_id: parent_id || "",
      });
    }
  };

  const reactions: any = (
    likes: Like[],
    parent_id: string,
    user_id: string
  ) => {
    return likeByParentAndUserId(likes, parent_id, user_id) === null
      ? initialLikes
      : likeByParentAndUserId(likes, parent_id, user_id).length;
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
              onClick={() => handleLike(parent_id, user?._id || "")}
            >
              {likeByParentAndUserId(likes, parent_id, user?._id || "")
                .length === 1 ? (
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
          <ArrowRightOutlinedIcon fontSize="medium" sx={{ mt: 0.75, mr: -1 }} />
          <Grid item xs={0}>
            <IconButton
              aria-label="comment"
              color={isLoggedIn ? "primary" : "default"}
              disabled={!isLoggedIn}
              onClick={() => router.push(`/clinic/${parent_id}`)}
            >
              <AccessibilityNewIcon sx={{ fontSize: "26px", mt: -0.5 }} />
              <LocalHospitalIcon sx={{ fontSize: "15px", mt: -1.5 }} />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <Typography
        sx={{ fontSize: 14, fontWeight: 500, mt: 1.5, ml: 2, mb: -1 }}
      >
        {reactions(likes, parent_id, user?._id || "") > 0
          ? reactions(likes, parent_id, user?._id || "") +
            pluralize(" like", reactions(likes, parent_id, user?._id || ""))
          : null}
      </Typography>
    </>
  );
};
