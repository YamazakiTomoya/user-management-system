'use client';
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/api';
import { User } from '../../types/User';
import UserList from '../../components/UserList';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        setError('ユーザーの取得に失敗しました。' + err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー一覧
      </Typography>
      <UserList users={users} />
    </Box>
  );
};

export default UsersPage;