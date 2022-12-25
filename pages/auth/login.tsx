import { useState, useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../context/auth";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    // Todo: navegar a la pantalla que el usuario estaba
    router.replace("/");
  };

  return (
    <AuthLayout title={"Sing-In"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Grid
          display="flex"
          justifyContent="center"
          sx={{ marginBottom: 4, marginTop: 10 }}
        >
          <NextLink href="/" passHref>
            <Link style={{ textDecoration: "none" }}>
              <Image
                src="/Brand.png"
                width={139}
                height={40}
                alt="logo"
              ></Image>
            </Link>
          </NextLink>
        </Grid>
        <Box
          sx={{
            width: 350,
            padding: "25px 20px",
            border: 1,
            borderColor: "lightgray",
            borderRadius: "5px",
            marginBottom: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Sign In</Typography>
              <Chip
                label="We cannot find an account with that email address"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Enter your email ",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", {
                  required: "This field is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                size="small"
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="outlined"
                size="medium"
                color="primary"
                sx={{
                  width: "90%",
                  color: "black",
                }}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="end"
          sx={{ fontSize: 15, marginBottom: 3 }}
        > New to iMedical?&nbsp;
          <NextLink href="/auth/register" passHref>
            <Link underline="none" color="#001B87" sx={{fontWeight: "500"}}>
             Sing Up
            </Link>
          </NextLink>
        </Grid>
        <Divider />
        <Typography sx={{ fontSize: 13, marginTop: 6 }} align="center">
          Super Medical group -{" "}
          <NextLink href="./privacynotice">
            <Link
            underline="none"
              style={{
                fontWeight: "500",
                color: "#001B87",
              }}
            >
              Privacy notice
            </Link>
          </NextLink>
          <br />
          <NextLink href="./conditionuse">
            <Link
            underline="none"
              style={{
                fontWeight: "500",
                color: "#001B87",
              }}
            >
              Condition of Use
            </Link>
          </NextLink>{" "}
          Copyright (c) 2022
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
