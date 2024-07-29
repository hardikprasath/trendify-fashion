import React, { useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import "./Allproducts.css";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
// import { bmw, wall } from '../../Assests/JsExports';
// import { Container } from '@mui/material';

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

const AllProduct = (event) => {
  const [store, setStore] = useState();
  const [category, setCategory] = useState([]);

  const getApi = () => {
    axios
      .get("http://localhost:4000/products")
      .then((result) => {
        setStore(result.data);
        console.log(result.data, "setdata");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

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
  useEffect(() => {
    getApiCategory();
  }, []);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <div className="Allproducts">
      <Container>
        <div>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="categories-banner"
            spacing={6}
          >
            {category &&
              category.map((item) => {
                return (
                  <Grid item sm={12} md={4} lg={4}>
                    <div className="hovers">
                      <Card className="card-banner">
                        <CardMedia className="img" image={item.ImageURL} />
                        <div className="content-banner">
                          <h2>{item.categoryname}</h2>
                        </div>
                        <div className="button-banner">
                          <ThemeProvider theme={theme}>
                            <Link to={`/shop/${item.categoryname}`}>
                              <Button
                                className="buttons"
                                variant="contained"
                                color="violet"
                              >
                                Shop Now
                              </Button>
                            </Link>
                          </ThemeProvider>
                        </div>
                      </Card>
                    </div>
                  </Grid>
                );
              })}
          </Grid>
        </div>

        <div className="product">
          <div className="product-heading">
            <h2>Latest Product</h2>
          </div>
        </div>
      </Container>
      <Container maxWidth="xl">
        <div>
          {/* <Grid
            container
            direction="row"
            alignItems="space-evenly"
            justifyContent="space-between"
            spacing={2}
          >
            {store &&
              store
                .slice()
                .reverse()
                .map((a, index) => {
                  return (
                    <>
                      {index < 6 && (
                        <Grid item sm={12} md={2} lg={2}>
                          <Card className="card-latest" sx={{ maxWidth: 345 }}>
                            <CardMedia
                              className="img"
                              sx={{ height: 330 }}
                              image={a.ImageURL}
                            />
                           
                          </Card>
                          <div className="card-new">
                            <p>New</p>
                          </div>
                        </Grid>
                      )}
                    </>
                  );
                })}
          </Grid> */}

          {/* <Swiper
            slidesPerView={5}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 2000 }}
            className="mySwiper"
          >
            {store &&
              store
                .slice()
                .reverse()
                .map((a, index) => {
                  return (
                    <>
                      {index < 6 && (
                        <Grid item sm={12} md={2} lg={2}>
                           <SwiperSlide key={index}>
                          <Card className="card-latest" sx={{ maxWidth: 345 }}>
                            <CardMedia
                              className="img"
                              sx={{ height: 270 }}
                              image={a.ImageURL}
                            />
                          </Card>
                          <div className="card-new">
                            <p>New</p>
                          </div>
                          </SwiperSlide>
                        </Grid>
                      )}
                    </>
                  );
                })}
          </Swiper> */}

          {/* <Swiper
            slidesPerView={4}
            spaceBetween={20}
            loop={true} 
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false, // This keeps autoplay going even after user interaction
            }}
            className="mySwiper"
          >
            {store &&
              store
                .slice()
                .reverse()
                .map((a, index) => (
                  <>
                    {index < 6 && (
                      <Grid item sm={12} md={2} lg={2}>
                        <SwiperSlide key={index}>
                          <Card className="card-latest" sx={{ maxWidth: 345 }}>
                            <CardMedia
                              className="img"
                              sx={{ height: 350 }}
                              image={a.ImageURL}
                            />
                          </Card>
                          <div className="card-new">
                            <p>New</p>
                          </div>
                        </SwiperSlide>
                      </Grid>
                    )}
                  </>
                ))}
          </Swiper> */}

<Swiper
  modules={[Pagination, Autoplay]} // Ensure modules are added here
  slidesPerView={4}
  spaceBetween={20}
  loop={true}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  className="mySwiper"
>
  {store &&
    store
      .slice()
      .reverse()
      .slice(0, 6) // Limit to the latest 6 items
      .map((item, index) => (
        <SwiperSlide key={index}>
          <Grid item sm={12} md={2} lg={2}>
            <Card className="card-latest" sx={{ maxWidth: 345 }}>
              <CardMedia
                className="img"
                sx={{ height: 350 }}
                image={item.ImageURL}
              />
            </Card>
            <div className="card-new">
              <p>New</p>
            </div>
          </Grid> 
        </SwiperSlide>
      ))}
</Swiper>
        </div>
      </Container>
    </div>
  );
};

export default AllProduct;
