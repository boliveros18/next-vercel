import * as React from "react";
import { GetServerSideProps, NextPage } from "next";
import { dbEntries } from "../database";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/bodyCard";
import { Grid } from "@mui/material";
import { SideBar, RightBar } from "../components/ui";
import { ChatMessages } from "../components/chat";
import { Clinic } from "../interfaces";

interface Props {
  clinic: Clinic;
}

const HomePage: NextPage<Props> = ({clinic}) => {

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
          <SideBar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          display="flex"
          justifyContent="center"
        >
          <HomeCard clinic={clinic} />
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
          <RightBar>
            <ChatMessages />
          </RightBar>
        </Grid>
      </Grid>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  //const { id } = params as { id: string };

  const clinic = await dbEntries.getClinicById("638f784d3299c817f2182c74");

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
      clinic: clinic,
    },
  };
};


export default HomePage;
