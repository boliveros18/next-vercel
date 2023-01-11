import { FC, useContext, useState, useEffect } from "react";
import * as React from "react";
import { ClinicContext } from "../../../context/clinic";
import { AuthContext } from "../../../context/auth";
import { Clinic } from "../../../interfaces";
import { Card, CardHeader, Avatar, IconButton, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardDetailUi, ItemRefUi } from "../";
import { getFormatDistanceToNow } from "../../../utils";

interface Props {
  id: number;
  Oid: number;
}

export const AnswerUi: FC<Props> = ({ id, Oid }) => {
  const { clinics, updateClinic } = useContext(ClinicContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({} as Clinic);

  useEffect(() => {
    setInputs(clinics[0]);
  }, [clinics]);

  const index = clinics[0].comments[id].answers[Oid].likes.findIndex(
    (i) => i.user_id === user?._id
  );

  const handleLike = async () => {
    if (
      clinics[0]?.comments[id].answers[Oid].likes.filter(
        (i) => i.user_id === user?._id
      ).length === 1
    ) {
      inputs.comments[id].answers[Oid].likes[index].approved =
        !clinics[0]?.comments[id].answers[Oid].likes[index].approved;
      setInputs({ ...inputs });
      await updateClinic(clinics[0]._id, inputs);
    } else {
      inputs.comments[id].answers[Oid].likes.push({
        user_id: user?._id || "",
        user_name: user?.name || "",
        approved: true,
      });
      setInputs({ ...inputs });
      await updateClinic(clinics[0]?._id, inputs);
    }
  };

  return (
    <Card sx={{ maxWidth: "100%", ml: 4, mt: -3 }} elevation={0}>
      <CardHeader
        avatar={
          <Avatar
            alt={clinics[0]?.comments[id].answers[Oid].user_name}
            src={clinics[0]?.comments[id].answers[Oid].user_photo}
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
            {clinics[0]?.comments[id].answers[Oid].likes[index]?.approved &&
            isLoggedIn ? (
              <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
            ) : (
              <CheckCircleOutlineIcon sx={{ fontSize: "15px" }} />
            )}
          </IconButton>
        }
        title={
          <CardDetailUi
            author={clinics[0]?.comments[id].answers[Oid].user_name}
            link={`./api/user/${clinics[0]?.comments[id].answers[Oid].user_id}`}
            comment={
              <ItemRefUi
                author={
                  "@" +
                  clinics[0]?.comments[id].answers[Oid].user_tag_name +
                  " "
                }
                link={`./api/user/${clinics[0]?.comments[id].answers[Oid].user_tag_id}`}
                tag={true}
              >
                {clinics[0]?.comments[id].answers[Oid].description}
              </ItemRefUi>
            }
          />
        }
        subheader={
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <span>
                {getFormatDistanceToNow(
                  clinics[0]?.comments[id].answers[Oid].createdAt
                )}
              </span>
            </Grid>
            <Grid item xs={5}>
              <span>
                {
                  clinics[0]?.comments[id].answers[Oid].likes.filter(
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
  );
};
