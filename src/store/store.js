import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

/**
 * Global Redux Store configuration.
 * Currently includes the 'auth' reducer to manage authentication state.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer for handling auth-related actions
  },
});
