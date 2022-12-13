import { FC, useState, useContext } from "react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  IconButton,
  CardActions,
  Button,
  Stack,
  CardActionArea,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import { CardDetailUi, GuideBar, ReadMore, SeeComments } from "../ui";
import { ClinicDetails } from "../clinic/ClinicDetails";
import { WindowSize, UseWindowSize } from "../../utils/useWindowSize";
import { ClinicContext } from "../../context/clinic/ClinicContext";

interface Props {}

export const HomeCard: FC<Props> = () => {
  const mobile = UseWindowSize();
  const size = WindowSize();
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
            height: size.height - 115,
          }}
          elevation={0}
        >
          <GuideBar />
          <CardHeader
            sx={{ mt: -1, mb: -1 }}
            avatar={<Avatar alt={clinics[0]?.name} src={clinics[0]?.avatar} />}
            action={
              <IconButton
                aria-label="settings"
                style={{
                  color: "black",
                }}
              >
                <ShareIcon />
              </IconButton>
            }
            title={
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
            }
            subheader={clinics[0]?.city + ", " + clinics[0]?.country}
          />
          <CardActionArea onClick={() => setToogle(!toogle)}>
            <CardMedia
              component="img"
              height={size.height - 500}
              image={clinics[0]?.photo}
              alt="Clinic"
              sx={{ maxHeight: "330px" }}
            />
          </CardActionArea>
          <CardActions
            disableSpacing
            sx={{
              marginBottom: -3,
            }}
          >
            <div>
              <IconButton
                aria-label="like"
                style={{
                  color: "black",
                }}
              >
                <CheckCircleOutlineIcon fontSize="medium" />
              </IconButton>
              <IconButton
                aria-label="comment"
                style={{
                  color: "black",
                }}
              >
                <CommentIcon fontSize="medium" />
              </IconButton>
              <IconButton
                aria-label="instagram"
                style={{
                  color: "black",
                }}
              >
                <InstagramIcon fontSize="medium" />
              </IconButton>
            </div>
          </CardActions>
          <CardContent>
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
          </CardContent>
          <SeeComments />
          <Stack
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: 2 }}
          >
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              sx={{
                width: "90%",
                color: "black",
              }}
            >
              Sign in securely button
            </Button>
            <Button variant="text" sx={{ fontSize: 13, width: "90%" }}>
              Create an account
            </Button>
          </Stack>
        </Card>
      ) : (
        <ClinicDetails
          handleThrough={handleThrough}
        ></ClinicDetails>
      )}
    </>
  );
};
