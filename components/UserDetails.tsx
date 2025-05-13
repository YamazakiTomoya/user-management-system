import React from "react";
import { Box, Typography } from "@mui/material";
import { User } from "../types/User";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 4, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        ユーザー詳細
      </Typography>
      <Typography variant="body1">
        <strong>ID:</strong> {user.id}
      </Typography>
      <Typography variant="body1">
        <strong>名前:</strong> {user.name}
      </Typography>
      <Typography variant="body1">
        <strong>メールアドレス:</strong> {user.email}
      </Typography>
      <Typography variant="body1">
        <strong>役職:</strong> {user.role}
      </Typography>
    </Box>
  );
};

export default UserDetails;