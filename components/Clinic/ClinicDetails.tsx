import { FC, ReactNode } from "react";
import * as React from "react";
import { Typography, Card, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Props {
  children?: ReactNode;
  handleThrough: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}

export const ClinicDetails: FC<Props> = ({ handleThrough, name }) => {
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
      sx={{
        color: "black", marginLeft: 2
      }}
      onClick={() => handleThrough(true)}
    >
      <ArrowBackIosIcon />
    </IconButton>
    <Typography align="center" sx={{ fontWeight: "medium", marginTop: -4 }}>
        {name}
      </Typography>
  </Card>
  );
};
