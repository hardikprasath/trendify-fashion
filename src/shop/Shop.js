import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Autocomplete,
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import axios from "axios";
import "./shop.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FcSearch } from "react-icons/fc";
import { useSearchBar } from "../DataContext";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { useNavigate, useParams } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import { FaCartPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

/*Rangefilter start */

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;
/*Rangefilter end */

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const drawerWidth = 340;

export default function Shop() {
  const { name } = useParams();
  let categoryname = "All";

  if (name !== undefined) {
    debugger;
    categoryname = name;

    // setCateName(name);
    // debugger;
  }

  const [cateName, setCateName] = useState(categoryname);
  const [value, setValue] = useState(0);
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const [valueRating, setValueRating] = React.useState(2);

  const [count, setCount] = useState(1);

  const {
    store,
    setStore,
    records,
    setRecords,
    handleSearch,
    search,
    setSearch,
    updateCartItemCount,
    toggleDrawer,
    userOpen,
    setUserOpen,
    userList,
  } = useSearchBar();

  const {
    control,
    handleSubmit,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  /* search filter start*/
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  /* search filter end*/

  const [selectedProduct, setSelectedProduct] = useState({}); //dialog image control state

  const SIZES = [
    { label: "S" },
    { label: "M" },
    { label: "L" },
    { label: "XL" },
    { label: "XXL" },
  ];

  const storedUsername = localStorage.getItem("username");

  const handleClosed = () => {
    setOpens(false);
  };

  /*range filter - start */
  const [value1, setValue1] = React.useState([0, 2000]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  /*range filter - end */

  /*dialog start */

  const [opens, setOpens] = useState();

  // const handleClickOpens = (product) => {
  //   if (storedUsername) {
  //     let getForm = { ...product, quantity: 1, size: "s",totalPrice:0 }; // Update UI or state as needed with setSelectedProduct
  //     setSelectedProduct(getForm);
  //     console.log(getForm, "aaa");
  //     setOpens(true); // Pass the updated product directly to saveApiCart
  //     saveApiCart(getForm);
  //   } else {
  //     setUserOpen(true);
  //   }
  // };

  const handleClickOpens = (product) => {
    if (storedUsername) {
      let totalPrice = product.offer * 1; // Calculate total price based on product price and quantity
      let getForm = {
        ...product,
        quantity: 1,
        size: "s",
        totalPrice: totalPrice,
      }; // Update UI or state as needed with setSelectedProduct
      setSelectedProduct(getForm);
      console.log(getForm, "aaa");
      setOpens(true); // Pass the updated product directly to saveApiCart
      saveApiCart(getForm);
    } else {
      setUserOpen(true);
    }
  };

  const saveApiCart = (req) => {
    axios
      .post("http://localhost:4000/cart", req)
      .then((result) => {
        setRecords(result.data);
        console.log(result.data, "setdata");
        updateCartItemCount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const getApi = () => {
    axios
      .get("http://localhost:4000/products")
      .then((result) => {
        setStore(result.data);
        setRecords(result.data); //filter
        console.log(result.data, "setdata");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [category, setCategory] = useState([]);

  const getApiCategory = () => {
    axios
      .get("http://localhost:4000/category")
      .then((result) => {
        setCategory(result.data);
        console.log(result.data, "setCategory");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  const cateFiliter = (value) => {
    setCateName(value);
    debugger;
  };

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [prodId, setProdId] = useState();

  const handleClickOpen = (a) => {
    setOpen(true);
    setProdId(a);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(
    () => {
      getApi();
      getApiCategory();
    },
    [] // eslint-disable-line no-use-before-define
  );

  return (
    <div className="Shop">
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <div className="dialog-close">
          <IoClose onClick={handleClose} />
        </div>

        <Container>
          {prodId && (
            // <div className="dialog">
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              columnSpacing={3}
              paddingLeft={"30px"}
            >
              <Grid item sm={12} md={6} lg={6}>
                <div>
                  <CardMedia
                    component="img"
                    className="dialog-img"
                    sx={{
                      height: "67vh",
                      maxWidth: "350px",
                      width: "100%",
                    }}
                    image={prodId.ImageURL}
                  />
                </div>
              </Grid>

              <Grid item sm={12} md={6} lg={6}>
                <div className="product-content">
                  <div className="product-name">
                    <p>{prodId.Name}</p>
                  </div>
                  {/* <div className="product-price">
                    <p>₹{prodId.Price}</p>
                  </div> */}
                  <div className="product-price">
                    <p>₹{prodId.offer}</p>
                  </div>

                  <div className="star-rating">
                    <Rating
                      name="simple-controlled"
                      valueRating={valueRating}
                    />
                  </div>

                  <div className="cart_btn">
                    <Button
                      variant="contained"
                      onClick={() => handleClickOpens()}
                      fullWidth
                      sx={{
                        backgroundColor: "#000",
                        fontSize: "15px",
                        "&:hover": {
                          background: "#00A7E1",
                        },
                        textTransform: "uppercase",
                        padding: "7px 87px 7px 87px",
                        borderRadius: "0px",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>

                  <div className="accordion">
                    <Accordion
                      style={{
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px solid rgba(0, 0, 0, .125)",
                        width: "280px",
                        borderRadius: 0, // Ensure there's no border radius
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: 0,
                          padding: "0px",
                          borderRadius: 0, // Ensure there's no border radius
                        }}
                      >
                        <div style={{ textAlign: "left", paddingLeft: "3px" }}>
                          Product Info
                        </div>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ textAlign: "left", padding: "3px" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div className="accordion">
                    <Accordion
                      style={{
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px solid rgba(0, 0, 0, .125)",
                        width: "280px",
                        borderRadius: 0, // Ensure there's no border radius
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: 0,
                          padding: "0px",
                          borderRadius: 0, // Ensure there's no border radius
                        }}
                      >
                        <div style={{ textAlign: "left", paddingLeft: "3px" }}>
                          Return & Refund Policy
                        </div>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ textAlign: "left", padding: "3px" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div className="accordion">
                    <Accordion
                      style={{
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px solid rgba(0, 0, 0, .125)",
                        width: "280px",
                        borderRadius: 0, // Ensure there's no border radius
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: 0,
                          padding: "0px",
                          borderRadius: 0, // Ensure there's no border radius
                        }}
                      >
                        <div style={{ textAlign: "left", paddingLeft: "3px" }}>
                          Shipping Info
                        </div>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ textAlign: "left", padding: "3px" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </Grid>
            </Grid>
            // </div>
          )}
          <DialogActions>{/* <Button >Close</Button> */}</DialogActions>
        </Container>
      </Dialog>
      <div className="box">
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                position: "relative",
              },
              position: "relative",
            }}
            variant="permanent"
            anchor="left"
            className="setPosition"
          >
            <Container>
              <div className="categories-border">
                <FormControl variant="outlined" sx={{ ml: 2 }}>
                  <TextField
                    id="search"
                    label="Search"
                    value={search}
                    onChange={handleSearch}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <div className="button-click">
                          <FcSearch />
                        </div>
                      ),
                    }}
                  />
                </FormControl>

                <div className="categories">
                  <p>Categories</p>

                  <Box
                    sx={{
                      flexGrow: 1,
                      bgcolor: "background.paper",
                      display: "flex",
                      height: 224,
                      padding: 0,
                      justifyContent: "center",
                    }}
                  >
                    <Tabs
                      orientation="vertical"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      sx={{
                        borderRight: 0, // Remove the border on the right side
                        "& .MuiTab-root": {
                          backgroundColor: "transparent", // Remove the button color
                          "&.Mui-selected": {
                            backgroundColor: "transparent", // Remove the background color when button is clicked
                          },
                        },
                      }}
                      TabIndicatorProps={{ style: { display: "none" } }} // Hide the tab indicator line
                    >
                      <Tab
                        label="All"
                        onClick={() => cateFiliter("All")}
                        sx={{
                          textTransform: "none",
                          fontSize: "20px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      />
                      {category.map((list, index) => (
                        <Tab
                          label={list.categoryname}
                          onClick={() => cateFiliter(list.categoryname)}
                          sx={{
                            textTransform: "none",
                            fontSize: "20px",
                            fontWeight: "500",
                            color: "black",
                          }}
                        />
                      ))}
                    </Tabs>
                  </Box>
                </div>

                <div className="price-range">
                  <p>Price Range </p>
                  <Slider
                    getAriaLabel={() => "Minimum distance"}
                    value={value1}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    min={0}
                    step={50}
                    max={2000}
                  />
                </div>

                <div>
                  {/* <div className="color"><p>Color</p></div> */}
                  <div className="color-filter">
                    <ul>
                      {/* <li><input type="checkbox" color="black" /></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", padding: 0 }}
          >
            <TabPanel>
              <div className="Allproducts">
                {cateName === "All" ? (
                  <Container>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={4}
                    >
                      {store &&
                        store
                          .filter(
                            (item) =>
                              item.Price >= value1[0] && item.Price <= value1[1]
                          )
                          .map((a, index) => {
                            return (
                              <>
                                <Grid item sm={12} md={3} lg={3} key={index}>
                                  <Card
                                    className="card-ban"
                                    sx={{ maxWidth: 345 }}
                                  >
                                    <CardMedia
                                      className="img"
                                      sx={{ height: 330, position: "relative" }}
                                      image={a.ImageURL}
                                    />

                                    <div className="button-ban">
                                      <Button
                                        variant="contained"
                                        className="but"
                                        // onClick={() => handleClickOpens(a)} //map variable "a" to pass the data in dialog to display the image
                                        onClick={() => handleClickOpen(a)}
                                        sx={{
                                          backgroundColor: "#000",
                                          fontSize: "15px",
                                          "&:hover": {
                                            background: "#00A7E1",
                                          },
                                          textTransform: "uppercase",
                                          padding: "5px 18px 5px 18px",
                                          borderRadius: "30px",
                                        }}
                                      >
                                        Quick View
                                      </Button>
                                      <div className="icon-div">
                                        <StyledRating
                                          className="icon-heart"
                                          name="customized-color"
                                          defaultValue={0}
                                          max={1}
                                          icon={
                                            <FavoriteIcon fontSize="inherit" />
                                          }
                                          emptyIcon={
                                            <FavoriteBorderIcon
                                              fontSize="inherit"
                                              style={{ color: "#fff" }}
                                            />
                                          }
                                        />
                                      </div>
                                    </div>
                                  </Card>

                                  <div className="card-details">
                                    <Typography
                                      gutterBottom
                                      variant="para"
                                      component="div"
                                      className="card-title"
                                      sx={{ marginBottom: "0px",fontWeight:"600" }}
                                    >
                                      {a.Name}
                                    </Typography>

                                    <div className="cart-icon">
                                      <FaCartPlus
                                        onClick={() => handleClickOpens(a)}
                                        
                                      />
                                    </div>
                                  </div>

                                  <div className="price">
                                    <div className="original-price">
                                      ₹{a.Price}
                                    </div>
                                    <div className="review">
                                      4.3<span>⭐</span>
                                    </div>
                                  </div>

                                  <div className="price-button">
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      <div className="offer-price">
                                        ₹{a.offer}
                                      </div>
                                    </Typography>

                                    {/* <Button
                                        variant="contained"
                                        sx={{
                                          backgroundColor: "#FFFD85",
                                          color: "black",
                                          "&:hover": {
                                            background: "#36D949",
                                            color: "white",
                                            transition: "0.5s",
                                          },
                                          textTransform: "none",
                                          fontSize: "16px",
                                          padding: "3px 10px 3px 10px",
                                          fontWeight: "700",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        Buy Now
                                      </Button> */}
                                    <button>
                                      <div class="svg-wrapper-1">
                                        <div class="svg-wrapper">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="18"
                                            height="18"
                                          >
                                            <path
                                              fill="none"
                                              d="M0 0h24v24H0z"
                                            ></path>
                                            <path
                                              fill="currentColor"
                                              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                            ></path>
                                          </svg>
                                        </div>
                                      </div>
                                      <span>Buy Now</span>
                                    </button>
                                  </div>
                                </Grid>
                              </>
                            );
                          })}
                    </Grid>
                  </Container>
                ) : (
                  <Container>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start "
                      spacing={4}
                    >
                      {store &&
                        store
                          .filter((item) => item.Category === cateName)
                          .filter(
                            (item) =>
                              item.Price >= value1[0] && item.Price <= value1[1]
                          )
                          .map((a) => {
                            return (
                              <>
                                <Grid item sm={12} md={3} lg={3}>
                                  <Card
                                    className="card-ban"
                                    sx={{ maxWidth: 345 }}
                                  >
                                    <CardMedia
                                      className="img"
                                      sx={{ height: 330, position: "relative" }}
                                      image={a.ImageURL}
                                    />

                                    <div className="button-ban">
                                      <Button
                                        variant="contained"
                                        className="but"
                                        // onClick={() => handleClickOpens(a)} //map variable "a" to pass the data in dialog to display the image
                                        onClick={() => handleClickOpen(a)}
                                        sx={{
                                          backgroundColor: "#000",
                                          fontSize: "15px",
                                          "&:hover": {
                                            background: "#00A7E1",
                                          },
                                          textTransform: "uppercase",
                                          padding: "5px 18px 5px 18px",
                                          borderRadius: "30px",
                                        }}
                                      >
                                        Quick View
                                      </Button>
                                      <div className="icon-div">
                                        <StyledRating
                                          className="icon-heart"
                                          name="customized-color"
                                          defaultValue={0}
                                          max={1}
                                          icon={
                                            <FavoriteIcon fontSize="inherit" />
                                          }
                                          emptyIcon={
                                            <FavoriteBorderIcon
                                              fontSize="inherit"
                                              style={{ color: "#fff" }}
                                            />
                                          }
                                        />
                                      </div>
                                    </div>
                                  </Card>

                                  <div className="card-details">
                                    <Typography
                                      gutterBottom
                                      variant="para"
                                      component="div"
                                      className="card-title"
                                      sx={{ marginBottom: "0px",fontWeight:"600" }}
                                    >
                                      {a.Name}
                                    </Typography>

                                    <div className="cart-icon">
                                      <FaCartPlus
                                        onClick={() => handleClickOpens(a)}
                                      />
                                    </div>
                                  </div>

                                  <div className="price-button">
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      <div className="price">₹{a.Price}</div>
                                    </Typography>

                                    {/* <Button
                                        variant="contained"
                                        sx={{
                                          backgroundColor: "#FFFD85",
                                          color: "black",
                                          "&:hover": {
                                            background: "#36D949",
                                            color: "white",
                                            transition: "0.5s",
                                          },
                                          textTransform: "none",
                                          fontSize: "16px",
                                          padding: "3px 10px 3px 10px",
                                          fontWeight: "700",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        Buy Now
                                      </Button> */}
                                    <button>
                                      <div class="svg-wrapper-1">
                                        <div class="svg-wrapper">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="18"
                                            height="18"
                                          >
                                            <path
                                              fill="none"
                                              d="M0 0h24v24H0z"
                                            ></path>
                                            <path
                                              fill="currentColor"
                                              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                            ></path>
                                          </svg>
                                        </div>
                                      </div>
                                      <span>Buy Now</span>
                                    </button>
                                  </div>
                                </Grid>
                              </>
                            );
                          })}
                    </Grid>
                  </Container>
                )}
              </div>
            </TabPanel>
          </Box>
        </Box>
      </div>

      <Snackbar open={opens} autoHideDuration={1000} onClose={handleClosed}>
        <Alert
          onClose={handleClosed}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Added to Cart
        </Alert>
      </Snackbar>
    </div>
  );
}

// export default Shop;
