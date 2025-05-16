import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Switch } from "@mui/material";

interface NavbarProps {
  onThemeChange: () => void;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeChange, darkMode }) => {
  return (
    <AppBar position="static" sx={{ marginBottom : "-32px" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ユーザー管理システム
        </Typography>
        <Switch checked={darkMode} onChange={onThemeChange} color="default" />
        <Button color="inherit" component={Link} href="/">
          ホーム
        </Button>
        <Button color="inherit" component={Link} href="/users">
          ユーザー一覧
        </Button>
        <Button color="inherit" component={Link} href="/register">
          新規登録
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
