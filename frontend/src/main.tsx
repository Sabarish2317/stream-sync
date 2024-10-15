import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux state/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const clientId = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
