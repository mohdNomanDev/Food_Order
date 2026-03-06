import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleAuthButton = ({ text, onClick }) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={onClick}
      sx={{
        borderRadius: 5,
        py: 1.5,
        textTransform: "none",
        fontWeight: "bold",
        color: "text.primary",
        borderColor: "#ddd",
        "&:hover": {
          borderColor: "#bbb",
          bgcolor: "rgba(0,0,0,0.02)",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default GoogleAuthButton;
