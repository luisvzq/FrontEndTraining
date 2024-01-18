import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./Layout";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Layout />
    </AuthProvider>
  </React.StrictMode>
);
