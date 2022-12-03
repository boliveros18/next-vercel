import * as React from "react";
import {Paper, BottomNavigation, BottomNavigationAction} from "@mui/material";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/bodyCard";
import { Grid } from "@mui/material";
import { SideBar, RightBar } from "../components/ui";
import { ChatMessages } from "../components/chat";

interface Props {}

const HomePage: NextPage<Props> = ({}) => {
  const [value, setValue] = React.useState("recents");

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
          <HomeCard  />
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
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          display: { xs: "block", sm: "none", md: "none" },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
          }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeOutlinedIcon fontSize="medium" />}
            />
            <BottomNavigationAction
              label="Procedures"
              icon={<AccessibilityNewOutlinedIcon fontSize="medium" />}
            />
            <BottomNavigationAction
              label="Tickets"
              icon={<AirplanemodeActiveOutlinedIcon fontSize="medium" />}
            />
            <BottomNavigationAction
              label="Hotels"
              icon={<RoomServiceOutlinedIcon fontSize="medium" />}
            />
          </BottomNavigation>
        </Paper>
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
