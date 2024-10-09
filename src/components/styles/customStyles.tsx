export const globalButton = {
  backgroundColor: "#3B3F76",
  color: "#fff",
  fontWeight: "500",
  fontSize: "16px",
  textTransform: "none",
  borderRadius: "20px",
  padding:"3px",
  "&:hover": {
    backgroundColor: "#3B3F76",
    color: "#fff",
  },
};

export const commonStackStyles = {
  borderRadius: "10px",
  padding: "10px",
  fontWeight: "400",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  cursor:"pointer",
  // alignItems: "center",
};

export const commonTypographyStyles = {
  display: "flex",
  gap: "5px",
  alignItems: "center",
};
export const secondaryButton = {
  backgroundColor: "#fff",
  color: "#3B3F76",
  fontWeight: "500",
  width:"125px",
  fontSize: "16px",
  textTransform: "none",
  borderRadius: "20px",
  padding:"0",
  border:"1px solid #272B56",
  "&:hover": {
    border:"1px solid #272B56",
    color: "#3B3F76",
  backgroundColor: "#fff",
  },
}
export const labelStyle = {
  fontWeight: 600,
  color: "#000",
  mb: 0.5,
};
export const activeTab = {
  textTransform: "capitalize",
  ".MuiTab-root.Mui-selected": {
    fontWeight: 600,
    fontSize: { sm: "1rem", xs: "14px" },
    textTransform: "none",
    borderBottom: "1px solid #000",
  },
  "& .MuiTabs-indicator": {
    background: "none",
  },
};
export const deleteIcon = {
  width:"1.8rem",
  height:"1.8rem"
};

export const expandCardStyles = {
  cardCollapse: {
    mb: 2,
    cursor: "pointer",
    borderRadius: "10px",
    "&.MuiPaper-elevation1": {
      color: "#000",
      borderRadius: "0.625rem",
      overflow: "hidden",
      minWidth: "18.75rem",
    },
  },
  cardImg:{
    width: "40px", 
    height: "40px", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%", 

  },
  cardTitle: {
    "&.MuiCardHeader-root": {
      padding: "4px",
    },
    ".MuiTypography-root": {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  cardContent: {
    "&.MuiCollapse-root": {
      backgroundColor: "#fff",
    },
  },
  iconStyle: {
    // border: "1px solid #3B3F76",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    borderRadius: "5px",
    padding: "4px",
    width:"30px",
    cursor:"pointer"
  },
  filteredList: {
    background: "#FFF7E9",
    color: "#3B3F76",
    border:"1px solid #E4C48A",
    textTransform: "capitalize",
    m: 1,
    borderRadius: "0.625rem",
    // width: "5rem",
    height: "2rem",
    fontSize: "12px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "inline-block",
    fontWeight:"400",
    position: "relative",
    '&:hover .close-icon': {
      visibility: 'visible',
    },
    "&:hover":{
      background: "#FFF7E9"
    }
  },
};
