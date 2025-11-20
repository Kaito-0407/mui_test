'use client';

import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // ユーザー名のバリデーション
    if (!username.trim()) {
      newErrors.username = 'ユーザー名を入力してください';
    } else if (username.length < 3) {
      newErrors.username = 'ユーザー名は3文字以上で入力してください';
    } else if (username.length > 20) {
      newErrors.username = 'ユーザー名は20文字以内で入力してください';
    } else if (!/^[a-zA-Z0-9_\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/.test(username)) {
      newErrors.username = 'ユーザー名に使用できない文字が含まれています';
    }

    // メールアドレスのバリデーション
    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    // パスワードのバリデーション
    if (!password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'パスワードには英大文字、英小文字、数字を含めてください';
    }

    // パスワード確認のバリデーション
    if (!confirmPassword) {
      newErrors.confirmPassword = 'パスワード(確認)を入力してください';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: 実際の登録処理を実装
    console.log('Register:', { username, email, password });

    // 仮の登録処理（成功として扱う）
    router.push('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 700, letterSpacing: '0.1em' }}
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
            新規登録
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* ユーザー名 */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="ユーザー名"
                placeholder="3〜20文字"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors({ ...errors, username: undefined });
                  }
                }}
                error={!!errors.username}
                helperText={errors.username || `${username.length}/20文字`}
                autoComplete="username"
                required
              />
            </Box>

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
                placeholder="8文字以上（英大文字・小文字・数字を含む）"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: undefined });
                  }
                }}
                error={!!errors.password}
                helperText={errors.password}
                autoComplete="new-password"
                required
              />
            </Box>

            {/* パスワード（確認） */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="password"
                label="パスワード（確認）"
                placeholder="もう一度パスワードを入力"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: undefined });
                  }
                }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                autoComplete="new-password"
                required
              />
            </Box>

            {/* 利用規約 */}
            <Box
              sx={{
                p: 2,
                mb: 3,
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                登録することで、当サイトの利用規約とプライバシーポリシーに同意したものとみなされます。
              </Typography>
            </Box>

            {/* 登録ボタン */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              endIcon={<PersonAddIcon />}
              disabled={!username.trim() || !email.trim() || !password || !confirmPassword}
              sx={{ mb: 2 }}
            >
              登録
            </Button>

            <Divider sx={{ my: 3 }} />

            {/* ログインへのリンク */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                すでにアカウントをお持ちですか？
              </Typography>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                  ログイン
                </Button>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* ゲストとして利用 */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button variant="text" color="inherit">
            ゲストとして掲示板を閲覧
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
