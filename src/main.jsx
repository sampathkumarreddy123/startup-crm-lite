import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { LeadProvider } from "./context/LeadContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LeadProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LeadProvider>
    </AuthProvider>
  </React.StrictMode>
);