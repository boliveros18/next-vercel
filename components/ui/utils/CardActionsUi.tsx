import { FC, ReactNode, useContext, useState, useEffect } from "react";
import { IconButton, CardActions } from "@mui/material";

import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuthContext } from "../../../context/auth";
import { LikeContext } from "../../../context/like";
import { UIContext } from "../../../context/ui";
import { Like } from "../../../interfaces";

interface Props {
  children?: ReactNode;
  parent_id: string;
}

export const CardActionsUi: FC<Props> = ({parent_id}) => {
  const { setOnFocus } = useContext(UIContext);
  const { likes, createLike, deleteLike, setLikes } = useContext(LikeContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleLike = () => {

    const index = likes?.findIndex(i=>i.parent_id===parent_id && i.user_id === user?._id )
   
    if(index > -1){
       deleteLike(likes[index]._id || "")
    } else{
      createLike({
        user_id: user?._id || "",
        user_name: user?.name  || "",
        parent_id: parent_id
      })
    }    
  };

   
  return (
    <CardActions
      disableSpacing
      sx={{
        marginBottom: -3,
      }}
    >
      <div>
        <IconButton
          aria-label="like"
          color={isLoggedIn ? "primary" : "default"}
          disabled={!isLoggedIn}
          onClick={handleLike}
        >
          {likes.filter(i=>i.parent_id === parent_id).map(i=>i.user_id===user?._id).length === 1  ? (
            <CheckCircleIcon sx={{ color: "blue" }} fontSize="medium" />
          ) : (
            <CheckCircleOutlineIcon fontSize="medium" />
          )}
        </IconButton>
        <IconButton
          aria-label="comment"
          color={isLoggedIn ? "primary" : "default"}
          disabled={!isLoggedIn}
          onClick={() => setOnFocus(true)}
        >
          <CommentIcon fontSize="medium" />
        </IconButton>
      </div>
    </CardActions>
  );
};
