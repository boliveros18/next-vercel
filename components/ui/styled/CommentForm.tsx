import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

export const CommentForm = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "16px",
  backgroundColor: "#e3e3e3",
  "&:hover": {
    backgroundColor: "#e0dede",
  },
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: 1,
    width: "100%",
  },
}));

export const StyledInputComment = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 20,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("xs")]: {
      marginLeft: 0,
      width: "100%",
    },
  },
}));
