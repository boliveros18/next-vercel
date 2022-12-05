import { FC, useState } from "react";
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
import { ClinicDetails } from "../Clinic/ClinicDetails";
import { Clinic } from "../../interfaces";


interface Props {
  clinic: Clinic;
}

export const HomeCard: FC<Props> = ({ clinic }) => {
  const [clinicDetails, setClinicDetails] = useState(true);

  const handleThrough = () => {
    setClinicDetails(!clinicDetails);
  };

  return (
    <>
      {clinicDetails ? (
        <Card
          sx={{
            width: "100%",
            height: "84vh",
          }}
          elevation={0}
        >
          <GuideBar />
          <CardHeader
            avatar={<Avatar alt={clinic.name} src={clinic.avatar} />}
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
              >{clinic.name}</Typography>
            }
            subheader={clinic.city+", "+clinic.country}
          />
          <CardActionArea onClick={() => setClinicDetails(!clinicDetails)}>
            <CardMedia
              component="img"
              height="160"
              image={clinic.photo}
              alt="Clinic"
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
              comment={ <ReadMore text={clinic.finantial} />}
            ></CardDetailUi>
            <CardDetailUi
              author="Speciality"
              comment={ <ReadMore text={clinic.speciality} />}
            ></CardDetailUi>
            <CardDetailUi
              author="Technology"
              comment={
                <ReadMore text={clinic.technology} />
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
              variant="contained"
              size="medium"
              color="secondary"
              sx={{
                width: "95%",
              }}
            >
              Sign in securely button
            </Button>
            <Button
              variant="text"
              sx={{ color: "#001B87", fontSize: 13, width: "95%" }}
            >
              Create an account
            </Button>
          </Stack>
        </Card>
      ) : (
        <ClinicDetails handleThrough={handleThrough} name={clinic.name}></ClinicDetails>
      )}
    </>
  );
};

