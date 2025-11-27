"use client";

import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // メールアドレスのバリデーション
    if (!email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    // パスワードのバリデーション
    if (!password) {
      newErrors.password = "パスワードを入力してください";
    } else if (password.length < 6) {
      newErrors.password = "パスワードは6文字以上で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: 実際の認証処理を実装
    console.log("Login:", { email, password });

    // 仮のログイン処理（成功として扱う）
    router.push("/");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, letterSpacing: "0.1em" }}
        >
          BOARD
        </Typography>
        <Typography variant="body1" color="text.secondary">
          会員制掲示板システム
        </Typography>
      </Box>

      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
            ログイン
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* メールアドレス */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="email"
                label="メールアドレス"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                required
              />
            </Box>

            {/* パスワード */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="password"
                label="パスワード"
                placeholder="6文字以上"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: undefined });
                  }
                }}
                error={!!errors.password}
                helperText={errors.password}
                autoComplete="current-password"
                required
              />
            </Box>

            {/* パスワードを忘れた場合 */}
            <Box sx={{ mb: 3, textAlign: "right" }}>
              <Typography variant="body2">
                <MuiLink href="#" underline="hover" color="text.secondary">
                  パスワードをお忘れですか？
                </MuiLink>
              </Typography>
            </Box>

            {/* ログインボタン */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              endIcon={<LoginIcon />}
              disabled={!email.trim() || !password}
              sx={{ mb: 2 }}
            >
              ログイン
            </Button>

            <Divider sx={{ my: 3 }} />

            {/* 新規登録へのリンク */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                アカウントをお持ちでないですか？
              </Typography>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                  新規登録
                </Button>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* ゲストとして利用 */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button variant="text" color="inherit">
            ゲストとして掲示板を閲覧
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
