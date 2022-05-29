import { AuthLayout } from "app/layout";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/schema";
import { Creds } from "app/model/Auth";
import { useAuthenticationStore } from "app/providers/RootStoreProvider";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const Login = () => {
  const { login, error } = useAuthenticationStore();
  const {
    formState: { errors, isDirty, isValid },
    register,
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (values: Creds) => {
    login(values);
  };

  useEffect(() => {
    if (error.type === "username")
      setError("username", { message: error.message });
  }, [error]);
  return (
    <AuthLayout>
      <Typography component="h2" sx={{ fontSize: "30px" }}>
        Login
      </Typography>
      <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
          <InputLabel
            htmlFor="username"
            shrink
            sx={{ fontSize: "22px", fontWeight: 600 }}
          >
            Username
          </InputLabel>
          <TextField
            placeholder="Enter username"
            id="username"
            fullWidth
            {...register("username")}
            error={!!errors?.username}
            data-testid="username"
            helperText={errors?.username?.message}
            sx={(theme) => ({
              "& fieldset": {
                borderRadius: "8px",
              },
              "& input": {
                padding: "12.5px 14px",
              },
              "label + &": {
                marginTop: theme.spacing(3.5),
              },
            })}
          ></TextField>
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
          <InputLabel
            htmlFor="username"
            shrink
            sx={{ fontSize: "22px", fontWeight: 600 }}
          >
            Password
          </InputLabel>
          <TextField
            placeholder="Enter password"
            id="username"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors?.password}
            helperText={errors?.password?.message}
            sx={(theme) => ({
              "& fieldset": {
                borderRadius: "8px",
              },
              "& input": {
                padding: "12.5px 14px",
              },
              "label + &": {
                marginTop: theme.spacing(3.5),
              },
            })}
          ></TextField>
        </FormControl>
        {error.type === "login" ? (
          <FormHelperText error={true}>{error.message}</FormHelperText>
        ) : null}
        <Button
          variant="contained"
          fullWidth
          disabled={!(isDirty && isValid)}
          type="submit"
          sx={{
            mt: 7,
            textTransform: "none",
            fontSize: "16px",
            "&": {
              padding: "9.5px 16px",
              borderRadius: "8px",
            },
          }}
        >
          Log in
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default observer(Login);
