import React from "react";
import { TextField, Button, Typography, Box, Divider } from "@mui/material";
import { useLoginForm } from "../hooks/useAuthForms";

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

      <TextField
        fullWidth
        id="identifier"
        name="identifier"
        label="Phone Number or Email"
        variant="outlined"
        margin="normal"
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

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "#E86A33",
          "&:hover": { bgcolor: "#d35f2d" },
          borderRadius: 5,
          py: 1.5,
        }}
      >
        Login
      </Button>

      <Divider sx={{ my: 3 }}>or</Divider>

      <Typography
        align="center"
        variant="body2"
        sx={{ cursor: "pointer", color: "text.secondary" }}
        onClick={onSwitchToRegister}
      >
        New here? <b>Create an Account</b>
      </Typography>
    </Box>
  );
};

export default Login;
