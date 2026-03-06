import React from "react";
import { Box } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const AuthHeader = ({ currentView }) => {
  return (
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
  );
};

export default AuthHeader;
