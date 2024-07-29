import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { FaUsers } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Users from "./login/Users";

const useSearchBar = () => useContext(searchBarContext);

const searchBarContext = createContext();

const DataContext = ({ children }) => {
  const [store, setStore] = useState();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [cartItemCount, setCartItemCount] = useState(0); //cart

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log("Searching for:", search);
    /*search filter */
    console.log(records.filter((f) => f.Name.includes(event.target.value)));
    setStore(records.filter((f) => f.Name.includes(event.target.value)));
    /*search filter */
  };

  const updateCartItemCount = () => {
    axios
      .get("http://localhost:4000/cart")
      .then((result) => {
        const itemCount = result.data.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartItemCount(itemCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* using Nav and shop Component start  */
  const [adminOpen, setAdminOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const toggleDrawer = (anchor, open) => () => {
    if (anchor === "admin") {
      setAdminOpen(open);
    } else if (anchor === "user") {
      setUserOpen(open);
    }
  };

  const userList = (
    <Box sx={{ width: 550 }} role="presentation">
      <div className="icons">
        <div className="users-icon">
          <FaUsers />
        </div>
        <div className="circle-icon" onClick={toggleDrawer("user", false)}>
          <ImCancelCircle />
        </div>
      </div>

      <Users />
    </Box>
  );

  /* using Nav and shop Component end*/

  const [productQuantities, setProductQuantities] = useState({});

  const SIZES = ["S", "M", "L", "XL", "XXL"].map((size) => ({ label: size }));

  const getCartItems = () => {
    axios
      .get("http://localhost:4000/cart")
      .then((result) => {
        setCart(result.data);
        // Initialize quantities and sizes from fetched data
        const quantities = {};
        result.data.forEach((item) => {
          quantities[item.id] = item.quantity;
        });
        setProductQuantities(quantities);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCartItem = (item, data) => {
    axios
      .patch(`http://localhost:4000/cart/${item.id}`, data)
      .then(() => {
        getCartItems(); // Refresh the cart to reflect the update
      })
      .catch((err) => console.error(err));
  };

  const handleQuantityChange = (item, increment = true, index) => {
    var val = { ...cart[index] }; // Make a copy of the item to update
    const newQuantity = increment
      ? (productQuantities[item.id] || 1) + 1
      : (productQuantities[item.id] || 1) - 1;

    if (newQuantity < 1) return;

    setProductQuantities({
      ...productQuantities,
      [item.id]: newQuantity,
    });

    val.quantity = newQuantity;

    // Recalculate total price
    val.totalPrice = val.offer * newQuantity;

    axios
      .put(`http://localhost:4000/cart/${val.id}`, val) // Update the cart item with the new quantity and total price
      .then(() => {
        getCartItems(); // Refresh the cart to reflect the update
      })
      .catch((err) => console.error(err));
  };

  const handleSizeChange = (item, newSize) => {
    if (!newSize) return; // Prevents setting an undefined size

    updateCartItem(item, { size: newSize.label });
  };


  //cart.js total amount calculation function start

  const calculateSubtotal = () => {
    return cart
      .reduce((acc, item) => {
        return acc + item.offer * (productQuantities[item.id] || 1);
      }, 0)
      .toFixed(2);
  };

  // Assuming total is the same as subtotal in this case
  // If there are additional charges or discounts, include those calculations here
  const calculateTotalCost = () => {
    return calculateSubtotal();
  };

  const calculateTotal = (item) => {
    return (item.offer * (productQuantities[item.id] || 1)).toFixed(2);
  };

  //cart.js total amount calculation function end

  const storedUsername = localStorage.getItem("username");

  return (
    <searchBarContext.Provider
      value={{
        store,
        setStore,
        records,
        setRecords,
        handleSearch,
        search,
        setSearch,
        cartItemCount,
        setCartItemCount,
        updateCartItemCount,
        toggleDrawer,
        userOpen,
        setUserOpen,
        adminOpen,
        setAdminOpen,
        userList,
        cart,
        setCart,
        productQuantities,
        setProductQuantities,
        SIZES,
        getCartItems,
        handleQuantityChange,
        handleSizeChange,
        updateCartItem,
        calculateSubtotal,
        calculateTotalCost,
        calculateTotal,
        storedUsername
      }}
    >
      {children}
    </searchBarContext.Provider>
  );
};

export { DataContext, useSearchBar };
