import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Typography, Card, CardContent, Grid, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getSession } from "next-auth/react";
import { dbMedics, dbProducts, dbClinics } from "../../../database";
import { Layout } from "../../../components/layouts";
import { Medic, Product, Clinic } from "../../../interfaces";
import { AuthContext } from "../../../context/auth";
import {
  SelectCategoryAndProcedure,
  MedicAccountCard,
  EditUser,
  ManageClinics,
} from "../../../components/ui";
import { ProductContext } from "../../../context/product";
import { ClinicContext } from "../../../context/clinic";
import { ImageContext } from "../../../context/image";
import { MedicContext } from "../../../context/medic";
import { UIContext } from "../../../context/ui";
import CompleteMedicProfile from "../../../components/ui/medic/CompleteMedicProfile";

interface Props {
  id: string;
  medic: Medic;
  products: Product[];
  clinics: Clinic[];
}

const AccountMedicPage: NextPage<Props> = ({ id, medic, products, clinics }) => {
  const { progress } = useContext(UIContext);
  const { setMedic } = useContext(MedicContext);
  const { clinic, getClinic,  } = useContext(ClinicContext);
  const { index } = useContext(ProductContext);
  const { getImagesByParentId } = useContext(ImageContext);
  const { getUser } = useContext(AuthContext);

  useEffect(() => {
    getUser(id);
    setMedic(medic);
    getImagesByParentId(id || "");
    getClinic(products[index]?.clinic_id || "");
  }, [
    id,
    medic,
    setMedic,
    getUser,
    getClinic,
    getImagesByParentId,
    index,
    products,
  ]);

  return (
    <Layout>
      {progress && (
        <CircularProgress sx={{ position: "absolute", marginLeft: "50%" }} />
      )}
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
              <EditUser medic={medic} />
              <CompleteMedicProfile medic={medic}/>
              <ManageClinics clinics={clinics} />
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
  const _id = medic?.parent_id;
  const products = await dbProducts.getProductsByMedicId(id);
  const clinics = await dbClinics.getClinicsByMedicId(id)
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
      id: _id,
      medic: medic,
      products: products,
      clinics: clinics
    },
  };
};

export default AccountMedicPage;
