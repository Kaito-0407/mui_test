"use client";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  TextField,
  Button,
  Divider,
  Avatar,
  Paper,
} from "@mui/material";
import {
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  PushPin as PushPinIcon,
} from "@mui/icons-material";
import { mockThreads, mockPosts } from "@/data/mockData";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ThreadDetailPage() {
  const params = useParams();
  const threadId = params.id as string;
  const thread = mockThreads.find((t) => t.id === threadId);
  const posts = mockPosts[threadId] || [];
  const [newPost, setNewPost] = useState("");

  if (!thread) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">スレッドが見つかりません</Typography>
        <Link href="/">
          <Button startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
            ホームに戻る
          </Button>
        </Link>
      </Container>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 投稿処理を実装
    console.log("New post:", newPost);
    setNewPost("");
  };

  // アンカーリンク（>>数字）を検出して置換
  const renderPostContent = (content: string) => {
    const parts = content.split(/(>>\\d+)/g);
    return parts.map((part, index) => {
      if (part.match(/>>\\d+/)) {
        return (
          <Box
            key={index}
            component="span"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {part}
          </Box>
        );
      }
      return part;
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 戻るボタン */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3 }} variant="text">
          スレッド一覧に戻る
        </Button>
      </Link>

      {/* スレッド情報 */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}
          >
            {thread.isPinned && <PushPinIcon color="action" />}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {thread.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Chip label={thread.category} variant="outlined" />
                <Typography variant="body2" color="text.secondary">
                  作成者: {thread.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  作成日: {formatDate(thread.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography variant="body2" color="text.secondary">
              投稿数: {thread.postCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              閲覧数: {thread.viewCount}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* 投稿一覧 */}
      <Box sx={{ mb: 4 }}>
        {posts.map((post) => (
          <Paper
            key={post.id}
            elevation={0}
            sx={{
              mb: 2,
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 0,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "grey.50",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* 投稿番号とアバター */}
              <Box sx={{ minWidth: "60px", textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {post.postNumber}
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "black",
                    width: 40,
                    height: 40,
                    fontSize: "0.875rem",
                    mx: "auto",
                  }}
                >
                  {post.username[0]}
                </Avatar>
              </Box>

              {/* 投稿内容 */}
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="body1" fontWeight={600}>
                    {post.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(post.createdAt)}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.8,
                  }}
                >
                  {renderPostContent(post.content)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* 投稿フォーム */}
      {!thread.isLocked && (
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              返信する
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="投稿内容を入力してください..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  ※誹謗中傷や不適切な投稿は禁止されています
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  disabled={!newPost.trim()}
                >
                  投稿
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}

      {thread.isLocked && (
        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "grey.50" }}>
          <Typography variant="h6" color="text.secondary">
            このスレッドはロックされています
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            新しい投稿はできません
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
