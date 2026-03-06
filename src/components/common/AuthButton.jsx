import React from "react";
import { Button } from "@mui/material";

const AuthButton = ({ children, sx, ...props }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        bgcolor: "#E86A33",
        "&:hover": { bgcolor: "#d35f2d" },
        borderRadius: 5,
        py: 1.5,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
