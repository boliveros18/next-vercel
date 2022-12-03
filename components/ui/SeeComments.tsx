import { FC, ReactNode } from "react";
import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { CommentUi, ReadMore } from "./";

interface Props {
  children?: ReactNode;
}

export const SeeComments: FC<Props> = ({}) => {
  return (
    <Accordion elevation={0}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ marginBottom: -2, marginTop: -1 }}
      >
        <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
          See the 15 comments
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CommentUi
          author="charlesWid08"
          comment={
            <ReadMore text="Surgical robotics, minimally invasive surgery, board certified plastic procedure" />
          }
          photo="/static/images/avatar/1.jpg"
          like={true}
          likes="4"
          date="16h"
        ></CommentUi>
      </AccordionDetails>
    </Accordion>
  );
};
