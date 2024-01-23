import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/aut";
import Layout from "./Layout";
import { QueryClient, QueryClientProvider } from "react-query";

import "./main.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
