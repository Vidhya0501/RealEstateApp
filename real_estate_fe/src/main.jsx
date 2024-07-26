import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import PropertyProvider from "./context/PropertyContext";
import "bootstrap/dist/css/bootstrap.min.css";

export const server = "https://realestateapp-1.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PropertyProvider>
        <App />
      </PropertyProvider>
    </AuthProvider>
  </React.StrictMode>
);
