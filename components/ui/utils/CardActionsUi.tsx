import { FC, ReactNode, useContext } from "react";
import { IconButton, CardActions } from "@mui/material";

import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuthContext } from "../../../context/auth";
import { ClinicContext } from "../../../context/clinic/ClinicContext";

interface Props {
  children?: ReactNode;
}

export const CardActionsUi: FC<Props> = ({}) => {
  const { clinics } = useContext(ClinicContext);
  const { isLoggedIn } = useContext(AuthContext);
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
        >
          <CheckCircleOutlineIcon fontSize="medium" />
        </IconButton>
        <IconButton
          aria-label="comment"
          color={isLoggedIn ? "primary" : "default"}
          disabled={!isLoggedIn}
        >
          <CommentIcon fontSize="medium" />
        </IconButton>
      </div>
    </CardActions>
  );
};
