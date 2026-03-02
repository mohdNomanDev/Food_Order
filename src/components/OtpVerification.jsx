import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("OTP is required"),
});

const OtpVerification = ({ identifier }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(25);
  const [isResendActive, setIsResendActive] = useState(false);

  // ⏳ Countdown Logic
  useEffect(() => {
    if (timer === 0) {
      setIsResendActive(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post("/auth/login/verify-otp", {
          identifier,
          otp: values.otp,
        });

        console.log(res);
        navigate("/home");
      } catch (error) {
        alert(error.response?.data?.message || "OTP verification failed");
      }
    },
  });

  // 🔁 Resend OTP
  const handleResend = async () => {
    try {
      await api.post("/auth/login/send-otp", { identifier });

      setTimer(25);
      setIsResendActive(false);
      formik.resetForm();

      alert("OTP Resent Successfully ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  const formatTime = (seconds) => {
    return `00:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: "100%", maxWidth: 400, mx: "auto", textAlign: "center" }}
    >
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Verify OTP
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Enter the 6-digit code sent to <br />
        <b>{identifier}</b>
      </Typography>

      <TextField
        fullWidth
        id="otp"
        name="otp"
        placeholder="• • • • • •"
        inputProps={{
          maxLength: 6,
          style: {
            textAlign: "center",
            letterSpacing: "1em",
            fontSize: "1.5rem",
          },
        }}
        value={formik.values.otp}
        onChange={formik.handleChange}
        error={formik.touched.otp && Boolean(formik.errors.otp)}
        helperText={formik.touched.otp && formik.errors.otp}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "#E86A33",
          "&:hover": { bgcolor: "#d35f2d" },
          borderRadius: 5,
          py: 1.5,
          mb: 2,
        }}
      >
        Verify
      </Button>

      <Typography variant="body2" color="text.secondary">
        {isResendActive ? (
          <span
            style={{ color: "#E86A33", cursor: "pointer", fontWeight: "bold" }}
            onClick={handleResend}
          >
            Resend Code
          </span>
        ) : (
          <>
            Resend Code in{" "}
            <b style={{ color: "#E86A33" }}>{formatTime(timer)}</b>
          </>
        )}
      </Typography>
    </Box>
  );
};

export default OtpVerification;
