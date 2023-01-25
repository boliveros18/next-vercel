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
import { getPrincipalClinics, getPrincipalClinicsCertifications, getPrincipalClinicQualifications } from "../../utils/arrayFunctions";
import { WindowSize, UseWindowSize } from "../../utils";
import { ClinicContext } from "../../context/clinic";
import { InstagramLink } from "../ui";
import { ClinicQualification } from "./ClinicQualification";
import { CertificationContext } from "../../context/certification";
import { QualificationContext } from "../../context/qualification";
import { Qualification } from '../../interfaces';


interface Props {
  children?: ReactNode;
  handleThrough: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

export const ClinicDetails: FC<Props> = ({ handleThrough, index }) => {

  const { qualifications } = useContext(QualificationContext);
  const { certifications } = useContext(CertificationContext);
  const { principals } = useContext(ClinicContext);
  const mobile = UseWindowSize();
  const size = WindowSize();
  const principalCertifications = getPrincipalClinicsCertifications(principals, certifications)
  const principalQualifications: Qualification[] = getPrincipalClinicQualifications(principals[index]?._id || "", qualifications)

  return (
    <SeeComments parent_id={principals[index]?._id || ""}>
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
          {principals[index].name + " "}
          {principals[index].certified ? (
            <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
          ) : (
            <CheckCircleOutlineIcon sx={{ color: "gray", fontSize: "15px" }} />
          )}
        </Typography>
        <CardMedia
          component="img"
          height={size.height - 500}
          image={principals[index].photo}
          alt="Clinic"
          sx={{ marginTop: 1, maxHeight: "330px" }}
        />
        <CardContent>
          {//<ClinicQualification qualifications={principalQualifications} index={index} />
}
          <Divider sx={{ mt: 1 }} />
          <Card sx={{ display: "flex" }} elevation={0}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
                  {principalCertifications[index]?.name || ""}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                  {mobile ? (
                    <ReadMore
                      text={principalCertifications[index]?.description || ""}
                    />
                  ) : (
                    principalCertifications[index]?.description || ""
                  )}
                </Typography>
              </CardContent>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <CardMedia
              component="img"
              sx={{ width: 70, m: 1 }}
              image={principalCertifications[index]?.logo}
              alt=""
            />
          </Card>
          <Divider />
          <InstagramLink index={index} />
        </CardContent>
      </Card>
    </SeeComments>
  );
};
