"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserById } from "../../../../utils/api";
import { User } from "../../../../types/User";
import UserDetails from "../../../../components/UserDetails";
import { Box, CircularProgress, Alert, Typography } from "@mui/material";

const UserDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ユーザーIDが見つかりません。");
      setLoading(false);
      return;
    }

    fetchUserById(Number(id))
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setError("ユーザー情報の取得に失敗しました。");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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

  if (!user) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          ユーザー情報が見つかりません。
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー詳細
      </Typography>
      <UserDetails user={user} />
    </Box>
  );
};

export default UserDetailsPage;