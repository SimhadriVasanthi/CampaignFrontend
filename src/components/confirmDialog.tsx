import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Images from "../assets";
import { ModalDialogprops } from "../types/types";

const ConfirmDialog = ({
  open,
  handleClose,
  additionalData,
}: ModalDialogprops<{
  title: string;
  content?: any;
  onSubmit: any;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const styles = {
    ".MuiPaper-root": {
      width: "25rem",
      borderRadius: "5px",
      padding: "10px",
      ".MuiDialogContent-root .MuiTypography-root": {
        fontSize: "0.9rem",
      },
    },
  };

  const handleYesClick = async () => {
    setLoading(true); 
    try {
      await additionalData?.onSubmit(); 
    } catch (error) {
      console.error("Error in onSubmit:", error); 
    } finally {
      setLoading(false); 
      if (handleClose) handleClose(); 
    }
  };

  return (
    <Box>
      <Dialog
        open={open || false}
        onClose={() => (handleClose ? handleClose() : null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={styles}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "1.25rem",fontWeight:600,textAlign:"center" }}>
          {additionalData?.title}
        </DialogTitle>
        <DialogContent>
            {additionalData?.content}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-evenly" }}>
          <Button
            onClick={handleYesClick}
            disabled={loading} 
            sx={{
              background: "#3B3F76",
              color: "#fff",
              borderRadius: "20px",
              textTransform: "none",
              width:"80px",
              "&:hover": {
                background: "#3B3F76",
                color: "#fff",
              },
            }}
          >
            {loading ? <img
              src={Images.standardLoader}
              alt="load"
              style={{ width: "20px", height: "20px",}}
            /> : "Yes"}
          </Button>
          <Button
            onClick={() => (handleClose ? handleClose() : null)}
            disabled={loading} 
            sx={{
              border: "1px solid #FEB853",
              borderRadius: "20px",
              color: "#FEB853",
              textTransform: "none",
              width:"80px",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfirmDialog;
