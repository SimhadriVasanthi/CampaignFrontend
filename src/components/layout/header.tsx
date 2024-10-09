import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Images from "../../assets";
import { useAppSelector } from "../../assets/hooks";
import { logOut } from "../../assets/library";
import { FilterProps } from "../../types/types";

const Header = (props: FilterProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = useAppSelector((state:any) => state.profileInfo);
  // eslint-disable-next-line
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  return (
    <>
      {location.pathname === "/login" ? null : (
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          "&.MuiAppBar-root ": {
            backgroundColor: "#fff",
            px: { xs: 0, sm: 5 },
            boxShadow: "0 2px 2px #3f5c6e26",
          },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Box
              component="img"
              src={Images.campusrootLogo}
              alt="logo"
              onClick={() => navigate("/")}
              sx={{ display: {}, mr: 1, width: "150px", cursor: "pointer" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "50px",
                  gap: "20px",
                }}
              >
                <img
                  className="user-info img"
                  style={{
                    borderRadius: "50%",
                    height: "50px",
                    width: "50px",
                  }}
                  src={profile.data?.displayPicSrc ? profile?.data?.displayPicSrc : "https://res.cloudinary.com/dffdp7skh/image/upload/v1706879929/nvitahnrlhvmtcizpthx.png"}
                  alt="User Profile"
                />
                <Typography sx={{ color: "#000", fontWeight: "600" }}>
                   {profile?.data?.firstName} 
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.clear();
                  logOut();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )} 
    </>
  );
};

export default Header;
