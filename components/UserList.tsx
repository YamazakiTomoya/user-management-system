import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const idOptions = Array.from(new Set(users.map((u) => u.id)));
  const roleOptions = Array.from(new Set(users.map((u) => u.role)));

  let filteredUsers = userList.filter((user) => {
    const idMatch = selectedId ? String(user.id) === selectedId : true;
    const roleMatch = selectedRole ? user.role === selectedRole : true;
    return idMatch && roleMatch;
  });

  filteredUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

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
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="id-select-label">ID</InputLabel>
          <Select
            labelId="id-select-label"
            value={selectedId}
            label="ID"
            onChange={(e) => setSelectedId(e.target.value)}
            size="small"
          >
            <MenuItem value="">すべて</MenuItem>
            {idOptions.map((id) => (
              <MenuItem key={id} value={String(id)}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="role-select-label">役割</InputLabel>
          <Select
            labelId="role-select-label"
            value={selectedRole}
            label="役割"
            onChange={(e) => setSelectedRole(e.target.value)}
            size="small"
          >
            <MenuItem value="">すべて</MenuItem>
            {roleOptions.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="sort-select-label">ID並び順</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortOrder}
            label="ID並び順"
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            size="small"
          >
            <MenuItem value="asc">ID昇順</MenuItem>
            <MenuItem value="desc">ID降順</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <CustomCardProvider>
        {filteredUsers.map((user, idx) => (
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
