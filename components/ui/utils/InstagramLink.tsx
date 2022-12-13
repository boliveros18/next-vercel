import { FC, ReactNode, useContext } from "react";
import { Typography, Box, Link, Grid } from "@mui/material";
import { ClinicContext } from "../../../context/clinic/ClinicContext";

interface Props {
  children?: ReactNode;
}

export const InstagramLink: FC<Props> = ({}) => {
  const { clinics } = useContext(ClinicContext);
  return (
    <Grid container>
      <Box sx={{ flexGrow: 1 }} />
      <Link href={clinics[0].instagram.link} sx={{ textDecoration: "none" }}>
        <Typography
          sx={{
            fontSize: 14,
            cursor: "pointer",
            color: "#001B87",
            fontWeight: "500",
          }}
        >
          {"@" + clinics[0].instagram.name}
        </Typography>
      </Link>
    </Grid>
  );
};