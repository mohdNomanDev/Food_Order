import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";
import OtpVerification from "../components/OtpVerification";
import AuthLayout from "../components/layout/AuthLayout";
import { setView, setOtpData } from "../features/auth/authSlice";

const AuthPage = () => {
  const dispatch = useDispatch();
  const { currentView, userIdentifier, otpOrigin } = useSelector(
    (state) => state.auth
  );

  const handleAuthSuccess = (identifier, origin) => {
    dispatch(setOtpData({ identifier, origin }));
  };

  const handleSwitchView = (view) => {
    dispatch(setView(view));
  };

  return (
    <AuthLayout currentView={currentView}>
      {currentView === "register" && (
        <Register
          onSwitchToLogin={() => handleSwitchView("login")}
          onRegisterSuccess={(identifier) =>
            handleAuthSuccess(identifier, "register")
          }
        />
      )}
      {currentView === "login" && (
        <Login
          onSwitchToRegister={() => handleSwitchView("register")}
          onLoginSuccess={(identifier) =>
            handleAuthSuccess(identifier, "login")
          }
        />
      )}
      {currentView === "otp" && (
        <OtpVerification identifier={userIdentifier} origin={otpOrigin} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
