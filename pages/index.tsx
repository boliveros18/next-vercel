import { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layouts";
import { BodyCard } from "../components/ui";
import { Grid } from "@mui/material";
import { SideBar, RightBar } from "../components/ui";
import { ChatMessages } from "../components/chat";

interface Props {}

const HomePage: NextPage<Props> = ({}) => {
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
          alignItems="center"
        >
          <BodyCard loading={false} />
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default HomePage;
