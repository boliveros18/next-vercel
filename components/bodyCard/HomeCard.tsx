import { FC, useState, useContext, useEffect } from "react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Skeleton,
  CardActionArea,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  CardActionsUi,
  CardDetailUi,
  GuideBar,
  ReadMore,
  SeeComments,
} from "../ui";
import { ClinicDetails } from "../clinic";
import { WindowSize, UseWindowSize } from "../../utils";
import { ClinicContext } from "../../context/clinic";
import { SingInUi, ShareMediaUi } from "../ui";
import { UIContext } from "../../context/ui";
import { Clinic } from "../../interfaces";

interface Props {}

export const HomeCard: FC<Props> = () => {
  const { loading } = useContext(UIContext);
  const mobile = UseWindowSize();
  const height = WindowSize().height;
  const [toogle, setToogle] = useState(true);
  const { clinics } = useContext(ClinicContext);
  const handleThrough = () => {
    setToogle(!toogle);
  };

  return (
    <>
      {toogle ? (
        <Card
          sx={{
            width: "100%",
            height: height - 115,
          }}
          elevation={0}
        >
          <GuideBar />
          <CardHeader
            sx={{ mt: -1, mb: -1 }}
            avatar={
              !loading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar alt={clinics[0]?.name} src={clinics[0]?.avatar} />
              )
            }
            action={
              loading ? (
                <ShareMediaUi
                  name={clinics[0]?.name}
                  description={
                    clinics[0]?.finantial +
                    ". " +
                    clinics[0]?.speciality +
                    ". " +
                    clinics[0]?.technology
                  }
                />
              ) : null
            }
            title={
              loading ? (
                <Typography
                  sx={{ fontSize: 15, textTransform: "capitalize" }}
                  variant="subtitle2"
                >
                  {clinics[0]?.name + " "}{" "}
                  {clinics[0]?.certified ? (
                    <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
                  ) : (
                    <CheckCircleOutlineIcon
                      fontSize="small"
                      sx={{ color: "gray", fontSize: "15px" }}
                    />
                  )}
                </Typography>
              ) : (
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              )
            }
            subheader={
              loading ? (
                clinics[0]?.city + ", " + clinics[0]?.country 
              ) : (
                <Skeleton animation="wave" height={10} width="40%" />
              )
            }
          />
          <CardActionArea onClick={() => setToogle(!toogle)}>
            {loading ? (
              <CardMedia
                component="img"
                height={height - 500}
                image={clinics[0]?.photo}
                alt="Clinic"
                sx={{ maxHeight: "330px" }}
              />
            ) : (
              <Skeleton height={170} animation="wave" variant="rectangular" />
            )}
          </CardActionArea>
          {loading ? (
            <CardActionsUi />
          ) : (
            <Skeleton
              animation="wave"
              height={20}
              width="10%"
              sx={{ marginTop: 2 }}
            />
          )}

          <CardContent>
            {loading ? (
              <CardDetailUi
                author="Finantial"
                comment={
                  mobile ? (
                    <ReadMore text={clinics[0]?.finantial} />
                  ) : (
                    clinics[0]?.finantial
                  )
                }
              ></CardDetailUi>
            ) : (
              <Skeleton animation="wave" height={20} width="50%" />
            )}
            {loading ? (
              <CardDetailUi
                author="Speciality"
                comment={
                  mobile ? (
                    <ReadMore text={clinics[0]?.speciality} />
                  ) : (
                    clinics[0]?.speciality
                  )
                }
              ></CardDetailUi>
            ) : (
              <Skeleton animation="wave" height={20} width="60%" />
            )}
            {loading ? (
              <CardDetailUi
                author="Technology"
                comment={
                  mobile ? (
                    <ReadMore text={clinics[0]?.technology} />
                  ) : (
                    clinics[0]?.technology
                  )
                }
              ></CardDetailUi>
            ) : (
              <Skeleton animation="wave" height={20} width="80%" />
            )}
          </CardContent>
          <SeeComments />
          <SingInUi />
        </Card>
      ) : (
        <ClinicDetails handleThrough={handleThrough}></ClinicDetails>
      )}
    </>
  );
};
