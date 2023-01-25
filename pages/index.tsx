import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  dbAnswers,
  dbCertifications,
  dbClinics,
  dbComments,
  dbLikes,
  dbQualifications,
} from "../database";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/bodyCard";
import { Grid } from "@mui/material";
import { BottomBar, SideBar, RightBar } from "../components/ui";

import {
  Answer,
  Certification,
  Clinic,
  Comment,
  Like,
  Qualification,
} from "../interfaces";
import { AnswerContext } from "../context/answer";
import { CertificationContext } from "../context/certification";
import { ClinicContext } from "../context/clinic";
import { CommentContext } from "../context/comment";
import { LikeContext } from "../context/like";
import { QualificationContext } from "../context/qualification";
import { UIContext } from "../context/ui/UIContext";

interface Props {
  answer: Answer[];
  certification: Certification[];
  clinic: Clinic[];
  comment: Comment[];
 // like: Like[];
  qualification: Qualification[];
}

const HomePage: NextPage<Props> = ({
  answer,
  certification,
  clinic,
  comment,
  //like,
  qualification,
}) => {
  const { setAnswers } = useContext(AnswerContext);
  const { setCertifications } = useContext(CertificationContext);
  const { setClinics } = useContext(ClinicContext);
  const { setComments } = useContext(CommentContext);
  //const { setLikes } = useContext(LikeContext);
  const { setQualifications } = useContext(QualificationContext);
  const { setLoading } = useContext(UIContext);

  useEffect(() => {
    setAnswers(answer.flat());
    setCertifications(certification.flat());
    setClinics(clinic.flat());
    setComments(comment.flat());
    //setLikes(like?.flat());
    setQualifications(qualification.flat());
    setLoading(true);
  }, [
    answer,
    certification,
    clinic,
    comment,
    //like,
    qualification,
    setAnswers,
    setCertifications,
    setClinics,
    setComments,
    //setLikes,
    setQualifications,
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
          <HomeCard />
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
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const answer = await dbAnswers.getAllAnswers();
  const certification = await dbCertifications.getAllCertifications();
  const clinic = await dbClinics.getAllClinics();
  const comment = await dbComments.getAllComments();
  //const like = await dbLikes.getAllLikes();
  const qualification = await dbQualifications.getAllQualifications();

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
      answer: [answer],
      certification: [certification],
      clinic: [clinic],
      comment: [comment],
      //like: [like],
      qualification: [qualification],
    },
  };
};

export default HomePage;
