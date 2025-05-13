import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import UserCard from "./UserCard";
import { User } from "../types/User";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [userList, setUserList] = useState<User[]>(users);

  const handleDelete = (userId: number) => {
    setUserList((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <Box sx={{ mt: 4 }}>
      {userList.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <UserCard user={user} onDelete={handleDelete} />
        </Grid>
      ))}
    </Box>
  );
};

export default UserList;
