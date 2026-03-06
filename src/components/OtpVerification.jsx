import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import api from "../utils/api";
import { useOtpForm } from "../hooks/useAuthForms";
import AuthButton from "./common/AuthButton";
import AuthInput from "./common/AuthInput";

/**
 * OtpVerification Component
 * Handles the input of the 6-digit OTP and includes resend logic with a countdown timer.
 */
const OtpVerification = ({ identifier, origin }) => {
  const [timer, setTimer] = useState(25); // Resend timer starts at 25 seconds
  const [isResendActive, setIsResendActive] = useState(false);

  // Formik hook specialized for OTP verification
  const { formik } = useOtpForm(identifier, origin);

  // ⏳ Countdown Logic: Decrements every second until it reaches 0
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

  /**
   * Triggers a new OTP request to the backend.
   */
  const handleResend = async () => {
    try {
      await api.post("/auth/login/otp", { identifier });

      setTimer(25); // Reset timer
      setIsResendActive(false);
      formik.resetForm();

      alert("OTP Resent Successfully ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  /**
   * Helper to display seconds in 00:SS format.
   */
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

      {/* Styled OTP Input */}
      <AuthInput
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

      <AuthButton type="submit" sx={{ mb: 2 }}>
        Verify
      </AuthButton>

      {/* Resend Logic UI */}
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
