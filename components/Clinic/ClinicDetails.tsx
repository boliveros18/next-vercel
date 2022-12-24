import { FC, ReactNode, useContext } from "react";
import * as React from "react";
import {
  Typography,
  Card,
  IconButton,
  CardMedia,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import { QualificationUi, ReadMore, SeeComments } from "../ui";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { WindowSize, UseWindowSize } from "../../utils/useWindowSize";
import { ClinicContext } from "../../context/clinic/ClinicContext";
import { Stars } from "../ui/utils/Stars";
import { InstagramLink } from "../ui/utils/InstagramLink";

interface Props {
  children?: ReactNode;
  handleThrough: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClinicDetails: FC<Props> = ({ handleThrough }) => {
  const { clinics } = useContext(ClinicContext);
  const mobile = UseWindowSize();
  const size = WindowSize();
  return (
    <Card
      sx={{
        width: "100%",
        height: size.height - 115,
      }}
      elevation={0}
    >
      <IconButton
        aria-label="back"
        sx={{
          color: "black",
          paddingLeft: 2,
        }}
        onClick={() => handleThrough(true)}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography align="center" sx={{ fontWeight: "medium", marginTop: -4 }}>
        {clinics[0].name + " "}
        {clinics[0].certified ? (
          <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
        ) : (
          <CheckCircleOutlineIcon sx={{ color: "gray", fontSize: "15px" }} />
        )}
      </Typography>
      <CardMedia
        component="img"
        height={size.height - 500}
        image={clinics[0].photo}
        alt="Clinic"
        sx={{ marginTop: 1, maxHeight: "330px" }}
      />
      <CardContent>
        <Stars qualification={clinics[0].qualification}></Stars>
        <Divider sx={{ mt: 1 }} />
        <Card sx={{ display: "flex" }} elevation={0}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
                {clinics[0].certifications.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                {mobile ? (
                  <ReadMore text={clinics[0].certifications.description} />
                ) : (
                  clinics[0].certifications.description
                )}
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <CardMedia
            component="img"
            sx={{ width: 70, m: 1 }}
            image={clinics[0].certifications.logo}
            alt="Live from space album cover"
          />
        </Card>
        <Divider sx={{ mb: 1 }} />
        <InstagramLink />
        <QualificationUi />
      </CardContent>
      <SeeComments />
    </Card>
  );
};
