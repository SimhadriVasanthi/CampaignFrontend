import * as React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { ModalDialogprops } from "../../types/types";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../assets/hooks";
import { closePopup } from "../../store/slices/popupSlice";
import { useNavigate } from "react-router-dom";

const CustomModal = ({ open, children,additionalData }: ModalDialogprops<{ width: any;}>) => {
const navigate=useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          dispatch(closePopup());
          setTimeout(() => navigate("/"), 100); 
      }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            minWidth: "200px",
            width: `${additionalData?.width}`,
            borderRadius: "1rem",
            padding: "0.5rem",
            maxWidth: "1300px",
          },
        }}
      >
        <CloseIcon
          onClick={()=>{
            dispatch(closePopup());
            setTimeout(() => navigate("/"), 100)}}
          sx={{
            position: "absolute",
            right: 14,
            top: 14,
            color: "#E94040",
            cursor: "pointer",
          }}
        />
        <DialogContent
          sx={{
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#fff",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-track": {
              // backgroundColor: "#fff",
            },
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomModal;
