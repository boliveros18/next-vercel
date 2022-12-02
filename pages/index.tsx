import * as React from "react";
import { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layouts";
import { BodyCard } from "../components/ui";
import { Grid } from "@mui/material";
import { SideBar, RightBar } from "../components/ui";
import { ChatMessages } from "../components/chat";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
      <Grid
          item
          xs={12}
          sm={6}
          md={5}
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
          <BottomNavigationAction label="Cart" icon={<AddShoppingCartIcon />} />
          <BottomNavigationAction
            label="Chats"
            icon={<ChatBubbleOutlineIcon />}
          />
          <BottomNavigationAction label="People" icon={<PeopleAltIcon />} />
          <BottomNavigationAction
            label="Notifications"
            icon={<NotificationsNoneIcon />}
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
