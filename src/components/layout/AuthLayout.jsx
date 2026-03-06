import React from "react";
import { Box, Paper } from "@mui/material";
import AuthHeader from "../common/AuthHeader";

const AuthLayout = ({ children, currentView }) => {
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
        <AuthHeader currentView={currentView} />
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
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthLayout;
