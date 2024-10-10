import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Images from "../../assets";
import { useAppSelector } from "../../assets/hooks";
import { logOut } from "../../assets/library";
import { FilterProps } from "../../types/types";

const Header = (props: FilterProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = useAppSelector((state: any) => state.profileInfo);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
                    gap: "8px",
                    // flexDirection:{xs:"row",lg:"column"}
                  }}
                >
                  <Typography sx={{ color: "#000", fontWeight: "600", cursor: "pointer" }} onClick={handleClick}>
                    {profile?.data?.name}
                  </Typography>
                  {/* <Typography sx={{ color: "#000",fontSize:"0.85rem",fontWeight:400}}>
                   {profile?.data?.institutionName} 
                </Typography>
                <Typography sx={{ color: "#000",fontSize:"0.85rem",fontWeight:400}}>
                   {profile?.data?.role} 
                </Typography> */}
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    style: {
                      left: "0 !important",
                      top: "55px !important",
                      width: "fit-content", padding: "0.6rem"
                    },
                  }}

                  sx={{
                    "& .MuiPaper-root": {
                      width: "100%"
                    },
                    "& .MuiList-root": {
                      p: 1,
                    },
                  }}
                >
                  {profile?.data?.email && <Typography sx={{ color: "#000", fontSize: "0.85rem", fontWeight: 400 }}>
                    Email : {profile?.data?.email}
                  </Typography>}
                  {profile?.data?.institutionName &&
                    <Typography sx={{ color: "#000", fontSize: "0.85rem", fontWeight: 400 }}>
                      Institution : {profile?.data?.institutionName}
                    </Typography>}
                  {profile?.data?.role &&
                    <Typography sx={{ color: "#000", fontSize: "0.85rem", fontWeight: 400 }}>
                      Role : {profile?.data?.role}
                    </Typography>}
                  {profile?.data?.boothNumber &&
                    <Typography sx={{ color: "#000", fontSize: "0.85rem", fontWeight: 400 }}>
                      Booth Number : {profile?.data?.boothNumber}
                    </Typography>}
                </Menu>
                <Button
                  sx={[{
                    // width: "100px",
                    background: "#3b3f76",
                    textTransform: "none",
                    color: "#fff",
                    borderRadius: "15px",
                    padding: "3px",
                  }]}
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
