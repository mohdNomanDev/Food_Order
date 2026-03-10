import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";
import OtpVerification from "../components/OtpVerification";
import AuthLayout from "../components/layout/AuthLayout";
import { setView, setOtpData } from "../features/auth/authSlice";

/**
 * AuthPage Component
 * The main container for authentication. It uses Redux to manage and display
 * different authentication views: Login, Register, or OTP Verification.
 */
const AuthPage = () => {
  const dispatch = useDispatch();
  
  // Extracting current auth state from Redux
  const { currentView, userIdentifier, otpOrigin } = useSelector(
    (state) => state.auth
  );

  /**
   * Handles transition to OTP view after successful login/registration request.
   * @param {string} identifier - User's phone or email.
   * @param {string} origin - Whether it came from 'login' or 'register'.
   * @param {string} mode - 'phone' or 'email'.
   */
  const handleAuthSuccess = (identifier, origin, mode) => {
    dispatch(setOtpData({ identifier, origin, mode }));
  };

  /**
   * Switches between Login and Register views.
   * @param {string} view - 'login' or 'register'.
   */
  const handleSwitchView = (view) => {
    dispatch(setView(view));
  };

  return (
    <AuthLayout currentView={currentView}>
      {/* Conditional rendering based on the currentView state in Redux */}
      
      {currentView === "register" && (
        <Register
          onSwitchToLogin={() => handleSwitchView("login")}
          onRegisterSuccess={(identifier) =>
            handleAuthSuccess(identifier, "register", "phone") // Register currently only uses phone
          }
        />
      )}
      
      {currentView === "login" && (
        <Login
          onSwitchToRegister={() => handleSwitchView("register")}
          onLoginSuccess={(identifier, mode) =>
            handleAuthSuccess(identifier, "login", mode)
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
