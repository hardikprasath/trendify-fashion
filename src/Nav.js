import React, { useState, useEffect } from "react";
import "./nav.css";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AdminSignin from "./login/AdminSignin";
import { ImCancelCircle } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { useSearchBar } from "./DataContext";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Users from "./login/Users";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import swal from "sweetalert";
import { IconButton } from "@mui/material";

const Nav = () => {
  useEffect(() => {
    updateCartItemCount(); //updateCartItemCount() will be passed by DataContext.js
  }, []);

  const {
    cartItemCount,
    setCartItemCount,
    updateCartItemCount,
    adminOpen,
    setAdminOpen,
    userOpen,
    setUserOpen,
    toggleDrawer,
    userList,
  } = useSearchBar();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = ["Logout"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenus = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    swal({
      title: "Logout Successfully",
      icon: "success",
      button: "OK",
    });
    localStorage.clear("username")
    setCartItemCount(0)

    setAnchorElUser(null);
  };

  const adminList = (
    <Box sx={{ width: 550 }} role="presentation" className="drawer-background">
      <div className="icons">
        <div className="users-icon">
          <FaUsers />
        </div>
        <div className="circle-icon" onClick={toggleDrawer("admin", false)}>
          <ImCancelCircle />
        </div>
      </div>

      <AdminSignin />
    </Box>
  );

  const storedUsername = localStorage.getItem("username");
  console.log("names :", storedUsername);

  return (
    <div className="nav-full">
      <nav class="navbar navbar-expand-lg navbar-light ">
        <span class="navbar">
          <h4>🆃🆁🅴🅽🅳🅸🅵🆈</h4>
        </span>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" href="/home">
              Home
            </a>
            <a class="nav-link active" href="/shop">
              Shop
            </a>
            <a class="nav-link active" href="/about">
              About us
            </a>
            <a class="nav-link active" href="/contact">
              Contact Us
            </a>
            {/* <a class="nav-link active" href="#">
              Blog
            </a> */}
            <a class="nav-link active">
              {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <div onClick={toggleDrawer(anchor, true)}>
                    {anchor === "right" && (
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={toggleDrawer("admin", true)}
                      >
                        Admin
                      </p>
                    )}
                  </div>
                  <SwipeableDrawer
                    anchor="right"
                    open={adminOpen}
                    onClose={toggleDrawer("admin", false)}
                    onOpen={toggleDrawer("admin", true)}
                  >
                    {adminList}
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
            </a>
          </div>
        </div>
        <div className="nav-icon">
          <a class="nav-link active" href="#">
            <IoSearch />
          </a>
          <a class="nav-link active" href="/cart">
            <Badge badgeContent={cartItemCount} color="secondary">
              <FaShoppingCart />
            </Badge>
          </a>
          <a class="nav-link active" href="#">
            <FaRegHeart />
          </a>
          <a class="nav-link active" href="#">
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <div onClick={toggleDrawer(anchor, true)}>
                  {anchor === "right" && (
                    <>
                      {storedUsername ? (
                        <Box>
                          <Tooltip >
                            <IconButton
                              onClick={handleOpenUserMenu}
                              sx={{ p: 0 }}
                            >
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  color: "white",
                                  background: "#001D4A",
                                  fontSize: "25px",
                                  paddingBottom: "3px",
                                }}
                              >
                                {storedUsername.slice(0, 1)}
                              </Avatar>
                            </IconButton>
                          </Tooltip>
                          <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenus}
                          >
                            {settings.map((setting) => (
                              <MenuItem
                                key={setting}
                                onClick={handleCloseUserMenu}
                              >
                                <ListItemIcon>
                                  <Logout fontSize="small" />
                                </ListItemIcon>
                                {setting}
                              </MenuItem>
                            ))}
                          </Menu>
                        </Box>
                      ) : (
                        <FaUserCircle onClick={toggleDrawer("user", true)} />
                      )}
                    </>
                  )}
                </div>
                <SwipeableDrawer
                  anchor="right"
                  open={userOpen}
                  onClose={toggleDrawer("user", false)}
                  onOpen={toggleDrawer("user", true)}
                >
                  {userList}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </a>
        </div>
      </nav>

      {/* Admin drawer */}
      <SwipeableDrawer
        anchor="right"
        open={adminOpen}
        onClose={toggleDrawer("admin", false)}
        onOpen={toggleDrawer("admin", true)}
      >
        {adminList}
      </SwipeableDrawer>

      {/* User drawer */}
      <SwipeableDrawer
        anchor="right"
        open={userOpen}
        onClose={toggleDrawer("user", false)}
        onOpen={toggleDrawer("user", true)}
      >
        {userList}
      </SwipeableDrawer>
    </div>
  );
};

export default Nav;
