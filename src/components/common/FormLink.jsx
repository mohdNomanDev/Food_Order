import React from "react";
import { Typography, Box } from "@mui/material";

const FormLink = ({ text, linkText, onClick, sx }) => {
  return (
    <Typography
      align="center"
      variant="body2"
      sx={{ cursor: "pointer", color: "text.secondary", ...sx }}
      onClick={onClick}
    >
      {text} <b>{linkText}</b>
    </Typography>
  );
};

export default FormLink;
