import React from "react";
import "./footer.css";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { PiMapPinFill } from "react-icons/pi";
import { IoCall } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const Footer = () => {
  const year = new Date();
  return (
    <div
      className="footer"
      style={{ backgroundColor: "#212529", height: "45vh" }}
    >

      <Container>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item sm={12} md={3} lg={3}>
            <div className="grid-one">
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <h6>CATEGORIES</h6>
                </li>
                <li>Men</li>
                <li>Women</li>
                <li>Shoes</li>
                <li>Watch</li>
              </ul>
            </div>
          </Grid>

          <Grid item sm={12} md={3} lg={3}>
            <div className="grid-one">
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <h6>HELP</h6>
                </li>
                <li>Track Order</li>
                <li>Returns</li>
                <li>Shipping</li>
                <li>FAQs</li>
              </ul>
            </div>
          </Grid>

          <Grid item sm={12} md={3} lg={3}>
            <div className="grid-three">
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <h6>GET IN TOUCH </h6>
                </li>
                <li>
                  <p>
                    <span>
                      Any questions? Let us know in store at 1th floor, 379
                      Jail Road, Madurai, call us on (+91) 96716
                      68793
                    </span>
                  </p>
                </li>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ padding: "3px 8px 3px 8px", borderRadius: "5px" }}
                    className="icon-fb"
                  >
                    <li>
                      <FaFacebookF />
                    </li>
                  </div>
                  <div
                    style={{ padding: "3px 8px 3px 8px", borderRadius: "5px" }}
                    className="icon-tw"
                  >
                    <li>
                      <FaTwitter />
                    </li>
                  </div>
                  <div
                    style={{ padding: "3px 8px 3px 8px", borderRadius: "5px" }}
                    className="icon-in"
                  >
                    <li>
                      <FaInstagram />
                    </li>
                  </div>
                  <div
                    style={{ padding: "3px 8px 3px 8px", borderRadius: "5px" }}
                    className="icon-go"
                  >
                    <li>
                      <FaGooglePlusG />
                    </li>
                  </div>
                  <div
                    style={{ padding: "3px 8px 3px 8px", borderRadius: "5px" }}
                    className="icon-li"
                  >
                    <li>
                      <GrLinkedinOption />
                    </li>
                  </div>
                </div>
              </ul>
            </div>
          </Grid>

          <Grid item sm={12} md={3} lg={3}>
            <div className="grid-one">
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <h6>NEWSLETTER</h6>
                </li>
                <li>
                  <div className="input-box">
                    <TextField
                      id="standard-basic"
                      placeholder="example@email.com "
                      variant="outlined"
                      InputLabelProps={{
                        style: { color: "#fff", borderColor: "#fff" },
                      }}
                      InputProps={{
                        style: { color: "#fff", borderColor: "#fff" },
                        classes: {
                          notchedOutline: "blackBorders",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "primary",
                        fontSize: "15px",
                        "&:hover": {
                          background: "#6c7ae0",
                          transition: "0.5s",
                        },
                        textTransform: "none",
                        fontSize: "16px",
                        padding: "10px 35px 10px 35px",
                        fontWeight: "700",
                        borderRadius: "30px",
                      }}
                    >
                      Subscribe
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <div className="online-payment">
          <img src="/images/onlinepayments.png" alt="" width={"20%"} />
        </div>
        <Divider
          variant="horizontal"
          flexItem
          sx={{ background: "#fff", marginTop: "20px" }}
        />
        <div className="copyright">
          <p>
  
            &copy; {year.getFullYear()} 🆃🆁🅴🅽🅳🅸🅵🆈 All rights reserved | Designed
            by Amizhth
          </p>
        </div>
   
      </Container>
    </div>
  );
};

export default Footer;
