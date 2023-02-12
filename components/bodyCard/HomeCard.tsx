import { FC, useContext } from "react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  CardActionArea,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  CardActionsUi,
  CardDetailUi,
  GuideBar,
  ReadMore,
  SeeComments,
} from "../ui";
import { WindowSize, UseWindowSize } from "../../utils";
import { ClinicContext } from "../../context/clinic";
import { AuthContext } from "../../context/auth";
import { UIContext } from "../../context/ui";
import { SingInUi, ShareMediaUi } from "../ui";
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
      <SeeComments parent_id={principal[0]?._id || ""}>
        <Card
          sx={{
            width: "100%",
            minHeight: height - (!isLoggedIn ? 230 : 270),
          }}
          elevation={0}
        >
          <GuideBar />
          <CardHeader
            avatar={
              loading && (
                <Avatar alt={principal[0]?.name} src={principal[0]?.avatar} />
              )
            }
            action={
              loading && (
                <ShareMediaUi
                  name={principal[0]?.name}
                  description={
                    principal[0]?.finantial +
                    ". " +
                    principal[0]?.speciality +
                    ". " +
                    principal[0]?.technology
                  }
                />
              )
            }
            title={
              loading && (
                <Typography
                  sx={{ fontSize: 15, fontWeight: 500 }}
                      >
                  {principal[0]?.name + " "}
                  {principal[0]?.certified ? (
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
              loading && (
                principal[0]?.province + ", " + principal[0]?.country
              )
            }
          />
          <CardActionArea
            onClick={() => router.push(`/clinic/${principal[0]?._id}`)}
          >
            {loading && (
              <CardMedia
                component="img"
                height={height - 500}
                image={principal[0]?.photo}
                alt="Clinic"
                sx={{ maxHeight: "330px" }}
              />
            )}
          </CardActionArea>
          { loading && <CardActionsUi parent_id={principal[0]?._id || ""} />
          }
          <CardContent>
            { loading && (
              <>
                <CardDetailUi
                  author=""
                  comment={
                    mobile ? (
                      <ReadMore text={principal[0]?.finantial+ ". " + principal[0]?.speciality + ". " + principal[0]?.technology} />
                    ) : (
                      principal[0]?.finantial+ ". " + principal[0]?.speciality + ". " + principal[0]?.technology
                    )
                  }
                  info={true && !isLoggedIn}
                ></CardDetailUi>
              </>
            )}
          </CardContent>
        </Card>
      </SeeComments>
      <SingInUi />
    </>
  );
};
