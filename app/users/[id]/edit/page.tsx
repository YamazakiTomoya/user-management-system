"use client";
import React from "react";
import EditUserForm from "../../../../components/EditUserForm";
import { useParams, useRouter } from "next/navigation";
import { Typography, Box } from "@mui/material";

const EditUserPage: React.FC = () => {
  const params = useParams();
  const userId = params?.id;

  const router = useRouter();

  const handleSuccess = () => {
    console.log("登録が成功しました！");
    router.push("/users");
  };

  const handleError = (error: any) => {
    console.error(`エラーが発生しました: ${error}`);
  };

  if (!userId) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          ユーザーIDが見つかりません。
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー編集
      </Typography>
      <EditUserForm
        userId={Number(userId)}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </Box>
  );
};

export default EditUserPage;
