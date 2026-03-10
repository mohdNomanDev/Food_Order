import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";

/**
 * ThemeToggle Component
 * A reusable button to switch between Light and Dark modes.
 */
const ThemeToggle = ({ sx }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        color="inherit"
        sx={{
          bgcolor: mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
          "&:hover": {
            bgcolor: mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
          },
          ...sx,
        }}
      >
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
