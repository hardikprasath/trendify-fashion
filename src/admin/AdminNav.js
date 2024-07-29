import React from 'react'
import "./adminnav.css"
import { TbLogout } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Signin from '../login/Signin';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

const AdminNav = () => {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 550 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      
        {/* <Signin/> */}
  
    </Box>
  );

  const handleClosed = () =>{

    swal({
      title: "Thank you!",
      text: "Logout Successfully",
      icon: "success",
      button: "ok",
    });
    
    setTimeout(() => {
    }, 2000);
    navigate('/home')
    
  }

  return (
    <div className="admin-nav">
        <nav class="navbar navbar-expand-lg navbar-light ">
          <span class="navbar">
            <h4>🆃🆁🅴🅽🅳🅸🅵🆈</h4>
          </span>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              {/* <a class="nav-link active" href="/home">
                Home
              </a> */}
              <a class="nav-link active" href="/category">
                Category
              </a>
              <a class="nav-link active" href="/productlist">
                Product-List
              </a>
              <a class="nav-link active" href="#order">
                Order
              </a>
            </div>
          </div>
          <div className="admin-nav-icon">
            <a class="nav-link active" onClick={handleClosed} href="#">
                <TbLogout /> 
            </a>
          </div>
        </nav>
      </div>
  )
}

export default AdminNav