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
import "./signup.css";
import Signin from "./Signin";

function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordd, setShowPasswordd] = React.useState(false);

  const [passwordCheck,setPasswordCheck]=useState(false); //password mismatch
  const [formValid, setFormValid] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({});

  const onsubmit = () => {
    reset()
    /* popup  start*/
    swal({
      title: "Login Successfully",
      text: "Thank You!",
      icon: "success",
      button: "ok",
    });
    /*popup end */
  };

  /*password start */
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPasswords = () => setShowPasswordd((show) => !show);

  const handleMouseDownPasswords = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    var password = getValues("password");
    if (password !== event.target.value) {
      setPasswordCheck(true)
    }else{
      setPasswordCheck(false)
    }
  };

  useEffect(() => {
    validateForm();
  }, [getValues("Fullname"), getValues("Email"), getValues("password"), getValues("confirmpassword"), passwordCheck])
  

  const validateForm = () => {
    const { Fullname, Email, password, confirmpassword } = getValues();
    const isFormFilled =
      Fullname !== "" && Email !== "" && password !== "" && confirmpassword !== "";
    setFormValid(isFormFilled && !passwordCheck);
  };

  /*password end */

  

  return (
    <div className="signup">
      <form onSubmit={handleSubmit(onsubmit)} className="forms">
        <div className="signup-heading">
          <h2>Sign Up</h2>
          <p>Create your account to access</p>
        </div>
        <div>
          <Controller
            name="Fullname"
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
                label="Fullname"
                type="text"
                fullWidth
              />
            )}
          />
          <p style={{ color: "red" }}>
            {errors?.Fullname?.message && errors?.Fullname?.message}
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
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter valid email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="text"
                fullWidth
              />
            )}
          />
          <p style={{ color: "red" }}>
            {errors?.Email?.message && errors?.Email?.message}
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

        <div>
          <Controller
            name="confirmpassword"
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
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-password"
                  type={showPasswordd ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswords}
                        onMouseDown={handleMouseDownPasswords}
                        edge="end"
                      >
                        {showPasswordd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm password"
                  onInput={handleChangePassword}
                />
              </FormControl>
            )}
          />
          <p style={{ color: "red" }}>
            {errors?.confirmpassword?.message &&
              errors?.confirmpassword?.message}
          </p>
          {
            passwordCheck===true && (
              <p style={{color:"red"}}>Password mismatch</p>
            )
          }
        </div>

        <div className="dd">
          <div className="signup-con">
            <span>Already have an account? Login here</span>
          </div>

          <div className="btn">
            <Button
              variant="contained"
              type="submit"
              disabled={!formValid}
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
              Sign Up
            </Button>
           
          </div>
        </div>
      </form>
      {/* <Signin /> */}
    </div>
  );
}

export default Signup;
