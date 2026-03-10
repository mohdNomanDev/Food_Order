import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';

/**
 * Global Redux Store configuration.
 * Currently includes 'auth' and 'theme' reducers.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,   // Reducer for handling auth-related actions
    theme: themeReducer, // Reducer for handling theme-related actions
  },
});
