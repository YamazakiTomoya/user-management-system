"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { fetchUserById, updateUser } from "../utils/api";

interface EditUserFormProps {
  userId: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userId, onSuccess, onError}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormInputs>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchUserById(userId)
      .then((user) => {
        if (user) {
          setValue("name", user.name);
          setValue("email", user.email);
          setValue("role", user.role);
        }
      })
      .catch(() => {
        setError("ユーザー情報の取得に失敗しました。");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, setValue]);

  const onSubmit: SubmitHandler<EditUserFormInputs> = (data) => {
    setError(null);
    updateUser(userId, data)
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        if (onError) onError(error);
        setError("ユーザー情報の更新に失敗しました。");
      });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー情報編集
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          {...register("name", { required: "名前は必須です。" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="メールアドレス"
          {...register("email", { required: "メールアドレスは必須です。" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="役割"
          {...register("role", { required: "役割は必須です。" })}
          error={!!errors.role}
          helperText={errors.role?.message}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          更新
        </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;
