import type { Meta, StoryObj } from "@storybook/react";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";

const meta: Meta<typeof CustomCard> = {
  title: "Components/Parts/CustomCard",
  component: CustomCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CustomCard>;

export const Default: Story = {
  args: {
    title: "カードタイトル",
    description: "これはカスタムカードの説明です。",
    actions: (
      <>
        <CustomButton variantType="secondary">アクション1</CustomButton>
        <CustomButton variantType="danger">アクション2</CustomButton>
      </>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    title: "アクションなしのカード",
    description: "アクションが含まれていないカードの説明。",
  },
};
