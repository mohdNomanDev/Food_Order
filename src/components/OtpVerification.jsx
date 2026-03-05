import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import api from "../utils/api";
import { useOtpForm } from "../hooks/useAuthForms";

const OtpVerification = ({ identifier, origin }) => {
  const [timer, setTimer] = useState(25);
  const [isResendActive, setIsResendActive] = useState(false);

  const { formik } = useOtpForm(identifier, origin);

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

  // 🔁 Resend OTP
  const handleResend = async () => {
    try {
      await api.post("/auth/login/otp", { identifier });

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
