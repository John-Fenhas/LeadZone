import { createRoot } from "react-dom/client";
import "../index.css";

import { StrictMode } from "react";
import App from "./App.jsx";
import { AuthProvider } from "../context/AuthProvider.jsx";
import { LeadsProvider } from "../context/LeadsContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LeadsProvider>
          <App />
        </LeadsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
