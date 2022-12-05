import { FC, ReactNode } from "react";
import {
  Card,
  IconButton
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Props {
  children?: ReactNode;
  handleThrough: React.Dispatch<React.SetStateAction<boolean>>
}

export const BackBodyComponent: FC<Props> = ({ children, handleThrough }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "84vh",
      }}
      elevation={0}
    >
      <IconButton
        aria-label="back"
        style={{
          color: "black",
        }}
        onClick={() => handleThrough(true)}
      >
        <ArrowBackIosIcon />
      </IconButton>
      {children}
    </Card>
  );
};
