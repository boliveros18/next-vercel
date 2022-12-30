import { useState, useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { dbClinics } from "../database";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/bodyCard";
import { Grid, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { SideBar, RightBar } from "../components/ui";
import { ChatMessages } from "../components/chat";
import { Clinic } from "../interfaces";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import { ClinicContext } from "../context/clinic/ClinicContext";
import { UIContext } from "../context/ui/UIContext";
import { getPrincipalClinics } from '../utils/arrayFunctions';

interface Props {
  clinic: Clinic[];
}

const HomePage: NextPage<Props> = ({ clinic }) => {

  const { setClinics } = useContext(ClinicContext);
  const { setLoading } = useContext(UIContext);
  const [value, setValue] = useState("recents");

  useEffect(() => {
    setClinics(getPrincipalClinics(clinic.flat()));
    setLoading(true);
  }, [clinic, setClinics, setLoading]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
          <BottomNavigation
            sx={{
              display: { xs: "block", sm: "none", md: "none" },
              pt: 1,
              pb: 1,
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Procedures"
              icon={<AccessibilityNewOutlinedIcon />}
              sx={{ color: "#c4bebe", width: "33.33%" }}
            />
            <BottomNavigationAction
              label="Ticket"
              icon={<AirplanemodeActiveOutlinedIcon />}
              sx={{ color: "#c4bebe", width: "33.33%" }}
            />
            <BottomNavigationAction
              label="Hotels"
              icon={<RoomServiceOutlinedIcon />}
              sx={{ color: "#c4bebe", width: "33.33%" }}
            />
          </BottomNavigation>
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
  const clinic = await dbClinics.getAllClinics();

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
