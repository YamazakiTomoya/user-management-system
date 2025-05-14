import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { User } from "../types/User";
import { removeUser } from "@/utils/api";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [userList, setUserList] = useState<User[]>(users);

  const handleDelete = (userId: number) => {
    if (window.confirm("本当にこのユーザーを削除しますか？")) {
      removeUser(userId)
        .then(() => {
          setUserList((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
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
    <Box sx={{ mt: 4 }}>
      {userList.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <CustomCard
            title={user.name}
            description={`メール: ${user.email}\n役割: ${user.role}`}
            actions={
              <>
                <Button size="small" href={`/users/${user.id}/edit`}>
                  編集
                </Button>
                <Button size="small" href={`/users/${user.id}/details`}>
                  詳細
                </Button>
                <CustomButton
                  variantType="danger"
                  size="small"
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                >
                  削除
                </CustomButton>
              </>
            }
          />
        </Grid>
      ))}
    </Box>
  );
};

export default UserList;
