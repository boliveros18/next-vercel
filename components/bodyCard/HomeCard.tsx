import { FC, ReactNode } from "react";
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
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import InstagramIcon from "@mui/icons-material/Instagram";

import { CardDetailUi, GuideBar, ReadMore, SeeComments } from "../ui";

interface Props {
  children?: ReactNode;
}

export const HomeCard: FC<Props> = ({}) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "81vh",
        // overflow: "auto"
      }}
      elevation={0}
    >
      <GuideBar />
      <CardHeader
        sx={{
          marginBottom: -1,
        }}
        avatar={
          <Avatar
            alt="Avatar"
            src="https://elements-cover-images-0.imgix.net/a19b6391-ec13-4d66-b032-67f1b3b9171a?auto=compress%2Cformat&fit=max&w=900&s=d864531ab5dac932d75b478a3a1fcca2"
          />
        }
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
            sx={{ fontSize: 14, textTransform: "uppercase" }}
            variant="subtitle2"
          >
            Clinica porto azul
          </Typography>
        }
        subheader={"Barranquilla"}
      />
      <CardMedia
        component="img"
        height="160"
        image="https://clinicajaca.com/wp-content/uploads/2020/08/clinicajaca-22-scaled.jpg"
        alt="Clinic"
      />
      <CardActions
        disableSpacing
        sx={{
          marginTop: -1,
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
          comment="8 million US in 2021"
        ></CardDetailUi>
        <CardDetailUi
          author="Speciality"
          comment="Plastic and Reconstruction"
        ></CardDetailUi>
        <CardDetailUi
          author="Technology"
          comment={
            <ReadMore text="Surgical robotics, minimally invasive surgery, board certified plastic procedure" />
          }
        ></CardDetailUi>
      </CardContent>
      <SeeComments />
      <Stack
        spacing={0}
        direction="column"
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        <Button variant="outlined" size="medium">
          Sign in securely button
        </Button>
        <Button variant="text" sx={{ color: "green", fontSize: 13 }}>
          Create an account
        </Button>
      </Stack>
    </Card>
  );
};
