import { FC, ReactNode, useContext, useState, useEffect } from "react";
import { IconButton, CardActions } from "@mui/material";

import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuthContext } from "../../../context/auth";
import { ClinicContext } from "../../../context/clinic/ClinicContext";
import { Clinic } from "../../../interfaces";

interface Props {
  children?: ReactNode;
}

export const CardActionsUi: FC<Props> = ({}) => {
  const [onClick, setOnClick] = useState(false);
  const { clinics, updateClinic } = useContext(ClinicContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({} as Clinic);
  const index = clinics[0]?.qualification.findIndex(
    (i) => i.user_id === user?._id
  );

  useEffect(() => {
    setInputs(clinics[0]);
  }, [clinics]);

  const handleLike = () => {
    if (
      clinics[0]?.qualification.filter((i) => i.user_id === user?._id)
        .length === 1
    ) {
      inputs.qualification[index].approved = !clinics[0].qualification[index].approved;
      setInputs({ ...inputs });
      updateClinic(clinics[0]._id, inputs);
    } else {
    }
    setOnClick(!onClick);
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
          name="approved"
          aria-label="like"
          color={isLoggedIn ? "primary" : "default"}
          disabled={!isLoggedIn}
          onClick={handleLike}
        >
          {clinics[0]?.qualification[index]?.approved ? (
            <CheckCircleIcon sx={{ color: "blue" }} fontSize="medium" />
          ) : (
            <CheckCircleOutlineIcon fontSize="medium" />
          )}
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
