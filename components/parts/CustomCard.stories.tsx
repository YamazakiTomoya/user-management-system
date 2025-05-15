import type { Meta, StoryObj } from "@storybook/react";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";
import React from "react";
import { Grid } from "@mui/material";

interface FlipCardStoryProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

const FlipCardStory: React.FC<FlipCardStoryProps> = (args) => {
  const [flipped, setFlipped] = React.useState(false);
  const [mailLine, roleLine] = args.description.split("\n");

  return (
    <div
      style={{
        perspective: 1000,
        minWidth: 275,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          minWidth: 275,
          height: 180,
          transition: "box-shadow 0.3s, transform 0.3s",
          boxShadow: "1px 1px 8px rgba(0,0,0,0.1)",
          position: "relative",
          transformStyle: "preserve-3d",
          transitionProperty: "transform, box-shadow",
          transitionDuration: "0.6s, 0.3s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          borderRadius: 8,
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {/* 表面 */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            background: "#fff",
            cursor: "pointer",
            zIndex: 2,
            pointerEvents: flipped ? "none" : "auto",
          }}
          onClick={() => setFlipped(true)}
        >
          <span style={{ fontSize: 22, fontWeight: "bold" }}>{args.title}</span>
        </div>
        {/* 裏面 */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 8,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            cursor: "pointer",
            zIndex: 1,
            pointerEvents: flipped ? "auto" : "none",
          }}
          onClick={() => setFlipped(false)}
        >
          <span style={{ marginBottom: 8, color: "#666" }}>{mailLine}</span>
          <span style={{ marginBottom: 16, color: "#666" }}>{roleLine}</span>
          {args.actions}
        </div>
      </div>
    </div>
  );
};

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

export const Flip = {
  render: FlipCardStory,
  args: {
    title: "山田 太郎",
    description: "メール: yamada@example.com\n役割: 管理者",
    actions: (
      <Grid container spacing={2} justifyContent="center">
        <CustomButton variantType="primary" size="small">
          編集
        </CustomButton>
        <CustomButton variantType="secondary" size="small">
          詳細
        </CustomButton>
      </Grid>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    title: "アクションなしのカード",
    description: "アクションが含まれていないカードの説明。",
  },
};
