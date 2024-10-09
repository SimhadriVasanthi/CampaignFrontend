import { Card, Typography, Box } from "@mui/material";
// import { customCardProps } from "../types/types";

export default function CustomCard({ children, title, disabled, i }: any) {
  const borderColors = ["#D1D3F9", "#75ECE5", "#FFA89C", "#FAEAD0"];
  const bgColors = ["#F4F4FF", "#B0FEFA", "#FFD8D3", "#FFF7E9"];

  return (
    <Box sx={{ position: "relative", mb: 2 ,width:"96%"}}>
      <Box
        sx={{
          position: "absolute",
          top: 4, 
          left: 8,
          right: 0,
          bottom: 0,
          zIndex: 0,
          borderRadius: "15px",
          background: `${borderColors[i % borderColors.length]}`,
          width: "100%",
          height: "100%",
          transform:"rotate(181deg)"
        }}
      />
      
      <Card
        sx={{
          p: 2,
          borderRadius: "15px",
          mb: 1,
          cursor: "pointer",
          position: "relative",
          background: disabled ? "gray" : "#F0F1F9",
          zIndex: 1,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ marginTop: "10px" }}>{children}</div>
      </Card>
    </Box>
  );
}
