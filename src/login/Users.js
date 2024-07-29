import React, { useEffect, useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import swal from "sweetalert";
import "./users.css";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { useSearchBar } from "../DataContext";

const Users = ({ handleLogin, username }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { setUserOpen, setCartItemCount } = useSearchBar();
  const [login, setLogin] = useState();
  const Navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [cartItemCount, setLocalCartItemCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const storedCartItemCount = parseInt(
      localStorage.getItem("cartItemCount") || "0"
    );
    setCart(storedCart);
    setLocalCartItemCount(storedCartItemCount);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    setLocalCartItemCount(cartItemCount + 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartItemCount", cartItemCount + 1);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    setLocalCartItemCount(cartItemCount - 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartItemCount", cartItemCount - 1);
  };

  const clearCart = () => {
    setCart([]);
    setLocalCartItemCount(0);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartItemCount");
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleOpen = () => {
    setOpen(true);
  };

  const onsubmit = ({ username, password }) => {
    axios
      .get("http://localhost:4000/users")
      .then((result) => {
        setLogin(result.data);
        const loggedInUser = result.data.find(
          (a) => a.username === username && a.password === password
        );

        console.log(username, ": username value");
        console.log(password, ": pwd value");

        reset();

        if (loggedInUser) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          const storedUsername = localStorage.getItem("username");
          const storedpassword = localStorage.getItem("password");

          if (username === storedUsername && password === storedpassword) {
            swal({
              title: "Login Successfully",
              text: "Thank You!",
              icon: "success",
              button: "OK",
            });

            setCartItemCount(0);

            setTimeout(() => {
              setUserOpen(false);
            }, 800);
          } else {
            swal(
              "Failed",
              "The username does not match the one stored!",
              "error"
            );
          }
        } else {
          swal({
            title: "Invalid Credentials",
            text: "Please check your username and password",
            icon: "error",
            button: "OK",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="users">
      <form onSubmit={handleSubmit(onsubmit)} className="users-signin">
        <div className="users-heading">
          <h2>User Login</h2>
          <p>Enter login details to access</p>
          <div className="users-subheading">
            <span>Hi,Welcome Back!</span>
          </div>
        </div>
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
                label="Username"
                type="text"
                fullWidth
              />
            )}
          />
          <p style={{ color: "red" }}>
            {errors?.username?.message && errors?.username?.message}
          </p>
        </div>

        <div>
          <Controller
            name="password"
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            )}
          />
          <p style={{ color: "red" }}>
            {errors?.password?.message && errors?.password?.message}
          </p>
        </div>

          <div className="signup">
            <span>Doesn't have an account?</span> <a>Signup here</a>
          </div>

        <div className="users-btn">
          <div className="forget-pwd">Forget Password? </div>

          <div>
            <Button
              onClick={handleOpen}
              variant="contained"
              type="submit"
              // onClose={handleClose}
              sx={{
                backgroundColor: "#F13030",
                fontSize: "15px",
                "&:hover": { background: "#00C49A", transition: "0.5s" },
                textTransform: "none",
                fontSize: "16px",
                padding: "10px 25px 10px 25px",
                fontWeight: "700",
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Users;
