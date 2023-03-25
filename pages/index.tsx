import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbClinics, dbLikes } from "../database";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/home";
import { Grid } from "@mui/material";
import { BottomBar, SideBar, RightBar } from "../components/ui";
import { Clinic, Like } from "../interfaces";
import { LikeContext } from "../context/like";
import { ClinicContext } from "../context/clinic";
import { UIContext } from "../context/ui/UIContext";

interface Props {
  principal: Clinic;
  like: Like;
}

const HomePage: NextPage<Props> = ({ principal, like }) => {
  const { addLikes } = useContext(LikeContext);
  const { setPrincipal } = useContext(ClinicContext);
  const { setLoading } = useContext(UIContext);

  useEffect(() => {
    addLikes(like);
    setPrincipal(principal);
    setLoading(true);
  }, [like, addLikes, setLoading, principal, setPrincipal]);

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
      principal: principal,
      like: like,
    },
  };
};

export default HomePage;
