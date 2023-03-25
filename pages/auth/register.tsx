import { useState, useContext } from "react";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import { signIn, getSession } from "next-auth/react";
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
import Image from "next/image";
import { AuthContext } from "../../context/auth";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { PrivacyPolicy } from "../../components/ui";
import { MedicService } from "../../services";
import { Medic } from "../../interfaces";
import { dbMedics } from "../../database";

type FormData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("client");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(
      name,
      email,
      password,
      userRole
    );

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title={"Register"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Grid
          display="flex"
          justifyContent="center"
          sx={{ marginBottom: 4, marginTop: 18 }}
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
              <Typography variant="h5">{`Create a ${userRole} account`}</Typography>
              <Chip
                label="We cannot reconize this email address"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="First and last name"
                variant="outlined"
                fullWidth
                {...register("name", {
                  required: "This field is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Enter your email",
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
            <Grid item display={{ xs: "none" }}>
              <TextField
                label="Role"
                variant="outlined"
                value={userRole}
                fullWidth
                {...register("role", {
                  required: "This field is required",
                })}
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
          sx={{ fontSize: 15 }}
        >
          Already have an account?&nbsp;
          <NextLink href="/auth/login" passHref>
            <Link underline="none" color="#001B87" sx={{ fontWeight: "500" }}>
              Sing In
            </Link>
          </NextLink>
        </Grid>
        {userRole === "medic" ? (
          <Grid
            item
            display="flex"
            justifyContent="end"
            sx={{ fontSize: 15, marginBottom: 3 }}
          >
            Do you need any procedure?&nbsp;
            <Link
              underline="none"
              color="#001B87"
              sx={{ fontWeight: "500", cursor: "pointer" }}
              onClick={() => setUserRole("client")}
            >
              Sign Up as a Client
            </Link>
          </Grid>
        ) : (
          <Grid
            item
            display="flex"
            justifyContent="end"
            sx={{ fontSize: 15, marginBottom: 3 }}
          >
            Are you a specialist doctor?&nbsp;
            <Link
              underline="none"
              color="#001B87"
              sx={{ fontWeight: "500", cursor: "pointer" }}
              onClick={() => setUserRole("medic")}
            >
              Sign Up as a partner
            </Link>
          </Grid>
        )}
        <Divider />
        <PrivacyPolicy />
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  if (session) {
    const medic = await dbMedics.createMedic({
      parent_id: session?.user?._id,
    } as Medic);
    const { m = `/account/medic/${medic._id}` } = query;
    const { p = "/" } = query;
    return {
      redirect: {
        destination:
          session.user?.role === "medic" ? m.toString() : p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
