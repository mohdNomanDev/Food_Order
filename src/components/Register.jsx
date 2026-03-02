import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../utils/api";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Please enter a valid name"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Invalid Phone Number")
    .required("Phone Number is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { fullName: "", phoneNumber: "", terms: false },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // API call to your Node.js backend
        setError(""); // Clear previous errors
        const res = await api.post("/auth/register", {
          name: values.fullName,
          phone: values.phoneNumber,
          terms: values.terms,
        });

        
        resetForm(); // Clear form after successful registration

        console.log(res);
        console.log("Registration Data:", values);
        // Simulate backend success and move to OTP
        onRegisterSuccess(values.phoneNumber);
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed");
      } finally {
        setSubmitting(false);
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
        Create an Account
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TextField
        fullWidth
        id="fullName"
        name="fullName"
        label="Full Name"
        variant="outlined"
        margin="normal"
        {...formik.getFieldProps("fullName")}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        helperText={formik.touched.fullName && formik.errors.fullName}
        sx={{ borderRadius: 2 }}
      />

      <TextField
        fullWidth
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        margin="normal"
        {...formik.getFieldProps("phoneNumber")}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
      />

      <FormControlLabel
        control={
          <Checkbox
            id="terms"
            name="terms"
            checked={formik.values.terms}
            onChange={formik.handleChange}
            color="warning"
          />
        }
        label={
          <Typography variant="caption">
            I agree to the Terms of Service, Privacy Policy and Content Policies
          </Typography>
        }
        sx={{ mt: 1, mb: 2 }}
      />
      {formik.touched.terms && formik.errors.terms && (
        <Typography color="error" variant="caption" display="block">
          {formik.errors.terms}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "#E86A33",
          "&:hover": { bgcolor: "#d35f2d" },
          borderRadius: 5,
          py: 1.5,
          mt: 2,
        }}
      >
        Sign Up
      </Button>

      <Divider sx={{ my: 3 }}>or</Divider>

      <Typography
        align="center"
        variant="body2"
        sx={{ cursor: "pointer", color: "text.secondary" }}
        onClick={onSwitchToLogin}
      >
        Already have an account? <b>Login to Order</b>
      </Typography>
    </Box>
  );
};

export default Register;
