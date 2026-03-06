import React from "react";
import { Box, Paper } from "@mui/material";
import AuthHeader from "../common/AuthHeader";

/**
 * AuthLayout Component
 * A wrapper component that provides a consistent layout for all authentication pages.
 * Includes a centered background, a Paper container, and the AuthHeader.
 */
const AuthLayout = ({ children, currentView }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fdf3eb", // Background color matching the design
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
        {/* Top graphic/icon section */}
        <AuthHeader currentView={currentView} />
        
        {/* Container for the actual form (Login/Register/OTP) */}
        <Box
          sx={{
            p: 4,
            bgcolor: "#fff",
            // Specific styling when in login view to match design offsets
            borderTopLeftRadius: currentView === "login" ? 24 : 0,
            borderTopRightRadius: currentView === "login" ? 24 : 0,
            mt: currentView === "login" ? -3 : 0,
            position: "relative",
          }}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthLayout;
