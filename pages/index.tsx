import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbClinics, dbComments, dbLikes } from "../database";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/bodyCard";
import { Grid } from "@mui/material";
import { BottomBar, SideBar, RightBar } from "../components/ui";

import { Clinic, Comment, Like } from "../interfaces";
import { LikeContext } from "../context/like";
import { ClinicContext } from "../context/clinic";
import { CommentContext } from "../context/comment";
import { UIContext } from "../context/ui/UIContext";

interface Props {
  principal: Clinic[];
  clinics: Clinic[];
  comments: Comment[];
  like: Like[];
  likeLength: [];
}

const HomePage: NextPage<Props> = ({
  principal,
  clinics,
  comments,
  like,
  likeLength,
}) => {
  const { setPrincipals, setPrincipal } = useContext(ClinicContext);
  const { setPrincipalLike, setLikeLength } = useContext(LikeContext);
  const { setComments } = useContext(CommentContext);
  const { setLoading } = useContext(UIContext);

  useEffect(() => {
    setPrincipal(principal.flat());
    setPrincipals(clinics.flat());
    setComments(comments.flat());
    setLoading(true);
    setPrincipalLike(like);
    setLikeLength(likeLength.flat()[0]);
  }, [
    like,
    setPrincipalLike,
    likeLength,
    setLikeLength,
    principal,
    clinics,
    comments,
    setPrincipal,
    setPrincipals,
    setComments,
    setLoading,
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
  const clinics = await dbClinics.getPrincipalsClinics();
  const comments = await dbComments.getCommentsByParentId(principal[0]._id || "");
  const like = await dbLikes.getLikeByParentIdAndUserId(
    principal[0]._id || "",
    session?.user?._id || ""
  );
  const likeLength = await dbLikes.getLikeLengthByParentId(
    principal[0]?._id || ""
  );

  if (!clinics) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      principal: [principal],
      clinics: [clinics],
      comments: [comments],
      like: [like],
      likeLength: [likeLength],
    },
  };
};

export default HomePage;
