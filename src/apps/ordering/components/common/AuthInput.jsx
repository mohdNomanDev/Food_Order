import React from "react";
import { TextField } from "@mui/material";

const AuthInput = ({ label, ...props }) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default AuthInput;
