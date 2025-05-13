"use client";
import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    console.log("登録が成功しました！");
    router.push("/users");
  };

  const handleError = (error: any) => {
    console.error(`エラーが発生しました: ${error}`);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        新規登録
      </Typography>
      <RegisterForm
        onSuccess={handleSuccess}
        onError={handleError}
        disabled={false}
      />
    </Box>
  );
};

export default RegisterPage;
