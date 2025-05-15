"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { fetchUserById, updateUser } from "../utils/api";
import CustomButton from "./parts/CustomButton";

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

const EditUserForm: React.FC<EditUserFormProps> = ({
  userId,
  onSuccess,
  onError,
}) => {
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
          {...register("name", {
            required: "名前は必須です。",
            pattern: {
              value: /^[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]+$/,
              message: "名前は漢字、ひらがな、カタカナのみで入力してください。",
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="メールアドレス"
          {...register("email", {
            required: "メールアドレスは必須です。",
            pattern: {
              value:
                /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|outlook\.jp|yahoo\.co\.jp|icloud\.com)$/,
              message:
                "有効なメールアドレスを入力してください（例: gmail.com, outlook.com など）。",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="役割"
          {...register("role", {
            required: "役割は必須です。",
            pattern: {
              value: /^[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FFa-zA-Z\s]+$/,
              message:
                "役割は漢字、ひらがな、カタカナ、英語のみで入力してください。",
            },
          })}
          error={!!errors.role}
          helperText={errors.role?.message}
          fullWidth
          margin="normal"
        />
        <CustomButton type="submit" variantType="primary" fullWidth>
          更新
        </CustomButton>
      </form>
    </Box>
  );
};

export default EditUserForm;
