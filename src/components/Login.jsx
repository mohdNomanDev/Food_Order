import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { useLoginForm } from "../hooks/useAuthForms";
import AuthButton from "./common/AuthButton";
import AuthInput from "./common/AuthInput";
import FormLink from "./common/FormLink";

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const { formik } = useLoginForm(onLoginSuccess);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
        Login to Order
      </Typography>

      <AuthInput
        id="identifier"
        name="identifier"
        label="Phone Number or Email"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.touched.identifier && Boolean(formik.errors.identifier)}
        helperText={formik.touched.identifier && formik.errors.identifier}
      />

      <Typography
        align="right"
        variant="caption"
        display="block"
        sx={{ cursor: "pointer", color: "text.secondary", mb: 2 }}
      >
        Forgot Password?
      </Typography>

      <AuthButton type="submit">Login</AuthButton>

      <Divider sx={{ my: 3 }}>or</Divider>

      <FormLink
        text="New here?"
        linkText="Create an Account"
        onClick={onSwitchToRegister}
      />
    </Box>
  );
};

export default Login;
