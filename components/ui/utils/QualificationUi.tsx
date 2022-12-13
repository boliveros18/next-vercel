import { FC, ReactNode, useContext } from "react";
import { Clinic } from "../../../interfaces";
import { Typography, Box, Grid } from "@mui/material";
import { ClinicContext } from "../../../context/clinic/ClinicContext";

interface Props {
  children?: ReactNode;
}

export const QualificationUi: FC<Props> = ({}) => {
  const { clinics } = useContext(ClinicContext);
  return (
    <Grid container spacing={1}>
      <Box sx={{ flexGrow: 1 }} />
      <Grid item>
        <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
          {clinics[0].qualification.current > 3 ? "Excellent(" : "Good("}
          {clinics[0].qualification.number + " qualifications) | "}
        </Typography>
      </Grid>
      <Grid item>
        <Box
          sx={{
            width: 30,
            height: 20,
            borderRadius: "3px",
            backgroundColor: "green",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "white",
              fontWeight: "500",
              ml: "5px",
            }}
          >
            {clinics[0].qualification.current * 2}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
