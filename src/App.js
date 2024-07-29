import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Component from "./Component";
import Home from "./Home";
import AddProductList from "./admin/AddProductList";
import { DataContext } from "./DataContext";
import Homepage from "./home-page/Homepage";
import Shop from "./shop/Shop";
import About from "./aboutus/About";
import Category from "./admin/Category";
import Cart from "./cart/Cart";
import AdminSignin from  "../src/login/AdminSignin"
import ProductDetails from "./product-details/ProductDetails";
import Payment from "./payment_details/Payment";
import Success from "./Success";
import Contactus from "./contact/Contactus";


function App() {
  return (
    <div>
      <DataContext>
        <Routes>
          <Route path="/" element={<Component />}>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:name" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/AdminSignin" element={<AdminSignin />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
          </Route>
          <Route path="/productlist" element={<AddProductList />} />
          <Route path="/Category" element={<Category />} />
        </Routes>
      </DataContext>
    </div>
  );
}

export default App;
