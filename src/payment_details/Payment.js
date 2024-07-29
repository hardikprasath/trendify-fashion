import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./payment.css";
import { useSearchBar } from "../DataContext";
import swal from "sweetalert";

const Payment = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [shipping, setShipping] = useState({});

  const onSubmit = (data) => {
    // console.log('Submitting:', data); // Debugging line
    axios
      .post("http://localhost:4000/shipping", data)
      .then((result) => {
        getApiShipping();
        console.log(result.data);
        reset();
      })
      .catch((error) => {
        console.error(error);
        showErrorAlert();
      });
    handleShippingFormSubmit();
    setIsBillingSameAsShipping(false);
    // handleBillingFormSubmit();
  };

  const onSubmitBilling = (data) => {
    // console.log('Submitting:', data); // Debugging line
    axios
      .post("http://localhost:4000/billing", data)
      .then((result) => {
        console.log(result.data);
        showSuccessAlert();
        reset();
      })
      .catch((error) => {
        console.error(error);
        showErrorAlert();
      });

    handleShippingFormSubmit();
    handleBillingFormSubmit();
  };

  const getApiShipping = () => {
    axios
      .get("http://localhost:4000/shipping")
      .then((result) => {
        setShipping(result.data);
        debugger;
        console.log(result.data, "setdata");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function showSuccessAlert() {
    swal({
      title: "Thank you!",
      text: "Your Response was sent!",
      icon: "success",
      button: "OK",
    });
  }

  function showErrorAlert() {
    swal({
      title: "Error!",
      text: "An error occurred while sending your response.",
      icon: "error",
      button: "OK",
    });
  }

  const handlePaymentClick = () => {
    // This URL should be the URL where your server serves the payment page
    window.location.href = 'https://buy.stripe.com/test_cN28zn2NmfUS1iw9AA';
  };

  // const btnsubmit = () => {
  //   const totalcost = calculateTotalCost();
  //   fetch("http:localhost:5000/create-checkout-session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     mode: "cors",
  //     body: JSON.stringify({
  //       items: [
  //         { itemprice: totalcost },
  //       ],
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .then((res) => {
  //       if (res.ok) return res.json();
  //       return res.json().then((json) => Promise.reject(json));
  //     })
  //     .then(({ url }) => {
  //       window.location = url;
  //     })
  //     .catch((e) => {
  //       console.log(e.error);
  //     });
  // };

  const {
    calculateSubtotal,
    calculateTotalCost,
    calculateTotal,
    productQuantities,
    cart,
    getCartItems,
    storedUsername,
  } = useSearchBar();
  useEffect(() => {
    getCartItems();
    getApiShipping();
  }, []);
  const [currentPage, setCurrentPage] = useState("shipping");
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsBillingSameAsShipping(e.target.checked);
  };

  const handleShippingFormSubmit = () => {
    if (isBillingSameAsShipping) {
      swal({
        title: "Success!",
        text: "Your shipping and billing addresses are the same.",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } else {
      setCurrentPage("billing");
    }
  };

  const handleBillingFormSubmit = () => {
    console.log("Billing form submitted");
  };

  return (
    <div className="payment-background">
      <div className="payment-grid">
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item sm={12} md={6} lg={6}>
              <div>
                {currentPage === "shipping" && (
                  <div className="user">
                    <form onSubmit={handleSubmit(onSubmit)} className="payment">
                      <div className="payment-heading">
                        <h2>Shipping address</h2>
                      </div>

                      <div className="form-field">
                        <div>
                          <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              minLength: {
                                value: 3,
                                message: "Max 3 Words",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="normal"
                                label="Enter Username"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.username?.message &&
                              errors?.username?.message}
                          </p>
                        </div>

                        <div>
                          <Controller
                            name="Email"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Enter valid email",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="normal"
                                label="Enter Email"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.Email?.message && errors?.Email?.message}
                          </p>
                        </div>
                      </div>

                      <div className="form-field">
                        <div>
                          <Controller
                            name="phonenumber1"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Number is required",
                              minLength: {
                                value: 10,
                                message: "Invalid number",
                              },
                              maxLength: {
                                value: 10,
                                message: "Invalid number",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                onWheel={(event) =>
                                  event.currentTarget
                                    .querySelector("input")
                                    ?.blur()
                                }
                                label="Enter Phonenumber 1"
                                type="number"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red", textAlign: "left" }}>
                            {errors.phonenumber1?.message &&
                              errors.phonenumber1?.message}
                          </p>
                        </div>

                        <div>
                          <Controller
                            name="phonenumber2"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Number is required",
                              minLength: {
                                value: 10,
                                message: "Invalid number",
                              },
                              maxLength: {
                                value: 10,
                                message: "Invalid number",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                onWheel={(event) =>
                                  event.currentTarget
                                    .querySelector("input")
                                    ?.blur()
                                }
                                label="Enter Phonenumber 2"
                                type="number"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red", textAlign: "left" }}>
                            {errors.phonenumber2?.message &&
                              errors.phonenumber2?.message}
                          </p>
                        </div>
                      </div>

                      <div className="form-field">
                        <div>
                          <Controller
                            name="state"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              minLength: {
                                value: 3,
                                message: "Max 3 Words",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="normal"
                                label="Enter State"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.state?.message && errors?.state?.message}
                          </p>
                        </div>

                        <div>
                          <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              minLength: {
                                value: 3,
                                message: "Max 3 Words",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="normal"
                                label="Enter City"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.city?.message && errors?.city?.message}
                          </p>
                        </div>
                      </div>

                      <div className="form-field">
                        <div>
                          <Controller
                            name="pincode"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Number is required",
                              minLength: {
                                value: 6,
                                message: "Invalid number",
                              },
                              maxLength: {
                                value: 6,
                                message: "Invalid number",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                onWheel={(event) =>
                                  event.currentTarget
                                    .querySelector("input")
                                    ?.blur()
                                }
                                label="Enter Pincode"
                                type="number"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red", textAlign: "left" }}>
                            {errors.pincode?.message && errors.pincode?.message}
                          </p>
                        </div>

                        <div>
                          <Controller
                            name="Address"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              minLength: {
                                value: 3,
                                message: "Max 3 Words",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                // margin="normal"
                                label="Enter Address"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red", textAlign: "left" }}>
                            {errors.Address?.message && errors.Address?.message}
                          </p>
                        </div>
                      </div>

                      <div className="checkbox-button">
                        <div>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isBillingSameAsShipping}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label="Same as my billing address"
                          />
                        </div>

                        <div className="order-btn">
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{
                              backgroundColor: "#F13030",
                              fontSize: "15px",
                              "&:hover": {
                                background: "#00C49A",
                                transition: "0.5s",
                              },
                              textTransform: "none",
                              fontSize: "16px",
                              padding: "10px 25px 10px 25px",
                              fontWeight: "700",
                            }}
                          >
                            Confirm My Order
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {currentPage === "billing" && (
                  <div className="user">
                    <form
                      onSubmit={handleSubmit(onSubmitBilling)}
                      className="payment"
                    >
                      <div className="payment-heading">
                        <h2>Billing address</h2>
                      </div>

                      <div className="form-field">
                        <div>
                          <Controller
                            name="Username"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              minLength: {
                                value: 3,
                                message: "Max 3 Words",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                // margin="normal"
                                label="Enter Username"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.Username?.message &&
                              errors?.Username?.message}
                          </p>
                        </div>

                        <div>
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Enter valid email",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="normal"
                                label="Enter Email"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.email?.message && errors?.email?.message}
                          </p>
                        </div>
                      </div>

                      <div className="form-field">
                        <div>
                          <Controller
                            name="Phonenumber1"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Number is required",
                              minLength: {
                                value: 10,
                                message: "Invalid number",
                              },
                              maxLength: {
                                value: 10,
                                message: "Invalid number",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                onWheel={(event) =>
                                  event.currentTarget
                                    .querySelector("input")
                                    ?.blur()
                                }
                                label="Enter Phonenumber 1"
                                type="number"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red", textAlign: "left" }}>
                            {errors.Phonenumber1?.message &&
                              errors.Phonenumber1?.message}
                          </p>
                        </div>

                        <div>
                          <Controller
                            name="Phonenumber2"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Number is required",
                              minLength: {
                                value: 10,
                                message: "Invalid number",
                              },
                              maxLength: {
                                value: 10,
                                message: "Invalid number",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                onWheel={(event) =>
                                  event.currentTarget
                                    .querySelector("input")
                                    ?.blur()
                                }
                                label="Enter Phonenumber 2"
                                type="number"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red", textAlign: "left" }}>
                            {errors.Phonenumber2?.message &&
                              errors.Phonenumber2?.message}
                          </p>
                        </div>
                      </div>

                      <div className="form-field">
                        <div>
                          <Controller
                            name="State"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              minLength: {
                                value: 3,
                                message: "Max 3 Words",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="normal"
                                label="Enter State"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.State?.message && errors?.State?.message}
                          </p>
                        </div>

                        <div>
                          <Controller
                            name="City"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              minLength: {
                                value: 3,
                                message: "Max 3 Words",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin="normal"
                                label="Enter City"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red" }}>
                            {errors?.City?.message && errors?.City?.message}
                          </p>
                        </div>
                      </div>

                      <div className="form-field">
                        <div>
                          <Controller
                            name="Pincode"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Number is required",
                              minLength: {
                                value: 6,
                                message: "Invalid number",
                              },
                              maxLength: {
                                value: 6,
                                message: "Invalid number",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                onWheel={(event) =>
                                  event.currentTarget
                                    .querySelector("input")
                                    ?.blur()
                                }
                                label="Enter Pincode"
                                type="number"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red", textAlign: "left" }}>
                            {errors.Pincode?.message && errors.Pincode?.message}
                          </p>
                        </div>

                        <div>
                          <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Items required",
                              minLength: {
                                value: 3,
                                message: "Max 3 Words",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Enter address"
                                type="text"
                                size="small"
                              />
                            )}
                          />
                          <p style={{ color: "red", textAlign: "left" }}>
                            {errors.address?.message && errors.address?.message}
                          </p>
                        </div>
                      </div>

                      <div className="billing-order-btn">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            backgroundColor: "#F13030",
                            fontSize: "15px",
                            "&:hover": {
                              background: "#00C49A",
                              transition: "0.5s",
                            },
                            textTransform: "none",
                            fontSize: "16px",
                            padding: "10px 25px 10px 25px",
                            fontWeight: "700",
                          }}
                        >
                          Confirm My Order
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </Grid>
            <Grid item sm={12} md={6} lg={6}>
              <div className="product-table">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead sx={{ background: "#000" }}>
                      <TableRow>
                        <TableCell align="center" sx={{ color: "white" }}>
                          S.No
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          Product Name
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{item.Name}</TableCell>
                          <TableCell align="center">₹{item.offer}</TableCell>
                          <TableCell align="center">
                            <div className="quantity">
                              <span className="display">
                                {productQuantities[item.id] || 1}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            ₹{calculateTotal(item)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              <div className="shipping-cart">
                <div >
                  <Box className="shipping">
                    <Container>
                      <p>Shipping details</p>

                      {shipping && (
                        <div className="shipping-details">
                          <div><span>Name :</span>{shipping.username}</div>
                          <div><span>Mob No :</span>{shipping.phonenumber1}</div>
                          <div><span>Address :</span>{shipping.Address}</div>
                          <div><span>City :</span>{shipping.city}</div>
                          <div><span>Pincode :</span>{shipping.pincode}</div>
                        </div>
                      )}
                    </Container>
                  </Box>
                </div>

                <div className="payment-cart">
                  <Box className="payment-cart-total">
                    <Container>
                      <p>Cart Totals</p>
                      <div className="payment-sub-total">
                        <div>
                          <p>SUBTOTAL</p>
                        </div>
                        <div>
                          <h6>₹{calculateSubtotal()}</h6>
                        </div>
                      </div>
                      <div className="payment-total">
                        <div>
                          <p>TOTAL</p>
                        </div>
                        <div>
                          <h6>₹{calculateTotalCost()}</h6>
                        </div>
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={handlePaymentClick}
                          sx={{
                            backgroundColor: "#F13030",
                            fontSize: "15px",
                            "&:hover": {
                              background: "#00C49A",
                              transition: "0.5s",
                            },
                            textTransform: "none",
                            fontSize: "16px",
                            padding: "5px 5px 5px 5px",
                            fontWeight: "600",
                            float:"right"
                          }}
                        >
                          Pay 
                        </Button>
                      </div>
                    </Container>
                  </Box>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Payment;
