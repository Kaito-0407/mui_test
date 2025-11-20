'use client';

import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  Search as SearchIcon,
  PushPin as PushPinIcon,
  Visibility as VisibilityIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import { mockThreads, mockCategories } from '@/data/mockData';
import { useState } from 'react';
import Link from 'next/link';
import type { SortOrder } from '@/types/board';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    if (days < 7) return `${days}日前`;
    return date.toLocaleDateString('ja-JP');
  };

  const filteredThreads = mockThreads
    .filter(thread => {
      const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || thread.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case 'oldest':
          return a.updatedAt.getTime() - b.updatedAt.getTime();
        case 'mostPosts':
          return b.postCount - a.postCount;
        case 'mostViews':
          return b.viewCount - a.viewCount;
        default:
          return 0;
      }
    });

  const pinnedThreads = filteredThreads.filter(t => t.isPinned);
  const normalThreads = filteredThreads.filter(t => !t.isPinned);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ヘッダーセクション */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 1 }}>
          THREADS
        </Typography>
        <Typography variant="body1" color="text.secondary">
          会員限定の掲示板。質の高い議論をお楽しみください。
        </Typography>
      </Box>

      {/* カテゴリー一覧 */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="すべて"
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            sx={{ 
              backgroundColor: selectedCategory === 'all' ? 'black' : 'transparent',
              color: selectedCategory === 'all' ? 'white' : 'black',
              borderColor: 'black',
              '&:hover': {
                backgroundColor: selectedCategory === 'all' ? 'black' : 'rgba(0,0,0,0.04)',
              }
            }}
          />
          {mockCategories.map(category => (
            <Chip
              key={category.id}
              label={`${category.name} (${category.threadCount})`}
              onClick={() => setSelectedCategory(category.name)}
              variant={selectedCategory === category.name ? 'filled' : 'outlined'}
              sx={{ 
                backgroundColor: selectedCategory === category.name ? 'black' : 'transparent',
                color: selectedCategory === category.name ? 'white' : 'black',
                borderColor: 'black',
                '&:hover': {
                  backgroundColor: selectedCategory === category.name ? 'black' : 'rgba(0,0,0,0.04)',
                }
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* 検索とソート */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="スレッドを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, minWidth: '200px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>並び替え</InputLabel>
          <Select
            value={sortOrder}
            label="並び替え"
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <MenuItem value="newest">新着順</MenuItem>
            <MenuItem value="oldest">古い順</MenuItem>
            <MenuItem value="mostPosts">投稿数順</MenuItem>
            <MenuItem value="mostViews">閲覧数順</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* ピン留めスレッド */}
      {pinnedThreads.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PushPinIcon fontSize="small" />
            ピン留め
          </Typography>
          <Stack spacing={2}>
            {pinnedThreads.map(thread => (
              <Link 
                key={thread.id} 
                href={`/thread/${thread.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card 
                  elevation={1}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    backgroundColor: 'grey.50',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {thread.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Chip label={thread.category} size="small" variant="outlined" />
                          <Typography variant="body2" color="text.secondary">
                            {thread.username} · {formatDate(thread.updatedAt)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ChatIcon fontSize="small" color="action" />
                          <Typography variant="body2">{thread.postCount}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <VisibilityIcon fontSize="small" color="action" />
                          <Typography variant="body2">{thread.viewCount}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Stack>
        </Box>
      )}

      {/* 通常のスレッド */}
      <Stack spacing={2}>
        {normalThreads.map(thread => (
          <Link 
            key={thread.id} 
            href={`/thread/${thread.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Card 
              elevation={1}
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {thread.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                      <Chip label={thread.category} size="small" variant="outlined" />
                      <Typography variant="body2" color="text.secondary">
                        {thread.username} · {formatDate(thread.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ChatIcon fontSize="small" color="action" />
                      <Typography variant="body2">{thread.postCount}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <VisibilityIcon fontSize="small" color="action" />
                      <Typography variant="body2">{thread.viewCount}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Stack>

      {filteredThreads.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            スレッドが見つかりませんでした
          </Typography>
        </Box>
      )}
    </Container>
  );
}
