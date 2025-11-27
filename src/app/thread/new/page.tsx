"use client";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockCategories } from "@/data/mockData";

export default function NewThreadPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    category?: string;
    content?: string;
  }>({});

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    if (errors.category) {
      setErrors({ ...errors, category: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "タイトルを入力してください";
    } else if (title.length < 5) {
      newErrors.title = "タイトルは5文字以上で入力してください";
    } else if (title.length > 100) {
      newErrors.title = "タイトルは100文字以内で入力してください";
    }

    if (!category) {
      newErrors.category = "カテゴリーを選択してください";
    }

    if (!content.trim()) {
      newErrors.content = "本文を入力してください";
    } else if (content.length < 10) {
      newErrors.content = "本文は10文字以上で入力してください";
    } else if (content.length > 5000) {
      newErrors.content = "本文は5000文字以内で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: 実際の投稿処理を実装
    console.log("New thread:", { title, category, content });

    // 仮のスレッドIDでリダイレクト
    router.push("/thread/6");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* 戻るボタン */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3 }} variant="text">
          スレッド一覧に戻る
        </Button>
      </Link>

      {/* ページタイトル */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        新しいスレッドを作成
      </Typography>

      {/* フォーム */}
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {/* タイトル入力 */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="スレッドタイトル"
                placeholder="スレッドのタイトルを入力してください"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors({ ...errors, title: undefined });
                  }
                }}
                error={!!errors.title}
                helperText={errors.title || `${title.length}/100文字`}
                required
              />
            </Box>

            {/* カテゴリー選択 */}
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth error={!!errors.category} required>
                <InputLabel>カテゴリー</InputLabel>
                <Select
                  value={category}
                  label="カテゴリー"
                  onChange={handleCategoryChange}
                >
                  {mockCategories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 2 }}
                  >
                    {errors.category}
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* 本文入力 */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={10}
                label="スレッドの本文"
                placeholder="スレッドの最初の投稿内容を入力してください"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) {
                    setErrors({ ...errors, content: undefined });
                  }
                }}
                error={!!errors.content}
                helperText={errors.content || `${content.length}/5000文字`}
                required
              />
            </Box>

            {/* 注意事項 */}
            <Box
              sx={{
                p: 2,
                mb: 3,
                bgcolor: "grey.50",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                投稿時の注意事項:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="ul"
                sx={{ m: 0, pl: 2 }}
              >
                <li>誹謗中傷や不適切な投稿は禁止されています</li>
                <li>他のユーザーを尊重した投稿を心がけてください</li>
                <li>スレッドのタイトルは後から変更できません</li>
              </Typography>
            </Box>

            {/* アクションボタン */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large">
                  キャンセル
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                disabled={!title.trim() || !category || !content.trim()}
              >
                スレッドを作成
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
