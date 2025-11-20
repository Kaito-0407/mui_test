'use client';

import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import { mockUsers } from '@/data/mockData';

export default function SettingsPage() {
  // 現在ログイン中のユーザーを取得（仮）
  const currentUser = mockUsers[0];

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotification, setEmailNotification] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
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
    }

    // メールアドレスのバリデーション
    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    // パスワード変更時のバリデーション
    if (newPassword) {
      if (!currentPassword) {
        newErrors.currentPassword = '現在のパスワードを入力してください';
      }

      if (newPassword.length < 8) {
        newErrors.newPassword = 'パスワードは8文字以上で入力してください';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
        newErrors.newPassword = 'パスワードには英大文字、英小文字、数字を含めてください';
      }

      if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = 'パスワードが一致しません';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: 実際の更新処理を実装
    console.log('Update settings:', {
      username,
      email,
      newPassword: newPassword ? '***' : null,
      emailNotification,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // パスワードフィールドをクリア
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* 戻るボタン */}
      <Link href="/profile" style={{ textDecoration: 'none' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
          variant="text"
        >
          プロフィールに戻る
        </Button>
      </Link>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        アカウント設定
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          設定を保存しました
        </Alert>
      )}

      {/* プロフィール情報 */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            プロフィール情報
          </Typography>

          {/* アバター */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'black',
                fontSize: '1.5rem',
              }}
            >
              {username[0]?.toUpperCase()}
            </Avatar>
            <Button
              variant="outlined"
              startIcon={<PhotoCameraIcon />}
              component="label"
            >
              画像を変更
              <input type="file" hidden accept="image/*" />
            </Button>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* ユーザー名 */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="ユーザー名"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors({ ...errors, username: undefined });
                  }
                }}
                error={!!errors.username}
                helperText={errors.username || `${username.length}/20文字`}
                required
              />
            </Box>

            {/* メールアドレス */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="email"
                label="メールアドレス"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* パスワード変更 */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            パスワード変更
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* 現在のパスワード */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="password"
                label="現在のパスワード"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (errors.currentPassword) {
                    setErrors({ ...errors, currentPassword: undefined });
                  }
                }}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword}
                autoComplete="current-password"
              />
            </Box>

            {/* 新しいパスワード */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="password"
                label="新しいパスワード"
                placeholder="8文字以上（英大文字・小文字・数字を含む）"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) {
                    setErrors({ ...errors, newPassword: undefined });
                  }
                }}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                autoComplete="new-password"
              />
            </Box>

            {/* 新しいパスワード（確認） */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="password"
                label="新しいパスワード（確認）"
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
              />
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* 通知設定 */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            通知設定
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
              />
            }
            label="新しい返信があったときにメールで通知する"
          />
        </CardContent>
      </Card>

      {/* 保存ボタン */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Link href="/profile" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="large">
            キャンセル
          </Button>
        </Link>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
          endIcon={<SaveIcon />}
        >
          変更を保存
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* アカウント削除 */}
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'error.main' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom color="error">
            アカウントの削除
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            アカウントを削除すると、すべてのデータが完全に削除されます。この操作は取り消すことができません。
          </Typography>
          <Button variant="outlined" color="error">
            アカウントを削除
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
