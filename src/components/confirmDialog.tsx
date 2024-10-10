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
  content?: string;
  onSubmit: any;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const styles = {
    ".MuiPaper-root": {
      width: "23rem",
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
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "1rem" }}>
          {additionalData?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "0.8rem", fontWeight: 500 }}
          >
            {additionalData?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-evenly" }}>
          <Button
            onClick={handleYesClick}
            disabled={loading} 
            sx={{
              background: "#3B3F76",
              color: "#fff",
              borderRadius: "5px",
              textTransform: "none",
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
              borderRadius: "5px",
              color: "#FEB853",
              textTransform: "none",
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
