import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import App Routes
import OrderingRoutes from "./apps/ordering/OrderingRoutes";
import AdminRoutes from "./apps/admin/AdminRoutes";
import FoodListingRoutes from "./apps/food-listing/FoodListingRoutes";

/**
 * App Component
 * Root component that provides the Material UI Theme based on Redux state.
 * Also handles Routing for the application.
 */
function App() {
  // Extracting the current theme mode from Redux
  const { mode } = useSelector((state) => state.theme);

  // Memoizing the theme object to avoid unnecessary re-calculations
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#E86A33", // Primary orange color from the design
          },
          background: {
            default: mode === "light" ? "#fdf3eb" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline helps in applying the theme's background and global styles */}
      <CssBaseline />
      
      {/* BrowserRouter provides the navigation context for hooks like useNavigate */}
      <BrowserRouter>
        <Routes>
          {/* Main App Routes */}
          <Route path="/ordering/*" element={<OrderingRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/foodlisting/*" element={<FoodListingRoutes />} />
          
          {/* Default Redirect from / to /ordering */}
          <Route path="/" element={<Navigate to="/ordering" replace />} />
          
          {/* Redirect any unknown routes to /ordering */}
          <Route path="*" element={<Navigate to="/ordering" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
