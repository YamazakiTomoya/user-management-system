import React, { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { CustomCardProvider } from "./parts/CustomCard";
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
  const [openId, setOpenId] = useState<number | null>(null);

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
      <CustomCardProvider>
        {userList.map((user, idx) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <CustomCard
              index={idx}
              title={user.name}
              description={`メール: ${user.email}\n役割: ${user.role}`}
              actions={
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <CustomButton
                    variantType="primary"
                    size="small"
                    onClick={() =>
                      (window.location.href = `/users/${user.id}/edit`)
                    }
                  >
                    編集
                  </CustomButton>
                  <CustomButton
                    variantType="secondary"
                    size="small"
                    onClick={() =>
                      (window.location.href = `/users/${user.id}/details`)
                    }
                  >
                    詳細
                  </CustomButton>
                  <CustomButton
                    variantType="danger"
                    size="small"
                    onClick={() => setOpenId(user.id)}
                  >
                    削除
                  </CustomButton>
                  <CustomModal
                    open={openId === user.id}
                    title="確認"
                    content="本当にこの操作を実行しますか？"
                    onClose={() => setOpenId(null)}
                    onConfirm={() => {
                      handleDelete(user.id);
                      setOpenId(null);
                    }}
                  />
                </Stack>
              }
            />
          </Grid>
        ))}
      </CustomCardProvider>
    </Box>
  );
};

export default UserList;
