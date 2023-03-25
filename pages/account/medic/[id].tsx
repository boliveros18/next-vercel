import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbMedics } from "../../../database";
import { Layout } from "../../../components/layouts";
import { Grid } from "@mui/material";
import { UIContext } from "../../../context/ui/UIContext";
import { Medic } from "../../../interfaces";

interface Props {
  medic: Medic;
}

const HomePage: NextPage<Props> = ({ medic }) => {
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
        ></Grid>
        <Grid item xs={12} sm={6} md={5} justifyContent="center">
          {medic.parent_id}
        </Grid>
      </Grid>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const session = await getSession({ req });
  const { id } = params as { id: string };
  const medic = await dbMedics.getMedicById(id);
  if (!medic || !session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      medic: medic,
    },
  };
};

export default HomePage;
