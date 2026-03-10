import React from "react";
import { Box, useTheme } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

/**
 * AuthHeader Component
 * Displays the top graphic section of the auth card.
 * Changes background color based on the current view and theme mode.
 */
const AuthHeader = ({ currentView }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        // Logic to switch background color: orange for login, white/dark for others
        bgcolor: currentView === "login" 
          ? "#f5a25d" 
          : (isDarkMode ? "#2d2d2d" : "#fff"),
        height: 120,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        pb: 2,
        transition: "background-color 0.3s",
      }}
    >
      <Box
        sx={{ 
          bgcolor: isDarkMode ? "#1e1e1e" : "#fff", 
          p: 1.5, 
          borderRadius: "50%", 
          boxShadow: 1 
        }}
      >
        <FastfoodIcon sx={{ color: "#E86A33", fontSize: 40 }} />
      </Box>
    </Box>
  );
};

export default AuthHeader;
