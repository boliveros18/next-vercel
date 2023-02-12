import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbClinics, dbComments, dbLikes, dbAnswers } from "../database";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/bodyCard";
import { Grid } from "@mui/material";
import { BottomBar, SideBar, RightBar } from "../components/ui";

import { Clinic, Comment, Like, Answer } from "../interfaces";
import { LikeContext } from "../context/like";
import { ClinicContext } from "../context/clinic";
import { CommentContext } from "../context/comment";
import { AnswerContext } from "../context/answer";
import { UIContext } from "../context/ui/UIContext";

interface Props {
  principal: Clinic[];
  clinics: Clinic[];
  comments: Comment[];
  likes: Like[];
  length: number;
  answers: Answer[];
}

const HomePage: NextPage<Props> = ({
  principal,
  clinics,
  comments,
  likes,
  length,
  answers,
}) => {
  const { setPrincipals, setPrincipal } = useContext(ClinicContext);
  const { setLength, setLikes } = useContext(LikeContext);
  const { setComments } = useContext(CommentContext);
  const { setAnswers } = useContext(AnswerContext);
  const { setLoading } = useContext(UIContext);

  useEffect(() => {
    setPrincipal(principal);
    setPrincipals(clinics);
    setComments(comments);
    setAnswers(answers);
    setLoading(true);
    setLikes(likes);
    setLength(length);
  }, [
    likes,
    setLikes,
    length,
    setLength,
    principal,
    clinics,
    comments,
    answers,
    setAnswers,
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
  const length = await dbLikes.getLikeLengthByParentId(principal[0]?._id || "");
  let comments: any = []
  if(await dbComments.getCommentsByParentId(principal[0]._id || "") !== null){
    comments = await dbComments.getCommentsByParentId(principal[0]._id || "");
  }
  const ans: any = [];
  for (let i = 0; i < comments.length; i++) {
    if ((await dbAnswers.getAnswersByParentId(comments[i]?._id)) !== null)
      ans.push(await dbAnswers.getAnswersByParentId(comments[i]?._id));
  }
  const answers: any = [];
  for (let i = 0; i < ans.length; i++) {
    for (let n = 0; n < ans[i].length; n++) {
      answers.push(ans[i][n]);
    }
  }
  const likes: any = [];
  const like = await dbLikes.getLikeByParentIdAndUserId(
    principal[0]._id || "",
    session?.user?._id || ""
  );
  if (like !== null) {
    likes.push(like);
  }
  for (let i = 0; i < comments.length; i++) {
    if ((await dbLikes.getLikesByParentId(comments[i]?._id)) !== null)
      likes.push(await dbLikes.getLikesByParentId(comments[i]?._id));
  }
  for (let i = 0; i < answers.length; i++) {
    if ((await dbLikes.getLikesByParentId(answers[i]?._id)) !== null)
      likes.push(await dbLikes.getLikesByParentId(answers[i]?._id));
  }
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
      principal: principal,
      clinics: clinics,
      comments: comments,
      answers: answers,
      likes: likes,
      length: length,
    },
  };
};

export default HomePage;
