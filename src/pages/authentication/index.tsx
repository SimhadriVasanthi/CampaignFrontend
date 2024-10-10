import {
  Box,
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
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
import ConfirmDialog from "../../components/confirmDialog";

const LoginComp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false)
  const [login,setLogin] = useState<any>()
  const initValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid Email")
      .required("Email is required")
      .max(40, "Email must be at most 40 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmitForm = async () => {
    // setLoading(true);
    try {
      const response = await authenticateLogin(login);
      if (response.data.success) {
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("userType", response.data.data.userType);
        localStorage.setItem("_campaign_token", response.data.data.AccessToken);
        checkUser();
        navigate(`/?s=${localStorage.getItem("tempId") || ""}&p=${localStorage.getItem("tempP") || ""}`);
        window.location.reload();
      }
    } catch (err) {
      // setLoading(false);
    }
  };

  const handleOpen = (values:any) => {
    setOpen(true)
    setLogin(values)
  }
  console.log(login)

  return (
    <Box sx={{ height: "100%" }}>
      <Grid container sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Grid item xs={12} md={6.5} sx={{ padding: "2rem", background: "#d1d3f933", borderRadius: "10px" }}>
          <Box sx={{ my: 3 }}>
            <Box sx={{ mb: 1.5, display: "flex", justifyContent: "center" }}>
              <Box component="img" src={Images.campusrootLogo} alt="logo" sx={{ width: { xs: "120px", md: "180px" } }} />
            </Box>

            <Grid container>
              <Grid item xs={12} sx={{ height: "250px" }}>
                <Box sx={{ textAlign: "center", padding: 3 }}>
                  <Formik
                    initialValues={initValues}
                    validationSchema={loginSchema}
                    onSubmit={(values:any) =>handleOpen(values)}
                    enableReinitialize={true}
                  >
                    {({ errors, touched, values, handleChange, handleSubmit}) => (
                      <Form onSubmit={handleSubmit}>
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
                            <div style={{ color: "#e60c0c", fontSize: "12px", textAlign: "start", marginTop: "10px" }}>
                              <ErrorMessage name="email" component="div" />
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              size="small"
                              label="Password *"
                              placeholder="Enter password"
                              value={values.password}
                              onChange={handleChange}
                              error={touched.password && Boolean(errors.password)}
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <div style={{ color: "#e60c0c", fontSize: "12px", textAlign: "start", marginTop: "10px" }}>
                              <ErrorMessage name="password" component="div" />
                            </div>
                          </Grid>
                          <div style={{ color: "#e60c0c", fontSize: "12px", textAlign: "start", marginLeft: "20px" }}>
                            <ErrorMessage name="privacyPolicy" component="div" />
                          </div>
                          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Button
                              sx={[
                                {
                                  width: "100px",
                                  background: "#3b3f76",
                                  textTransform: "none",
                                  color: "#fff",
                                  borderRadius: "15px",
                                },
                              ]}
                              type="submit"
                            >
                                Continue
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
      <ConfirmDialog
        open={open}
        handleClose={() => setOpen(false)}
        additionalData={{
          onSubmit: onSubmitForm, 
          title: "Attention Delegates",
          content:<ul style={{margin:0,padding:0}}>
            <li style={{lineHeight:"24px",color:"gray"}}>To protect attendee privacy, <b style={{color:"#000"}}>please do not collect</b>  students contact information or email addresses during the education fair.</li>
            <li style={{lineHeight:"24px",color:"gray"}}>After the event, the One Window team will follow up with students using conversation notes for application processing.</li>
          </ul>
          
        }}
      />
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
