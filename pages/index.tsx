import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbClinics, dbLikes, dbMedics, dbUsers } from "../database";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/home";
import { Grid } from "@mui/material";
import { BottomBar, SideBar, RightBar } from "../components/ui";
import { Clinic, Like, User, Medic } from "../interfaces";
import { LikeContext } from "../context/like";
import { ClinicContext } from "../context/clinic";
import { UIContext } from "../context/ui/UIContext";
import { AuthContext } from "../context/auth/AuthContext";
import { MedicContext } from "../context/medic/MedicContext";

interface Props {
  principal: Clinic;
  like: Like;
  user: User;
  medic: Medic;
}

const HomePage: NextPage<Props> = ({ principal, like, user, medic }) => {
  const { setUser } = useContext(AuthContext);
  const { setMedic } = useContext(MedicContext);
  const { addLikes } = useContext(LikeContext);
  const { setPrincipal } = useContext(ClinicContext);
  const { setLoading } = useContext(UIContext);

  useEffect(() => {
    setUser(user);
    setMedic(medic);
    addLikes(like);
    setPrincipal(principal);
    setLoading(true);
  }, [
    user,
    setUser,
    medic,
    setMedic,
    like,
    addLikes,
    setLoading,
    principal,
    setPrincipal,
  ]);

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
          {<HomeCard />}
        </Grid>
        <Grid
          item
          xs={4}
          sm={6}
          md={4}
          sx={{
            display: { xs: "none", sm: "block", md: "block" },
          }}
          justifyContent="flex-end"
        >
          <RightBar />
        </Grid>
      </Grid>
      <BottomBar />
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const principal = await dbClinics.getPrincipalClinic();
  const user = await dbUsers.getUserNameAndPhotoById(session?.user?._id || "");
  const medic = await dbMedics.getMedicByUserId(user?._id || "");
  const like = await dbLikes.getLikeByParentIdAndUserId(
    principal._id || "",
    session?.user?._id || ""
  );

  if (!principal) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user,
      medic: medic,
      principal: principal,
      like: like,
    },
  };
};

export default HomePage;
