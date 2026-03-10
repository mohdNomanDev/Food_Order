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
import GoogleAuthButton from "./common/GoogleAuthButton";

/**
 * Register Component
 * Handles new user registration with Name and Phone Number.
 */
const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
  // Formik hook specialized for registration
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

      {/* Error message from registration attempt */}
      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
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

      {/* Terms and Conditions Checkbox */}
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

      {/* Social Registration Option */}
      <GoogleAuthButton
        text="Register with Google"
        onClick={() => console.log("Google Register clicked")}
        sx={{ mb: 3 }}
      />

      {/* Navigation back to Login */}
      <FormLink
        text="Already have an account?"
        linkText="Login to Order"
        onClick={onSwitchToLogin}
      />
    </Box>
  );
};

export default Register;
