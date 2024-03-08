import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import BillingInfo from "./components/BillingInfo.tsx";
import App from "./App.tsx";
import "./components/Basket/ShoppingBasket.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
