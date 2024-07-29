import React from "react";
import "./carousel.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Carousel = () => {
  return (
    <div className="carousel">
      <div class="custom-shape-divider-bottom-1708412153">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/images/slide-02.jpg" class="d-block w-100" alt="" />
            <div class="carousel-caption d-none d-md-block">
              <div className="carousel-con">
                <h2>Men New Season</h2>
                <p>
                  <span>Jackets & Coats</span>
                </p>
                <div style={{ textAlign: "center" }}>
                  <Link to="/shop">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#6c7ae0",
                        fontSize: "15px",
                        "&:hover": { background: "#000", transition: "0.5s" },
                        textTransform: "none",
                        fontSize: "16px",
                        padding: "10px 25px 10px 25px",
                        fontWeight: "700",
                        borderRadius: "30px",
                      }}
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/slide-01.jpg" class="d-block w-100" alt="" />
            <div class="carousel-caption d-none d-md-block">
              <div className="carousel-con">
                <h2>Women Collection 2024</h2>
                <p>
                  <span>New Season</span>
                </p>
                <Link to="/shop">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#6c7ae0",
                      fontSize: "15px",
                      "&:hover": { background: "#000", transition: "0.5s" },
                      textTransform: "none",
                      fontSize: "16px",
                      padding: "10px 25px 10px 25px",
                      fontWeight: "700",
                      borderRadius: "30px",
                    }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/slide-03.jpg" class="d-block w-100" alt="" />
            <div class="carousel-caption d-none d-md-block">
              <div className="carousel-con">
                <h2>Men Collection </h2>
                <p>
                  <span>New Arrivals</span>
                </p>
                <Link to="/shop">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#6c7ae0",
                      fontSize: "15px",
                      "&:hover": { background: "#000", transition: "0.5s" },
                      textTransform: "none",
                      fontSize: "16px",
                      padding: "10px 25px 10px 25px",
                      fontWeight: "700",
                      borderRadius: "30px",
                    }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-target="#carouselExampleCaptions"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-target="#carouselExampleCaptions"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
