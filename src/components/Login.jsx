import React from "react";
import { TextField, Button, Typography, Box, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../utils/api";

const validationSchema = Yup.object({
  identifier: Yup.string().required("Phone Number or Email is required"),
});

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const formik = useFormik({
    initialValues: { identifier: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // API call to Node.js backend to initiate login
        
        const res = await api.post("/auth/login/send-otp", {
          identifier: values.identifier,
        });
        console.log(res);
        console.log("Login Data:", values);
        // Simulate success and move to OTP screen
        onLoginSuccess(values.identifier);
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    },
  });

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
