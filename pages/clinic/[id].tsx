import { GetServerSideProps, NextPage } from "next";
import { dbCertifications, dbClinics, dbQualifications } from "../../database";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { ReadMore } from "../../components/ui";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { WindowSize, UseWindowSize } from "../../utils";
import { InstagramLink } from "../../components/ui";
import { ItemQualification } from "../../components/ui";
import { Layout } from "../../components/layouts";
import { SideBar } from "../../components/ui";
import { Clinic, Certification, Qualification } from "../../interfaces";

interface Props {
  clinic: Clinic;
  certification: Certification;
  qualifications: Qualification[];
}

const ClinicPage: NextPage<Props> = ({
  clinic,
  certification,
  qualifications,
}) => {
  const mobile = UseWindowSize();
  const size = WindowSize();

  return (
    <Layout>
      <Grid container spacing={0} rowSpacing={2}>
        <Grid
          item
          xs={8}
          sm={4}
          md={3}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          justifyContent="flex-start"
        >
          <SideBar keepOpen={true} />
        </Grid>
        <Grid item xs={12} sm={6} md={5} justifyContent="center">
          <Card
            sx={{
              width: "100%",
              minHeight: size.height - 219,
            }}
            elevation={0}
          >
            <Typography align="center" sx={{ fontWeight: "medium", mt: 1 }}>
              {clinic.name + " "}
              {clinic.certified ? (
                <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
              ) : (
                <CheckCircleOutlineIcon
                  sx={{ color: "gray", fontSize: "15px" }}
                />
              )}
            </Typography>
            <CardMedia
              component="img"
              height={size.height - 500}
              image={clinic.photo}
              alt="Clinic"
              sx={{ marginTop: 1, maxHeight: "330px" }}
            />
            <CardContent>
              {
                <ItemQualification
                  qualifications={qualifications}
                  Qualification={clinic.qualification}
                />
              }
              <Divider sx={{ mt: 1 }} />
              <Card sx={{ display: "flex" }} elevation={0}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
                      {certification?.name || ""}
                    </Typography>
                    <Grid sx={{ fontSize: 14 }}>
                      {mobile ? (
                        <ReadMore text={certification?.description || ""} />
                      ) : (
                        certification?.description || ""
                      )}
                    </Grid>
                  </CardContent>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <CardMedia
                  component="img"
                  sx={{
                    width: certification?.logo ? 70 : 0,
                    m: 1,
                    border: 0,
                  }}
                  image={certification?.logo}
                  alt=""
                />
              </Card>
              <Divider />
              <InstagramLink
                instagram={clinic.instagram}
                phone={clinic.phone}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const clinic = await dbClinics.getClinicById(id);
  const certification = await dbCertifications.getCertificationByParentId(id);
  const qualifications = await dbQualifications.getQualificationByParentId(id);

  if (!clinic) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      clinic,
      certification,
      qualifications,
    },
  };
};

export default ClinicPage;
