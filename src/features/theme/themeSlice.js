import { createSlice } from '@reduxjs/toolkit';

/**
 * Detects the OS preferred color scheme.
 * Returns 'dark' if the OS is in dark mode, otherwise 'light'.
 */
const getOSTheme = () => 
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const initialState = {
  mode: getOSTheme(), // Default to OS preference
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Toggles between light and dark mode
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    // Allows setting a specific mode
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
