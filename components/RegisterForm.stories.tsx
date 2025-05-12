import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

// メタデータ
const meta: Meta<typeof RegisterForm> = {
  title: 'Components/RegisterForm',
  component: RegisterForm,
};

export default meta;

// ストーリーの定義
type Story = StoryObj<typeof RegisterForm>;

// デフォルトストーリーの設定
export const Default: Story = {
  args: {
    onSuccess: () => console.log("登録成功！"),
    onError: (error) => console.error(`エラーが発生しました: ${error}`),
    disabled: false,
  },
};

