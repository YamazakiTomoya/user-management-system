import React, { useRef, useState } from "react";
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
  cursor: "move", // ドラッグ可能を示す
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  // ドラッグ開始
  const handleMouseDown = (e: React.MouseEvent) => {
    if (boxRef.current) {
      setDragging(true);
      const rect = boxRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // ドラッグ中
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  // ドラッグ終了
  const handleMouseUp = () => {
    setDragging(false);
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging, offset]);

  // モーダルを閉じたら位置リセット
  React.useEffect(() => {
    if (!open) setPosition(null);
  }, [open]);

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
        <Box
          ref={boxRef}
          sx={{
            ...style,
            top: position ? `${position.y}px` : style.top,
            left: position ? `${position.x}px` : style.left,
            transform: position ? "none" : style.transform,
            cursor: dragging ? "grabbing" : "move",
            userSelect: dragging ? "none" : "auto",
          }}
          onMouseDown={handleMouseDown}
        >
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
