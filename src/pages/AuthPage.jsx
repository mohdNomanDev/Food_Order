import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Paper } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Login from "../components/Login";
import Register from "../components/Register";
import OtpVerification from "../components/OtpVerification";
import { setView, setOtpData } from "../features/auth/authSlice";

const AuthPage = () => {
  const dispatch = useDispatch();
  const { currentView, userIdentifier, otpOrigin } = useSelector((state) => state.auth);

  const handleAuthSuccess = (identifier, origin) => {
    dispatch(setOtpData({ identifier, origin }));
  };

  const handleSwitchView = (view) => {
    dispatch(setView(view));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fdf3eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top Orange Header Section */}
        <Box
          sx={{
            bgcolor: currentView === "login" ? "#f5a25d" : "#fff",
            height: 120,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pb: 2,
            transition: "background-color 0.3s",
          }}
        >
          <Box
            sx={{ bgcolor: "#fff", p: 1.5, borderRadius: "50%", boxShadow: 1 }}
          >
            <FastfoodIcon sx={{ color: "#E86A33", fontSize: 40 }} />
          </Box>
        </Box>

        {/* Form Content Section */}
        <Box
          sx={{
            p: 4,
            bgcolor: "#fff",
            borderTopLeftRadius: currentView === "login" ? 24 : 0,
            borderTopRightRadius: currentView === "login" ? 24 : 0,
            mt: currentView === "login" ? -3 : 0,
            position: "relative",
          }}
        >
          {currentView === "register" && (
            <Register
              onSwitchToLogin={() => handleSwitchView("login")}
              onRegisterSuccess={(identifier) =>
                handleAuthSuccess(identifier, "register")
              }
            />
          )}
          {currentView === "login" && (
            <Login
              onSwitchToRegister={() => handleSwitchView("register")}
              onLoginSuccess={(identifier) =>
                handleAuthSuccess(identifier, "login")
              }
            />
          )}
          {currentView === "otp" && (
            <OtpVerification identifier={userIdentifier} origin={otpOrigin} />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;
