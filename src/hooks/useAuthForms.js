import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  registerSchema,
  loginSchema,
  otpSchema,
} from "../utils/validationSchemas";

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

export const useLoginForm = (onLoginSuccess, mode) => {
  const formik = useFormik({
    initialValues: { identifier: "" },
    validationSchema: loginSchema(mode),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const res = await api.post("/auth/login/otp", {
          identifier: values.identifier,
          type: mode, // Passing type to API as well
        });
        console.log("Login Success:", res.data);
        onLoginSuccess(values.identifier);
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    },
  });

  return { formik };
};

export const useOtpForm = (identifier, origin) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        const endpoint =
          origin === "register"
            ? "/auth/register/verify"
            : "/auth/login/verify";
        const res = await api.post(endpoint, {
          identifier,
          otp: values.otp,
        });

        console.log("OTP Verification Success:", res.data);
        navigate("/home");
      } catch (error) {
        alert(error.response?.data?.message || "OTP verification failed");
      }
    },
  });

  return { formik };
};
