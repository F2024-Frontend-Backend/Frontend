
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.css";

import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";
import Receipt from "./pages/Receipt";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="receipt" element={<Receipt />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="" element={<Basket />} />
      
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

