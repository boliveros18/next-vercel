import { FC, ReactNode, useContext } from "react";
import { Typography, Box, Link, Grid } from "@mui/material";
import { ClinicContext } from "../../../context/clinic";

interface Props {
  children?: ReactNode;
  index: number;
}

//TODO: meter el index en un context de clinic

export const InstagramLink: FC<Props> = ({index}) => {
  const { principals } = useContext(ClinicContext);
  return (
    <Grid container>
      <Box sx={{ flexGrow: 1 }} />
      <Link
        href={principals[index]?.instagram}
        target="_blank"
        sx={{ textDecoration: "none" }}
      >
        <Typography
          sx={{
            fontSize: 14,
            cursor: "pointer",
            color: "#001B87",
            fontWeight: "500",
          }}
        >
          {"@" + principals[index]?.instagram.substring(26, principals[index].instagram.length-7)}
        </Typography>
      </Link>
    </Grid>
  );
};
