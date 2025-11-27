'use client';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  Add as AddIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  username?: string;
}

export default function Header({ username = 'ゲスト' }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* ロゴ */}
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography 
            variant="h6" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'black',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              }
            }}
          >
            BOARD
          </Typography>
        </Link>

        {/* 右側のメニュー */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link href="/thread/new" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              sx={{ 
                minWidth: '120px',
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              新規スレッド
            </Button>
          </Link>

          {/* モバイル用 */}
          <Link href="/thread/new" style={{ textDecoration: 'none' }}>
            <IconButton 
              sx={{ 
                display: { xs: 'flex', sm: 'none' },
                border: '1px solid',
                borderColor: 'black',
              }}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Link>

          {/* ユーザーメニュー */}
          <Box>
            <IconButton
              onClick={handleMenuOpen}
              size="small"
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'black',
                  fontSize: '0.875rem',
                }}
              >
                {username[0].toUpperCase()}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 2,
                sx: {
                  mt: 1,
                  minWidth: 200,
                  borderRadius: 0,
                  border: '1px solid',
                  borderColor: 'divider',
                }
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  ログイン中
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {username}
                </Typography>
              </Box>
              <Divider />
              <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem onClick={handleMenuClose}>
                  <AccountCircleIcon sx={{ mr: 1.5, fontSize: 20 }} />
                  プロフィール
                </MenuItem>
              </Link>
              <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem onClick={handleMenuClose}>
                  <SettingsIcon sx={{ mr: 1.5, fontSize: 20 }} />
                  設定
                </MenuItem>
              </Link>
              <Divider />
              <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem onClick={handleMenuClose}>
                  <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                  ログアウト
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
