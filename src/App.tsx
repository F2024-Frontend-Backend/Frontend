import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.css";
import "./components/Basket/ShoppingBasket.css";
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout/Checkout";
import Receipt from "./pages/Receipt";
import OrderReceived from "./components/OrderReceived/order_received";
import FetchDataApi from "./api/FetchDataFromDjangoApi";

function App() {
  return (
    <>
      <div></div>
      <BrowserRouter>
        <Routes>
          <Route path="receipt" element={<OrderReceived />} />
          <Route path="checkout" element={<Checkout />} />
          {/**<Route path="" element={<FetchDataApi />} /> */}
          <Route path="" element={<Basket />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
