import React, { useState, useEffect } from "react";
import "./cart.css";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TextField,
  Autocomplete,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSearchBar } from "../DataContext";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import { GiTicket } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Cart() {
  // const [cart, setCart] = useState([]);

  const {
    cart,
    setCart,
    updateCartItemCount,
    getCartItems,
    SIZES,
    productQuantities,
    handleSizeChange,
    handleQuantityChange,
    calculateSubtotal,
    calculateTotalCost,
    calculateTotal,
  } = useSearchBar();

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:4000/cart/${id}`)
      .then(() => {
        getCartItems();
        updateCartItemCount();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // const calculateTotal = (item) => {
  //   return (item.Price * (productQuantities[item.id] || 1)).toFixed(2);
  // };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="cart-header">
      <Container className="head">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#000" }}>
              <TableRow>
                <TableCell align="center" sx={{ color: "white" }}>
                  S.No
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Product Image
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Product Name
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Size
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Quantity
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Total
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    <img
                      src={item.ImageURL}
                      alt="img"
                      style={{ width: "100%", maxWidth: "100px" }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.Name}</TableCell>
                  {/* <TableCell align="center">
                    <Autocomplete
                      disablePortal
                      id={`size-select-${item.id}`}
                      options={SIZES}
                      value={
                        SIZES.find((size) => size.label === item.size) || "S"
                      }
                      onChange={(e, newValue) =>
                        handleSizeChange(item, newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Size" />
                      )}
                    />
                  </TableCell> */}
                  <TableCell align="center">
                    {item.Category === "Accessories" ? "-" : (
                      <Autocomplete
                        disablePortal
                        id={`size-select-${item.id}`}
                        options={SIZES}
                        value={
                          SIZES.find((size) => size.label === item.size) || "S"
                        }
                        onChange={(e, newValue) =>
                          handleSizeChange(item, newValue)
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Size" />
                        )}
                      />
                    )}
                  </TableCell>

                  <TableCell align="center">₹{item.offer}</TableCell>
                  <TableCell align="center">
                    <div className="quantity">
                      <button
                        className="btn-1"
                        onClick={() => handleQuantityChange(item, false, index)}
                      >
                        <RemoveIcon sx={{ color: "#1FC7FF" }} />
                      </button>
                      <span className="display">
                        {productQuantities[item.id] || 1}
                      </span>
                      <button
                        className="btn-2"
                        onClick={() => handleQuantityChange(item, true, index)}
                      >
                        <AddIcon sx={{ color: "#1FC7FF" }} />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {/* ₹{item.Price * (productQuantities[item.id] || 1)} */}₹
                    {calculateTotal(item)}
                  </TableCell>
                  <TableCell align="center">
                    <MdDelete
                      className="delete-icon"
                      onClick={() => deleteItem(item.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="coupon-cart">
          <div className="textfield-btn">
            <div>
              <TextField
                disabled
                id="outlined-start-adornment"
                sx={{
                  m: 1,
                  width: "25ch",
                  borderColor: "#000",
                  marginLeft: "0px",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GiTicket />
                    </InputAdornment>
                  ),
                  classes: {
                    notchedOutline: "blackBorder",
                  },
                }}
              />
            </div>

            <div>
              <Button
                disabled
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  fontSize: "15px",
                  "&:hover": {
                    background: "#6c7ae0",
                    transition: "0.5s",
                  },
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 25px 10px 25px",

                  borderRadius: "30px",
                }}
              >
                APPLY COUPON
              </Button>
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000",
                fontSize: "15px",
                "&:hover": {
                  background: "#6c7ae0",
                  transition: "0.5s",
                },
                textTransform: "none",
                fontSize: "16px",
                padding: "10px 25px 10px 25px",
                borderRadius: "30px",
              }}
            >
              UPDATE CART
            </Button>
          </div>
        </div>
        <div className="divider">
          <Divider variant="horizontal" flexItem sx={{ background: "#000" }} />
        </div>

        <div className="right-div">
          <Box className="cart-total">
            <Container>
              <p>Cart Totals</p>
              <div className="sub-total">
                <div>
                  <p>SUBTOTAL</p>
                </div>
                <div>
                  <h6>₹{calculateSubtotal()}</h6>
                </div>
              </div>
              <div className="total">
                <div>
                  <p>TOTAL</p>
                </div>
                <div>
                  <h6>₹{calculateTotalCost()}</h6>
                </div>
              </div>
              <div>
                <Link to="/payment">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#08C451",
                      fontSize: "13px",
                      "&:hover": {
                        background: "#08C451",
                      },
                      padding: "10px 76px 10px 76px",
                      borderRadius: "5px",
                    }}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </Link>
              </div>
            </Container>
          </Box>
        </div>

        {/* <div className="divider">
          <Divider variant="horizontal" flexItem sx={{ background: "#000" }} />  
        </div> */}

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={10}
        >
          <Grid item sm={12} md={4} lg={4}>
            <div className="icon">
              <MdLock />
            </div>
            <div className="security-heading">
              <span>Your Information Is Safe</span>
            </div>
            <div className="security-content">
              <span>
                your privacy and security are paramount. You can shop with
                confidence, knowing that your information is safe with us.
              </span>
            </div>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <div className="icon">
              <MdOutlineSecurity />
            </div>
            <div className="security-heading">
              <span>Secure Checkout</span>
            </div>
            <div className="security-content">
              <span>
                Our Secure Checkout Ensures Your Data Is Safeguarded Every Step
                of the Way. Seamless Transactions and Maximum Security.
              </span>
            </div>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <div className="icon">
              <IoCall />
            </div>
            <div className="security-heading">
              <span>24/7 Customer Support</span>
            </div>
            <div className="security-content">
              <span>
                Shop with confidence anytime, anywhere. Enjoy peace of mind as
                you shop for your favorite products hassle-free
              </span>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
