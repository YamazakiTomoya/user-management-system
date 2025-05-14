import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { User } from "../types/User";
import Link from "next/link";
import CustomButton from "./parts/CustomButton"; // CustomButtonをインポート
import { removeUser } from "@/utils/api";

interface UserCardProps {
  user: User;
  onDelete: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const handleDelete = (userId: number) => {
    if (window.confirm("本当にこのユーザーを削除しますか？")) {
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
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography variant="body2">役割: {user.role}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/users/${user.id}/edit`}>
          編集
        </Button>
        <Button size="small" component={Link} href={`/users/${user.id}/details`}>
          詳細
        </Button>
        <CustomButton
          variantType="danger"
          size="small"
          onClick={() => handleDelete(user.id)}
        >
          削除
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
