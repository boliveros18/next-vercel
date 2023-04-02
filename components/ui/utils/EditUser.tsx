import { FC, ReactNode, useState, useContext } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Grid,
  TextField,
  Chip,
} from "@mui/material";
import { User } from "../../../interfaces";
import { AuthContext } from "../../../context/auth";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { validations } from "../../../utils";
import { capitalize } from "../../../utils/strings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface Props {
  children?: ReactNode;
}

type FormData = {
  name: string;
  email: string;
  password: string;
};

export const EditUser: FC<Props> = ({}) => {
  const { user, updateUser } = useContext(AuthContext);
  const [toggleEdit, setToggleEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onUpdateForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await updateUser(user?._id || "", {
      ...(user as User),
      ["name"]: capitalize(name),
      ["email"]: email,
      ["password"]: password,
    });

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setToggleEdit(false);
  };

  return (
    <>
      <IconButton
        sx={{
          borderRadius: 0,
          color: "#001B87",
        }}
        onClick={() => setToggleEdit(!toggleEdit)}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: "500",
            borderRadius: 0,
          }}
        >
          Edit Profile
        </Typography>
        {toggleEdit ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      {toggleEdit && (
        <form onSubmit={handleSubmit(onUpdateForm)} noValidate>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Chip
                  label="We cannot reconize this email address or is in use."
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
        </form>
      )}
    </>
  );
};

export default EditUser;
