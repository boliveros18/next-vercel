import { FC, useContext } from "react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
  CardActionArea,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardActionsUi, GuideBar, SeeComments } from "../ui";
import { WindowSize, UseWindowSize } from "../../utils";
import { ClinicContext } from "../../context/clinic";
import { AuthContext } from "../../context/auth";
import { UIContext } from "../../context/ui";
import { SingInUi, ShareMediaUi, CardDetailUi, ReadMore } from "../ui";
import { useRouter } from "next/router";

interface Props {}

export const HomeCard: FC<Props> = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const mobile = UseWindowSize();
  const height = WindowSize().height;
  const { principal } = useContext(ClinicContext);
  const { loading } = useContext(UIContext);

  return (
    <>
      <SeeComments parent_id={principal?._id || ""} type={principal.type} initialAnswers={principal.comments}>
        <Card
          sx={{
            width: "100%",
            minHeight: height - (!isLoggedIn ? 230 : 245),
            mb: -2,
            pb: -2,
          }}
          elevation={0}
        >
          <GuideBar />
          <CardHeader
            sx={{ mt: -1, mb: -1 }}
            avatar={
              loading && (
                <Avatar alt={principal?.name} src={principal?.avatar} />
              )
            }
            action={
              loading && (
                <ShareMediaUi
                  name={principal?.name}
                  description={
                    principal?.finantial +
                    ". " +
                    principal?.speciality +
                    ". " +
                    principal?.technology
                  }
                />
              )
            }
            title={
              loading && (
                <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                  {principal?.name + " "}
                  {principal?.certified ? (
                    <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
                  ) : (
                    <CheckCircleOutlineIcon
                      fontSize="small"
                      sx={{ color: "gray", fontSize: "15px" }}
                    />
                  )}
                </Typography>
              )
            }
            subheader={
              loading && principal?.province + ", " + principal?.country
            }
          />
          <CardActionArea
            onClick={() => router.push(`/clinic/${principal?._id}`)}
          >
            {loading && (
              <CardMedia
                component="img"
                height={height - 500}
                image={principal?.photo}
                alt="Clinic"
                sx={{ maxHeight: "330px" }}
              />
            )}
          </CardActionArea>
          {loading && <CardActionsUi parent_id={principal?._id || ""} initialLikes={principal.likes}/>}
          {loading && (
            <div style={{ marginLeft: "17px" }}>
            <Typography
                  sx={{ fontSize: 15, fontWeight: "500", color: "#001B87", mt: 1.5, mb: 1 }}
                >
                  Finantial, Speciality & Technology
                </Typography>
                <CardDetailUi
                  author=""
                  comment={
                    mobile ? (
                      <ReadMore text={principal?.finantial+ ". " + principal?.speciality + ". " + principal?.technology} />
                    ) : (
                      principal?.finantial+ ". " + principal?.speciality + ". " + principal?.technology
                    )
                  }
                  info={true && !isLoggedIn}
                ></CardDetailUi>
            </div>
          )}
        </Card>
      </SeeComments>
      <SingInUi />
    </>
  );
};
