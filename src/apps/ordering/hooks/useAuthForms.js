import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api";
import {
  registerSchema,
  loginSchema,
  otpSchema,
} from "../utils/validationSchemas";

/**
 * Custom hook to handle registration form logic.
 * Manages validation, form submission, and registration-specific error handling.
 */
export const useRegisterForm = (onRegisterSuccess) => {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { fullName: "", phoneNumber: "", terms: false },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setError("");
        const res = await api.post("/auth/register", {
          name: values.fullName,
          phone: values.phoneNumber,
          terms: values.terms,
        });

        resetForm();
        console.log("Registration Success:", res.data);
        // Triggers the transition to OTP view on success
        onRegisterSuccess(values.phoneNumber);
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik, error };
};

/**
 * Custom hook for the login form.
 * Supports dynamic validation based on whether the user logs in with phone or email.
 */
export const useLoginForm = (onLoginSuccess, mode) => {
  const formik = useFormik({
    initialValues: { identifier: "" },
    validationSchema: loginSchema(mode), // Uses dynamic schema based on mode
    enableReinitialize: true, // Necessary to re-apply validation when mode switches
    onSubmit: async (values) => {
      try {
        // Calls API to request OTP
        const res = await api.post("/auth/login/otp", {
          identifier: values.identifier,
          type: mode, // Sends login mode (phone/email) to backend
        });
        console.log("Login Success:", res.data);
        // Triggers the transition to OTP view on success
        onLoginSuccess(values.identifier);
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    },
  });

  return { formik };
};

/**
 * Custom hook for OTP verification.
 * Decides whether to call registration verification or login verification endpoint.
 */
export const useOtpForm = (identifier, origin) => {
  const navigate = useNavigate();
  // Getting login mode from Redux state
  const { loginMode } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        // Chooses endpoint based on whether this is a new registration or a login
        const endpoint =
          origin === "register"
            ? "/auth/register/verify"
            : "/auth/login/verify";
        
        const res = await api.post(endpoint, {
          identifier,
          otp: values.otp,
          type: loginMode, // Passing type (phone/email) to verification endpoint
        });

        console.log("OTP Verification Success:", res.data);
        // Navigate to dashboard/home after successful verification
        navigate("/home");
      } catch (error) {
        alert(error.response?.data?.message || "OTP verification failed");
      }
    },
  });

  return { formik };
};
