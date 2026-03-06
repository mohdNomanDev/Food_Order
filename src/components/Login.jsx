import React, { useState } from "react";
import {
  Typography,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useLoginForm } from "../hooks/useAuthForms";
import AuthButton from "./common/AuthButton";
import AuthInput from "./common/AuthInput";
import FormLink from "./common/FormLink";
import GoogleAuthButton from "./common/GoogleAuthButton";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [loginMode, setLoginMode] = useState("phone"); // 'phone' or 'email'
  const { formik } = useLoginForm(onLoginSuccess, loginMode);

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setLoginMode(newMode);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
        Login to Order
      </Typography>

      <ToggleButtonGroup
        value={loginMode}
        exclusive
        onChange={handleModeChange}
        fullWidth
        sx={{
          mb: 3,
          "& .MuiToggleButton-root": {
            borderRadius: 5,
            py: 1,
            textTransform: "none",
            fontWeight: "bold",
            border: "1px solid #eee",
            "&.Mui-selected": {
              bgcolor: "#fdf3eb",
              color: "#E86A33",
              borderColor: "#E86A33",
              "&:hover": {
                bgcolor: "#fbe8d8",
              },
            },
          },
        }}
      >
        <ToggleButton value="phone" sx={{ mr: 1, borderRight: "1px solid #eee !important" }}>
          <PhoneIphoneIcon sx={{ mr: 1, fontSize: 20 }} />
          Phone
        </ToggleButton>
        <ToggleButton value="email">
          <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
          Email
        </ToggleButton>
      </ToggleButtonGroup>

      <AuthInput
        id="identifier"
        name="identifier"
        label={loginMode === "phone" ? "Phone Number" : "Email Address"}
        type={loginMode === "phone" ? "tel" : "email"}
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.touched.identifier && Boolean(formik.errors.identifier)}
        helperText={formik.touched.identifier && formik.errors.identifier}
      />

      <Typography
        align="right"
        variant="caption"
        display="block"
        sx={{ cursor: "pointer", color: "text.secondary", mb: 2 }}
      >
        Forgot Password?
      </Typography>

      <AuthButton type="submit">Login</AuthButton>

      <Divider sx={{ my: 3 }}>or</Divider>

      <GoogleAuthButton
        text="Login with Google"
        onClick={() => console.log("Google Login clicked")}
        sx={{ mb: 3 }}
      />

      <FormLink
        text="New here?"
        linkText="Create an Account"
        onClick={onSwitchToRegister}
      />
    </Box>
  );
};

export default Login;
