import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { dbClinics } from "../../../database";
import { Layout } from "../../../components/layouts";
import { Grid } from "@mui/material";
import { SideBar } from "../../../components/ui";
import { UIContext } from "../../../context/ui/UIContext";

interface Props {

}

const HomePage: NextPage<Props> = ({ }) => {

  const { setLoading } = useContext(UIContext);

  useEffect(() => {

    setLoading(true);
  }, [ setLoading ]);

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

    const { id } = params as { id: string }
    const clinic = await dbClinics.getClinicById("63ab77d06d6dc52c56dc662b");

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
      clinic: [clinic],
    },
  };
};

export default HomePage;
