import { FC, ReactNode } from "react";
import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GUIDE_TITLE, GUIDE_DETAIL } from "../../constans/messages";

interface Props {
  children?: ReactNode;
}

export const GuideBar: FC<Props> = ({}) => {
  return (
    <Accordion elevation={0} sx={{  }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ backgroundColor: "lightyellow", marginBottom: -1 }}
      >
        <Typography sx={{ fontSize: 15 }}>{GUIDE_TITLE}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ fontSize: 15, marginTop: 1, marginBottom: -4 }}>
          {GUIDE_DETAIL}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
