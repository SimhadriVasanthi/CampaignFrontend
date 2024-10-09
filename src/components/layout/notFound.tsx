import { Box, Typography } from "@mui/material";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "450px",
      }}
    >
      <WarningIcon sx={{ color: "red", fontSize: "5rem" }} />
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Sorry, we cannot find the page!
      </Typography>
      <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
        Please try to navigate through the options provided in header{" "}
      </Typography>
    </Box>
  );
};

export default NotFound;
