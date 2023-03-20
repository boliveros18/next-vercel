import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { dbUsers } from "../../../database";
import { Layout } from "../../../components/layouts";
import { Grid } from "@mui/material";
import { SideBar } from "../../../components/ui";
import { UIContext } from "../../../context/ui/UIContext";
import { User } from "../../../interfaces";

interface Props {
  medic: User;
}

const HomePage: NextPage<Props> = ({}) => {
  const { setLoading } = useContext(UIContext);

  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

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
      </Grid>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const medic = await dbMedics.getMedicById(id);   //TODO: create dbMedics, etc...

  if (!medic) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      medic: [medic],
    },
  };
};

export default HomePage;
