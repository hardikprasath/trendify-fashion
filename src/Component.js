import React from "react";
import Nav from "./Nav";
import Home from "./Home";
import Carousel from "./carousel/Carousel";
import Footer from "./Footer/Footer";
import AllProduct from "./products.js/AllProduct";
import { Outlet } from "react-router";

const Component = () => {
  return (
    <>
      <Nav />
      <div className="main-div">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
};

export default Component;
