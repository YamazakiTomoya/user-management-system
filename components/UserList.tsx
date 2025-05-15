import React, { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { User } from "../types/User";
import { removeUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [userList, setUserList] = useState<User[]>(users);
  const [open, setOpen] = useState(false);

  const handleDelete = (userId: number) => {
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
  };

  return (
    <Box sx={{ mt: 4 }}>
      {userList.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <CustomCard
            title={user.name}
            description={`メール: ${user.email}\n役役: ${user.role}`}
            actions={
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <CustomButton
                  variantType="primary"
                  size="small"
                  onClick={() => (window.location.href = `/users/${user.id}/edit`)}
                >
                  編集
                </CustomButton>
                <CustomButton
                  variantType="secondary"
                  size="small"
                  onClick={() => (window.location.href = `/users/${user.id}/details`)}
                >
                  詳細
                </CustomButton>
                <CustomButton
                  variantType="danger"
                  size="small"
                  onClick={() => setOpen(true)}
                >
                  削除
                </CustomButton>
                <CustomModal
                  open={open}
                  title="確認"
                  content="本当にこの操作を実行しますか？"
                  onClose={() => setOpen(false)}
                  onConfirm={() => {
                    handleDelete(user.id);
                    setOpen(false);
                  }}
                />
              </Stack>
            }
          />
        </Grid>
      ))}
    </Box>
  );
};

export default UserList;
