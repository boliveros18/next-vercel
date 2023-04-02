import { FC, ReactNode } from 'react';
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
  } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  children?: ReactNode;
  summary: string;
}

export const AccordionUi: FC<Props> = ({children, summary}) => {
  return (              <Accordion
    elevation={0}
    disableGutters={true}
    defaultExpanded={true}
  >
    <AccordionSummary
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography
        sx={{ fontSize: 15, fontWeight: "500", color: "#001B87" }}
      >
        {summary}
      </Typography>
      <ExpandMoreIcon sx={{ color: "#001B87" }} />
    </AccordionSummary>
    <AccordionDetails>
        {children}
    </AccordionDetails>
  </Accordion>);
};

export default AccordionUi