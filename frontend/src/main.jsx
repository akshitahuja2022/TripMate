import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Cards/ScrollToTop.jsx";
// import AuthContextProvider from "./Context/AuthContextProvider.jsx";
import AuthContextProvider from "./Context/AuthContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ScrollToTop />
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
