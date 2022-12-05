import { FC, ReactNode } from "react";
import { BackBodyComponent } from "../ui";
import * as React from "react";
import { Typography } from "@mui/material";

interface Props {
  children?: ReactNode;
  handleThrough: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}

export const ClinicDetails: FC<Props> = ({ handleThrough, name }) => {
  return (
    <BackBodyComponent handleThrough={handleThrough}>
      <Typography align="center" sx={{ fontWeight: "medium", marginTop: -4 }}>
        {name}
      </Typography>
    </BackBodyComponent>
  );
};
