import React from "react";
import { Button } from "@mui/material";
import { removeUser } from "../utils/api";

interface DeleteUserButtonProps {
  userId: number;
  onDelete: (userId: number) => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDelete,
}) => {
  const handleDelete = () => {
    if (confirm("本当にこのユーザーを削除しますか？")) {
      removeUser(userId)
        .then(() => {
          onDelete(userId);
        })
        .catch((error) => {
          console.error("削除に失敗しました:", error);
          alert("削除に失敗しました。");
        });
    } else {
      alert("削除がキャンセルされました。");
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      削除
    </Button>
  );
};

export default DeleteUserButton;
