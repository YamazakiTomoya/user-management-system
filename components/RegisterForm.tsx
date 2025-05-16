import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Box, Typography, Paper } from "@mui/material";
import { createUser } from "../utils/api";
import CustomButton from "./parts/CustomButton";

interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  disabled,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    createUser(data)
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        if (onError) onError(error);
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom>
          新規登録
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
            disabled={disabled}
            InputLabelProps={{ style: { color: "text.primary" } }}
            InputProps={{
              style: { color: "text.primary", background: "inherit" },
            }}
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
            disabled={disabled}
            InputLabelProps={{ style: { color: "text.primary" } }}
            InputProps={{
              style: { color: "text.primary", background: "inherit" },
            }}
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
            disabled={disabled}
            InputLabelProps={{ style: { color: "text.primary" } }}
            InputProps={{
              style: { color: "text.primary", background: "inherit" },
            }}
          />
          <CustomButton
            type="submit"
            variantType="primary"
            fullWidth
            disabled={disabled}
            sx={{ mt: 2 }}
          >
            登録
          </CustomButton>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
