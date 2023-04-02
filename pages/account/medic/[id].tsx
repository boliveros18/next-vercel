import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import { getSession } from "next-auth/react";
import { dbMedics, dbProducts } from "../../../database";
import { Layout } from "../../../components/layouts";
import { Medic, Product } from "../../../interfaces";
import { AuthContext } from "../../../context/auth";
import {
  SelectCategoryAndProcedure,
  MedicAccountCard,
  AccordionUi,
  EditUser,
} from "../../../components/ui";
import { ProductContext } from "../../../context/product";
import { ClinicContext } from "../../../context/clinic";

interface Props {
  medic: Medic;
  products: Product[];
}

const AccountMedicPage: NextPage<Props> = ({ medic, products }) => {
  const { clinic, getClinic } = useContext(ClinicContext);
  const { index } = useContext(ProductContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getClinic(products[index].clinic_id);
  }, [getClinic, index, products]);

  return (
    <Layout>
      <Grid container spacing={0} rowSpacing={2}>
        <Grid
          item
          xs={0}
          sm={1}
          md={1}
          sx={{ display: { xs: "block", sm: "block", md: "block" } }}
          justifyContent="flex-start"
        ></Grid>
        <Grid item xs={12} sm={6} md={4} justifyContent="center">
          <Card
            sx={{
              width: "100%",
            }}
            elevation={0}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 400, mb: 1, ml: 2 }}>
              Medic Profile
            </Typography>
            <Divider />
            <SelectCategoryAndProcedure products={products} />
            <MedicAccountCard clinic={clinic} medic={medic} />
            <CardContent>
              <EditUser />
              <AccordionUi summary="Complete your medic profile"></AccordionUi>
            </CardContent>
          </Card>
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
  const products = await dbProducts.getProductsByMedicId(id);
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
      products: products,
    },
  };
};

export default AccountMedicPage;
