import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { createUser } from "../utils/api";

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

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError, disabled }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    createUser(data)
      .then(() => {
        if (onSuccess) onSuccess();
        router.push("/users");
      })
      .catch((error) => {
        if (onError) onError(error);
      });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          {...register("name", { required: "名前は必須です。" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
          disabled={disabled}
        />
        <TextField
          label="メールアドレス"
          {...register("email", { required: "メールアドレスは必須です。" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin="normal"
          disabled={disabled}
        />
        <TextField
          label="役割"
          {...register("role", { required: "役割は必須です。" })}
          error={!!errors.role}
          helperText={errors.role?.message}
          fullWidth
          margin="normal"
          disabled={disabled}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={disabled}
          sx={{ mt: 2 }}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
