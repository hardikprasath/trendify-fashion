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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import swal from "sweetalert";
// import "./signup.css";
import "./AdminSignin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [login, setLogin] = useState();

  const navigate = useNavigate();
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({});

  const onsubmit = ({ username, password }) => {
    axios
      .get("http://localhost:4000/admin")
      .then((result) => {
        setLogin(result.data);
        const loggedInUser = result.data.find(
          (a) => a.username === username && a.password === password
        );
        reset();
        if (loggedInUser) {
          setTimeout(() => {
            navigate("/productlist");
          }, 2000);

          swal({
            title: "Login Successfully",
            text: "Thank You!",
            icon: "success",
            button: "OK",
          });
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

  /* */
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /* */

  return (
    <div className="signin">
      <form onSubmit={handleSubmit(onsubmit)} className="forms-signin">
        <div className="signin-heading">
          <h2>Admin Login</h2>
          <p>Enter login details to access</p>
          <div className="signin-subheading">
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

        <div className="admin-signup">
            <span>Doesn't have an account?</span> <a>Signup here</a>
          </div>

        <div className="admin-btn">
          <div>
            <div className="forget-pwd">Forget Password? </div>
          </div>

          <div>
            <Button
              variant="contained"
              type="submit"
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

export default Signin;
