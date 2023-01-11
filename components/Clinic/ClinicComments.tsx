import { FC, useContext, useState, useEffect } from "react";
import * as React from "react";
import { ClinicContext } from "../../context/clinic";
import { AuthContext } from "../../context/auth";
import { Clinic } from "../../interfaces";
import { ItemRefUi } from "../ui";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getFormatDistanceToNow } from "../../utils";
import { ClinicCommentAnswers } from "./";

interface Props {
  id: number;
  ind: number;
}

export const ClinicComments: FC<Props> = ({ id, ind }) => {
  const [toogle, setToogle] = useState(false);
  const { clinics, updateClinic } = useContext(ClinicContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({} as Clinic);

  const handleAnswers = () => {
    setToogle(!toogle);
  };

  useEffect(() => {
    setInputs(clinics[ind]);
  }, [clinics, ind]);

  const index = clinics[ind]?.comments[id].likes.findIndex(
    (i) => i.user_id === user?._id
  );

  const answers = clinics[ind]?.comments[id].answers.length;

  const handleLike = async () => {
    if (
      clinics[ind]?.comments[id].likes.filter((i) => i.user_id === user?._id)
        .length === 1
    ) {
      inputs.comments[id].likes[index].approved =
        !clinics[ind]?.comments[id].likes[index].approved;
      setInputs({ ...inputs });
      await updateClinic(clinics[ind]._id, inputs);
    } else {
      inputs.comments[id].likes.push({
        user_id: user?._id || "",
        user_name: user?.name || "",
        approved: true,
      });
      setInputs({ ...inputs });
      await updateClinic(clinics[ind]?._id, inputs);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Card sx={{ maxWidth: "100%" }} elevation={0}>
        <CardHeader
          avatar={
            <Avatar
              alt={clinics[ind]?.comments[id].user_name}
              src={clinics[ind]?.comments[id].user_photo}
            />
          }
          action={
            <IconButton
              disabled={!isLoggedIn}
              aria-label="like"
              style={{
                color: "black",
                marginRight: -10,
              }}
              onClick={handleLike}
            >
              {clinics[ind]?.comments[id].likes[index]?.approved &&
              isLoggedIn ? (
                <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
              ) : (
                <CheckCircleOutlineIcon sx={{ fontSize: "15px" }} />
              )}
            </IconButton>
          }
          title={
            <ItemRefUi
              author={clinics[ind]?.comments[id].user_name}
              link={`./api/user/${clinics[ind]?.comments[id].user_id}`}
              tag={false}
            >
              {clinics[ind]?.comments[id].description}
            </ItemRefUi>
          }
          subheader={
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <span>
                  {getFormatDistanceToNow(clinics[ind]?.comments[id].createdAt)}
                </span>
              </Grid>
              <Grid item xs={4}>
                <span>
                  {
                    clinics[ind]?.comments[id].likes.filter(
                      (i) => i.approved === true
                    ).length
                  }{" "}
                  Likes
                </span>
              </Grid>
              <Grid item xs={2}>
                {isLoggedIn && (
                  <a style={{ fontWeight: "500", cursor: "pointer" }}>Answer</a>
                )}
              </Grid>
            </Grid>
          }
        />
      </Card>
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
        {answers > 0 ? (
          <Divider textAlign="right" sx={{ width: "30%" }}>
            <a
              style={{ fontWeight: "500", cursor: "pointer", color: "gray" }}
              onClick={handleAnswers}
            >
              {!toogle
                ? "See " + answers + (answers > 1 ? " answers" : " answer")
                : "Hide answers"}
            </a>
          </Divider>
        ) : null}
      </Box>
      {toogle && clinics[ind]?.comments[id]?.answers.length > 0 ? (
        clinics[ind]?.comments[id]?.answers.map((item, Oid) => (
          <Box key={item.user_id}>
            <ClinicCommentAnswers ind={ind} id={id} Oid={Oid} />{" "}
            {
              //TODO generalizar
            }
          </Box>
        ))
      ) : (
        <div />
      )}
    </Box>
  );
};
