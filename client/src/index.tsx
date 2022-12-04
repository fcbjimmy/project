import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ProductContextProvider } from "./context/ProductContext";
import { ModalContextProvider } from "./context/ModalContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <ModalContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
