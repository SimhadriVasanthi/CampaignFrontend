import {
  Box,
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import Images from "../../assets";
import { authenticateLogin } from "../../services";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { checkUser } from "../../assets/library";

const LoginComp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false); 

  const initValues = {
    email: "",
    password: ""
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid Email")
      .required("Email is required")
      .max(40, "Email must be at most 40 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
  });

  const onSubmitForm = async (values: any) => {
    setLoading(true);
    try {
      const response = await authenticateLogin(values);
      if (response.data.success) {
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("userType", response.data.data.userType);
        localStorage.setItem("_campaign_token", response.data.data.AccessToken);
        checkUser()
        navigate("/");
        window.location.reload()
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Grid container sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Grid item xs={12} md={6.5} sx={{ padding: "2rem", background: "#d1d3f933", borderRadius: "10px" }}>
          <Box sx={{  my: 3 }}>
            <Box sx={{ mb: 1.5, display: "flex", justifyContent: "center" }}>
              <Box component="img" src={Images.campusrootLogo} alt="logo" sx={{ width: { xs: "120px", md: "180px" } }} />
            </Box>

            <Grid container>
              <Grid item xs={12}  sx={{ height: "250px" }}>
                <Box sx={{ textAlign: 'center', padding: 3 }}>
                  <Formik
                    initialValues={initValues}
                    validationSchema={loginSchema}
                    onSubmit={onSubmitForm}
                    enableReinitialize={true}
                  >
                    {({ errors, touched, values, handleChange }) => (
                      <Form>
                        <Grid container spacing={1.25}>
                          <Grid item xs={12}>
                            <TextField
                              id="email"
                              name="email"
                              type="email"
                              size="small"
                              label="Email *"
                              placeholder="Enter email"
                              value={values.email}
                              onChange={handleChange}
                              error={touched.email && Boolean(errors.email)}
                              fullWidth
                            />
                            <div style={{ color: "#e60c0c", fontSize: "12px",textAlign:"start",marginTop:"10px" }}>
                              <ErrorMessage name="email" component="div" />
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"} // Toggle type
                              size="small"
                              label="Password *"
                              placeholder="Enter password"
                              value={values.password}
                              onChange={handleChange}
                              error={touched.password && Boolean(errors.password)}
                              fullWidth
                              InputProps={{
                                // Icon inside password field
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => setShowPassword(!showPassword)}
                                      edge="end"
                                    >
                                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <div style={{ color: "#e60c0c", fontSize: "12px",textAlign:"start",marginTop:"10px"  }}>
                              <ErrorMessage name="password" component="div" />
                            </div>
                          </Grid>
                          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Button
                              sx={[{
                                width: "100px",
                                border: "1px solid #3b3f76",
                                textTransform: "none",
                                color: "#3b3f76",
                                borderRadius: "15px",
                                padding: 0,
                              }]}
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? (
                                <img
                                  src={Images.standardLoader}
                                  alt="Loading..."
                                  style={{ width: "20px", height: "20px" }}
                                />
                              ) : (
                                "Continue"
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const Login = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
          <img
            src={Images.counsellor}
            alt="counsellor-illustration"
            style={{ height: "99.5vh", width: "-webkit-fill-available" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LoginComp />
        </Grid>
      </Grid>
    </div>
  )
}

export default Login;
