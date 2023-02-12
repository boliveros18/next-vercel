import { FC, useContext } from "react";
import * as React from "react";
import { CommentContext } from "../../../context/comment";
import { AnswerContext } from "../../../context/answer";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { CardCommentUi } from "../utils/CardCommentUi";

interface Props {}

export const CommentUi: FC<Props> = ({}) => {
  const { comments } = useContext(CommentContext);
  const { answers } = useContext(AnswerContext);

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      {comments?.length > 0 ? (
        comments?.map((item, index) => (
          <div key={index} style={{ marginBottom: -6, marginTop: -2 }}>
            <CardCommentUi item={item} tag={false} />
            <Accordion
              elevation={0}
              disableGutters={true}
              sx={{
                "&.MuiAccordion-root:before": {
                  backgroundColor: "white",
                },
              }}
            >
              {answers?.filter((i) => i.parent_id === item._id).length > 0 ? (
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    maxWidth: "100%",
                    mt: -1,
                    mb: -4,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "100%",
                      mt: -2,
                      mb: 2,
                      ml: 6,
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <a
                      style={{
                        fontWeight: "500",
                        cursor: "pointer",
                        color: "gray",
                      }}
                    >
                      {"See " +
                        answers?.filter((i) => i.parent_id === item._id)
                          .length +
                        (answers?.filter((i) => i.parent_id === item._id)
                          .length > 1
                          ? " answers"
                          : " answer")}
                    </a>
                  </Box>
                </AccordionSummary>
              ) : null}
              {answers?.filter((i) => i.parent_id === item._id).length ? (
                <AccordionDetails sx={{ marginBottom: -2, marginTop: 1 }}>
                  {answers
                    ?.filter((i) => i.parent_id === item._id)
                    .map((item, index) => (
                      <div key={index} style={{ marginLeft: 4, marginTop: -8 }}>
                        <CardCommentUi item={item} tag={true} />
                      </div>
                    ))}
                </AccordionDetails>
              ) : (
                <div />
              )}
            </Accordion>
          </div>
        ))
      ) : (
        <div />
      )}
    </Box>
  );
};
