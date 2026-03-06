import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentView: 'register', // 'login', 'register', or 'otp'
  userIdentifier: '',
  otpOrigin: '',
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setView: (state, action) => {
      state.currentView = action.payload;
    },
    setOtpData: (state, action) => {
      const { identifier, origin } = action.payload;
      state.userIdentifier = identifier;
      state.otpOrigin = origin;
      state.currentView = 'otp';
    },
    resetAuth: (state) => {
      state.currentView = 'login';
      state.userIdentifier = '';
      state.otpOrigin = '';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});

export const { setView, setOtpData, resetAuth, setLoading, setError, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
