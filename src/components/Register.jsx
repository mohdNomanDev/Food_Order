import React from "react";
import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useRegisterForm } from "../hooks/useAuthForms";
import AuthButton from "./common/AuthButton";
import AuthInput from "./common/AuthInput";
import FormLink from "./common/FormLink";

const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const { formik, error } = useRegisterForm(onRegisterSuccess);

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

      <AuthInput
        id="fullName"
        name="fullName"
        label="Full Name"
        {...formik.getFieldProps("fullName")}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        helperText={formik.touched.fullName && formik.errors.fullName}
      />

      <AuthInput
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
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

      <AuthButton type="submit" sx={{ mt: 2 }}>
        Sign Up
      </AuthButton>

      <Divider sx={{ my: 3 }}>or</Divider>

      <FormLink
        text="Already have an account?"
        linkText="Login to Order"
        onClick={onSwitchToLogin}
      />
    </Box>
  );
};

export default Register;
