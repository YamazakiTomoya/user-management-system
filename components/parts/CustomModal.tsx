import React from "react";
import { Modal, Box, Typography, Button, Slide } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const style = {
  position: "absolute" as const,
  top: "35%",
  left: "35%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        backdropFilter: open ? "blur(4px)" : "none",
        backgroundColor: open ? "rgba(0,0,0,0.2)" : "transparent",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        },
      }}
    >
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography sx={{ mt: 2 }}>{content}</Typography>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} sx={{ mr: 2 }}>
              キャンセル
            </Button>
            {onConfirm && (
              <Button variant="contained" color="primary" onClick={onConfirm}>
                確認
              </Button>
            )}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default CustomModal;
