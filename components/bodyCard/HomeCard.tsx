import { FC, useState, useContext } from "react";
import * as React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Skeleton,
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
import Carousel from "react-material-ui-carousel";
import { getPrincipalClinics } from "../../utils/arrayFunctions";
import { ClinicDetails } from "../clinic";
import { WindowSize, UseWindowSize } from "../../utils";
import { QualificationContext } from "../../context/qualification";
import { ClinicContext } from "../../context/clinic";

import { AuthContext } from "../../context/auth";
import { SingInUi, ShareMediaUi } from "../ui";
import { UIContext } from "../../context/ui";

interface Props {}

export const HomeCard: FC<Props> = () => {
  const [index, setIndex] = useState<number>(0);
  const { isLoggedIn } = useContext(AuthContext);
  const { loading } = useContext(UIContext);
  const mobile = UseWindowSize();
  const height = WindowSize().height;
  const [toogle, setToogle] = useState(true);
  const { clinics } = useContext(ClinicContext);
  const { qualifications } = useContext(QualificationContext);

  const principalClinics = getPrincipalClinics(clinics, qualifications).flat()

  const handleThrough = () => {
    setToogle(!toogle);
  };

  const getIndex = (index: number) => {
    setIndex(index);
  };

  return (
    <>
      {toogle ? (
        <>
          <SeeComments parent_id={principalClinics[index]?._id}>
            <Carousel
              stopAutoPlayOnHover
              autoPlay={false}
              fullHeightHover={false}
              onChange={(now?: number) =>
                getIndex(now || 0)
              }
              indicators={false}
              swipe={false}
            >
              {principalClinics.map((item, n) => (
                <div key={n}>
                  <Card
                    sx={{
                      width: "100%",
                      height: height - 219,
                    }}
                    elevation={0}
                  >
                    <GuideBar />
                    <CardHeader
                      avatar={
                        !loading ? (
                          <Skeleton
                            animation="wave"
                            variant="circular"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <Avatar alt={item?.name} src={item?.avatar} />
                        )
                      }
                      action={
                        loading ? (
                          <ShareMediaUi
                            name={item?.name}
                            description={
                              item?.finantial +
                              ". " +
                              item?.speciality +
                              ". " +
                              item?.technology
                            }
                          />
                        ) : null
                      }
                      title={
                        loading ? (
                          <Typography
                            sx={{ fontSize: 15, textTransform: "capitalize" }}
                            variant="subtitle2"
                          >
                            {item?.name + " "}{" "}
                            {item?.certified ? (
                              <CheckCircleIcon
                                sx={{ color: "blue", fontSize: "15px" }}
                              />
                            ) : (
                              <CheckCircleOutlineIcon
                                fontSize="small"
                                sx={{ color: "gray", fontSize: "15px" }}
                              />
                            )}
                          </Typography>
                        ) : (
                          <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                          />
                        )
                      }
                      subheader={
                        loading ? (
                          item?.city + ", " + item?.country
                        ) : (
                          <Skeleton animation="wave" height={10} width="40%" />
                        )
                      }
                    />
                    <CardActionArea onClick={() => setToogle(!toogle)}>
                      {loading ? (
                        <CardMedia
                          component="img"
                          height={height - 500}
                          image={item?.photo}
                          alt="Clinic"
                          sx={{ maxHeight: "330px" }}
                        />
                      ) : (
                        <Skeleton
                          height={170}
                          animation="wave"
                          variant="rectangular"
                        />
                      )}
                    </CardActionArea>
                    {loading ? (
                      <CardActionsUi parent_id={principalClinics[index]?._id}/>
                    ) : (
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="10%"
                        sx={{ marginTop: 2 }}
                      />
                    )}
                    <CardContent>
                      {loading ? (
                        <CardDetailUi
                          author="Finantial"
                          comment={
                            mobile ? (
                              <ReadMore text={item?.finantial} />
                            ) : (
                              item?.finantial
                            )
                          }
                          info={true && !isLoggedIn}
                        ></CardDetailUi>
                      ) : (
                        <Skeleton animation="wave" height={20} width="50%" />
                      )}
                      {loading ? (
                        <CardDetailUi
                          author="Speciality"
                          comment={
                            mobile ? (
                              <ReadMore text={item?.speciality} />
                            ) : (
                              item?.speciality
                            )
                          }
                          info={true && !isLoggedIn}
                        ></CardDetailUi>
                      ) : (
                        <Skeleton animation="wave" height={20} width="60%" />
                      )}
                      {loading ? (
                        <CardDetailUi
                          author="Technology"
                          comment={
                            mobile ? (
                              <ReadMore text={item?.technology} />
                            ) : (
                              item?.technology
                            )
                          }
                          info={true && !isLoggedIn}
                        ></CardDetailUi>
                      ) : (
                        <Skeleton animation="wave" height={20} width="80%" />
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Carousel>
          </SeeComments>
          <SingInUi />
        </>
      ) : (
        <ClinicDetails
          handleThrough={handleThrough}
          index={index}
        ></ClinicDetails>
      )}
    </>
  );
};
