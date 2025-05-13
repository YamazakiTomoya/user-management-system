import React from "react";
import { Box, Grid } from "@mui/material";
import UserCard from "./UserCard";
import { User } from "../types/User";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserList;