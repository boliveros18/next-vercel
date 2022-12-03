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
  Grid,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import StarBorderIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import InstagramIcon from "@mui/icons-material/Instagram";

import { CommentUi, GuideBar, ReadMore } from "../ui";

interface Props {
  children?: ReactNode;
}

export const HomeCard: FC<Props> = ({}) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "75vh",
        overflow:'auto'
      }}
      elevation={0}
    >
      <GuideBar />
      <CardHeader
        avatar={
          <Avatar
            alt="Avatar"
            src="https://elements-cover-images-0.imgix.net/a19b6391-ec13-4d66-b032-67f1b3b9171a?auto=compress%2Cformat&fit=max&w=900&s=d864531ab5dac932d75b478a3a1fcca2"
          />
        }
        action={
          <IconButton aria-label="settings">
            <ShareIcon />
          </IconButton>
        }
        title={
          <Typography sx={{ fontSize: 16 }} variant="subtitle2">
            Clinica porto azul
          </Typography>
        }
        subheader={"Barranquilla"}
      />
      <CardMedia
        component="img"
        height="230"
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
        <IconButton aria-label="like">
          <StarBorderIcon fontSize="medium" />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="instagram">
          <InstagramIcon fontSize="small" />
        </IconButton>
      </CardActions>
      <CardContent>
        <CommentUi autor="Finantial" comment="8 million US in 2021"></CommentUi>
        <CommentUi
          autor="Speciality"
          comment="Plastic and Reconstruction"
        ></CommentUi>
        <CommentUi
          autor="Detail"
          comment={
            <ReadMore text="Why First Miniserteretrtrtr ssdfsd dfgdgdfgdfg dfgdfgdgdfg" />
          }
        ></CommentUi>
      </CardContent>
    </Card>
  );
};
