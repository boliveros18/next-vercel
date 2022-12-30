import { FC, useContext } from "react";
import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { CommentUi, ReadMore } from "..";
import { CommentForm, StyledInputComment } from "../styled/CommentForm";
import { getFormatDistanceToNow } from "../../../utils";
import { ClinicContext } from "../../../context/clinic";
import { UseWindowSize } from "../../../utils";
import { AuthContext } from "../../../context/auth";

interface Props {}

export const SeeComments: FC<Props> = ({}) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const mobile = UseWindowSize();
  const { clinics } = useContext(ClinicContext);

 
  return isLoggedIn ? (
    <div>
      <Accordion elevation={0}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ marginBottom: -2, marginTop: -2 }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
            See the {clinics[0]?.comments?.length} comments
          </Typography>
        </AccordionSummary>
        {clinics[0]?.comments?.length > 0 ? (
          clinics[0]?.comments?.map((item) => (
            <AccordionDetails key={item.user_id}>
              <CommentUi
                author={item.user_name}
                comment={
                  mobile ? (
                    <ReadMore text={item.description} />
                  ) : (
                    item.description
                  )
                }
                photo={item.user_photo}
                like={item.likes.filter(item=>item.user_id === user?._id).length === 1  ? true : false}
                likes={item.likes.filter(i => i.approved === true).length}
                date={getFormatDistanceToNow(item.createdAt)}
              ></CommentUi>
            </AccordionDetails>
          ))
        ) : (
          <div />
        )}
      </Accordion>
      <Toolbar sx={{ width: "100%" }}>
        <Avatar
          alt="name"
          src="/static/images/avatar/2.jpg"
          sx={{ marginRight: 1 }}
        />
        <CommentForm style={{ color: "black" }}>
          <StyledInputComment
            placeholder="Add a comment…"
            inputProps={{ "aria-label": "comment" }}
          />
        </CommentForm>
        <IconButton
          aria-label="settings"
          style={{
            color: "black",
            marginLeft: 8,
            marginRight: -6,
          }}
        >
          <Typography
            sx={{ fontSize: 15, textTransform: "capitalize" }}
            variant="subtitle2"
          >
            Post
          </Typography>
        </IconButton>
      </Toolbar>
    </div>
  ) : (
    <div>
      {" "}
      <Accordion elevation={0}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ marginBottom: -2, marginTop: -2 }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
            See the {clinics[0]?.comments?.length} comments
          </Typography>
        </AccordionSummary>
        {clinics[0]?.comments?.length > 0 ? (
          clinics[0]?.comments?.map((item) => (
            <AccordionDetails key={item.user_id}>
              <CommentUi
                disable={!isLoggedIn}
                author={item.user_name}
                comment={
                  mobile ? (
                    <ReadMore text={item.description} />
                  ) : (
                    item.description
                  )
                }
                photo={item.user_photo}
                like={item.likes.filter(item=>item.user_id === user?._id).length === 1  ? true : false}
                likes={item.likes.filter(i => i.approved === true).length}
                date={getFormatDistanceToNow(item.createdAt)}
              ></CommentUi>
            </AccordionDetails>
          ))
        ) : (
          <div />
        )}
      </Accordion>
    </div>
  );
};
