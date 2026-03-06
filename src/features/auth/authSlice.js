import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the authentication slice.
 * Manages the current view, user identification for OTP, and authentication status.
 */
const initialState = {
  currentView: 'register', // Controls which form is shown: 'login', 'register', or 'otp'
  userIdentifier: '',      // Stores phone number or email for OTP verification
  otpOrigin: '',          // Tracks if OTP was triggered by 'login' or 'register'
  isAuthenticated: false,  // Boolean flag for user login status
  user: null,             // Stores authenticated user data
  loading: false,         // Global loading state for auth actions
  error: null,            // Stores auth-related error messages
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Switches between 'login', 'register', and 'otp' views
    setView: (state, action) => {
      state.currentView = action.payload;
    },
    // Sets data needed for OTP verification and automatically switches to OTP view
    setOtpData: (state, action) => {
      const { identifier, origin } = action.payload;
      state.userIdentifier = identifier;
      state.otpOrigin = origin;
      state.currentView = 'otp';
    },
    // Resets auth state to default login view
    resetAuth: (state) => {
      state.currentView = 'login';
      state.userIdentifier = '';
      state.otpOrigin = '';
    },
    // Manages the loading state during API calls
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Handles error reporting
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Called on successful authentication
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Logs the user out and clears user data
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});

export const { setView, setOtpData, resetAuth, setLoading, setError, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
