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
import { ReadMore, SeeComments } from "../ui";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { WindowSize, UseWindowSize } from "../../utils";
import { ClinicContext } from "../../context/clinic";
import { InstagramLink } from "../ui";
import { ClinicQualification } from "./ClinicQualification";

interface Props {
  children?: ReactNode;
  handleThrough: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

export const ClinicDetails: FC<Props> = ({ handleThrough, index }) => {
  const { clinics } = useContext(ClinicContext);
  const mobile = UseWindowSize();
  const size = WindowSize();
  return (
    <SeeComments comments={clinics[index]?.comments} index={index}>
      <Card
        sx={{
          width: "100%",
          height: size.height - 219,
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
          {clinics[index].name + " "}
          {clinics[index].certified ? (
            <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
          ) : (
            <CheckCircleOutlineIcon sx={{ color: "gray", fontSize: "15px" }} />
          )}
        </Typography>
        <CardMedia
          component="img"
          height={size.height - 500}
          image={clinics[index].photo}
          alt="Clinic"
          sx={{ marginTop: 1, maxHeight: "330px" }}
        />
        <CardContent>
          <ClinicQualification id={index} />
          <Divider sx={{ mt: 1 }} />
          <Card sx={{ display: "flex" }} elevation={0}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
                  {clinics[0].certifications[0].name}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                  {mobile ? (
                    <ReadMore
                      text={clinics[index]?.certifications[0].description}
                    />
                  ) : (
                    clinics[index]?.certifications[0].description
                  )}
                </Typography>
              </CardContent>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <CardMedia
              component="img"
              sx={{ width: 70, m: 1 }}
              image={clinics[index].certifications[0].logo}
              alt="Live from space album cover"
            />
          </Card>
          <Divider />
          <InstagramLink />
        </CardContent>
      </Card>
    </SeeComments>
  );
};
