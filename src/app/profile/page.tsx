'use client';

import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  Button,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Email as EmailIcon,
  Article as ArticleIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { mockUsers, mockThreads, mockPosts } from '@/data/mockData';

export default function ProfilePage() {
  // 現在ログイン中のユーザーを取得（仮）
  const currentUser = mockUsers[0];

  // ユーザーの投稿を取得
  const userThreads = mockThreads.filter(
    (thread) => thread.username === currentUser.username
  );

  // ユーザーのコメント数を計算
  const userComments = Object.values(mockPosts)
    .flat()
    .filter((post) => post.username === currentUser.username);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* プロフィールヘッダー */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'black',
                fontSize: '2rem',
              }}
            >
              {currentUser.username[0].toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                  {currentUser.username}
                </Typography>
                <Link href="/settings" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" startIcon={<EditIcon />}>
                    プロフィール編集
                  </Button>
                </Link>
              </Box>
              <Chip
                label={currentUser.role === 'admin' ? '管理者' : '一般ユーザー'}
                color={currentUser.role === 'admin' ? 'default' : 'default'}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {currentUser.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    登録日: {formatDate(currentUser.joinedAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 統計情報 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <ArticleIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
              <Typography variant="h4" gutterBottom>
                {userThreads.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                作成したスレッド
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CommentIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
              <Typography variant="h4" gutterBottom>
                {userComments.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                投稿したコメント
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CalendarIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
              <Typography variant="h4" gutterBottom>
                {Math.floor(
                  (new Date().getTime() - currentUser.joinedAt.getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                参加日数
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* 作成したスレッド */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        作成したスレッド
      </Typography>

      {userThreads.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {userThreads.map((thread) => (
            <Link
              key={thread.id}
              href={`/thread/${thread.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card
                elevation={1}
                sx={{
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {thread.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Chip label={thread.category} size="small" variant="outlined" />
                        <Typography variant="body2" color="text.secondary">
                          作成日: {formatDate(thread.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      投稿数: {thread.postCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      閲覧数: {thread.viewCount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="body1" color="text.secondary">
            まだスレッドを作成していません
          </Typography>
          <Link href="/thread/new" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ mt: 2 }}>
              新規スレッドを作成
            </Button>
          </Link>
        </Paper>
      )}
    </Container>
  );
}
