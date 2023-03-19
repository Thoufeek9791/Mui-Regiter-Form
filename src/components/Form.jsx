import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

export const Form = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isconfirmPassword, setIsconfirmPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    tnc: false,
  });

  console.log(details);

  function handleVisiblityPass(e) {
    setIsShowPassword((prevState) => !prevState);
  }

  function handleVisiblityConPass(e) {
    setIsconfirmPassword((prevState) => !prevState);
  }

  function handleChange(e) {
    if (e.target.name === "tnc") {
      setDetails((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.checked,
        };
      });
    } else if (e.target.name === "email") {
      if (details.email.includes("@")) {
        setIsEmail(true);
      } else setIsEmail(false);
      setDetails((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setDetails((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    }
  }

  function handleSubmit(e) {
    console.log("inside submit");
    setIsSubmit(true);
  }
  return (
    <Box width={600}>
      <Typography variant="h1" color={"primary"} gutterBottom align="center">
        Register
      </Typography>
      <Stack direction={"row"} spacing={5} mb={3}>
        <FormControl fullWidth>
          <TextField
            label="FirstName"
            required
            value={details.firstName}
            onChange={handleChange}
            name={"firstName"}
            error={isSubmit && details.firstName === "" ? true : false}
            helperText={
              isSubmit && details.firstName === ""
                ? "Please Enter First Name"
                : ""
            }
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="LastName"
            required
            value={details.lastName}
            onChange={handleChange}
            name={"lastName"}
            error={isSubmit && details.lastName === "" ? true : false}
            helperText={
              isSubmit && details.lastName === ""
                ? "Please Enter Last Name"
                : ""
            }
          />
        </FormControl>
      </Stack>
      <Stack mb={3}>
        <FormControl>
          <FormLabel id="gender-label" required>
            Gender
          </FormLabel>
          <RadioGroup
            row
            name="gender"
            aria-label="gender-label"
            value={details.gender}
            onChange={handleChange}
            error={isSubmit && details.gender === "" ? true : false}
            helperText={
              isSubmit && details.gender === "" ? "Please Select Gender" : ""
            }
          >
            <FormControlLabel
              control={<Radio />}
              label="Male"
              value={"M"}
              name="gender"
            />
            <FormControlLabel
              control={<Radio />}
              label="Female"
              value={"F"}
              name="gender"
            />
            <FormControlLabel
              control={<Radio />}
              label="Others"
              value={"O"}
              name="gender"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack mb={3}>
        <FormControl>
          <TextField
            label="Email"
            type={"email"}
            name={"email"}
            value={details.email}
            onChange={handleChange}
            error={
              (isSubmit && details.email.length === 0) ||
              (!isEmail && details.email.length > 0)
            }
            helperText={
              isSubmit && details.email.length === 0
                ? "Please Enter Email"
                : details.email.length > 0 &&
                  !isEmail &&
                  "Password Should Contain @ Symbol"
            }
            required
          />
        </FormControl>
      </Stack>
      <Stack direction={"row"} spacing={5} mb={3}>
        <FormControl>
          <TextField
            type={isShowPassword ? "text" : "password"}
            label="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton onClick={handleVisiblityPass} id={"password"}>
                    {isShowPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            value={details.password}
            onChange={handleChange}
            name="password"
            error={
              (isSubmit && details.password.length === 0) ||
              (details.password.length > 0 && details.password.length < 8)
            }
            helperText={
              isSubmit && details.password.length === 0
                ? "Please Enter Password"
                : details.password.length > 0 &&
                  details.password.length < 8 &&
                  "Password Should minimum 8 Characters"
            }
          />
         {details.password.length > 0 &&  <PasswordStrengthBar password={details.password} />}
        </FormControl>
        <FormControl>
          <TextField
            type={isconfirmPassword ? "text" : "password"}
            label="Confirm Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton onClick={handleVisiblityConPass}>
                    {isconfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            value={details.confirmPassword}
            onChange={handleChange}
            name={"confirmPassword"}
            error={
              (isSubmit && details.password.length === 0) ||
              (details.password != details.confirmPassword &&
                details.confirmPassword.length != 0)
            }
            helperText={
              isSubmit && details.password.length === 0
                ? "Please Enter Password"
                : details.password != details.confirmPassword &&
                  details.confirmPassword.length != 0 &&
                  "confirm Password doesnt match"
            }
          />
        </FormControl>
      </Stack>

      <Stack mb={3}>
        <FormControl>
          <FormLabel required id="country-label">
            Select Your Country
          </FormLabel>
          <Autocomplete
            options={["India", "Australia", "America"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                error={isSubmit && details.country.length === 0}
                helperText={
                  isSubmit &&
                  details.country.length === 0 &&
                  "Please Select Country"
                }
              />
            )}
            value={details.country}
            onChange={(e, newValue) => {
              setDetails((prevState) => {
                return {
                  ...prevState,
                  country: newValue,
                };
              });
            }}
            name={"country"}
          />
        </FormControl>
      </Stack>

      <Stack mb={3}>
        <FormControl>
          <FormControlLabel
            label="I accept Terms and Conditions"
            control={
              <Checkbox
                checked={details.tnc}
                onChange={handleChange}
                name={"tnc"}
              />
            }
            name={"tnc"}
          />
        </FormControl>
      </Stack>

      <Stack>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};
