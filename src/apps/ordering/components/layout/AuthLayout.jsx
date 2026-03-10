import React from "react";
import { Box, Paper, useTheme } from "@mui/material";
import AuthHeader from "../common/AuthHeader";
import ThemeToggle from "../common/ThemeToggle";

/**
 * AuthLayout Component
 * A wrapper component that provides a consistent layout for all authentication pages.
 * Includes a centered background, a Paper container, and the AuthHeader.
 */
const AuthLayout = ({ children, currentView }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Theme Toggle positioned at the top-right */}
      <ThemeToggle sx={{ position: "absolute", top: 20, right: 20 }} />

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          bgcolor: theme.palette.background.paper,
          transition: "background-color 0.3s ease",
        }}
      >
        {/* Top graphic/icon section */}
        <AuthHeader currentView={currentView} />
        
        {/* Container for the actual form (Login/Register/OTP) */}
        <Box
          sx={{
            p: 4,
            bgcolor: theme.palette.background.paper,
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
