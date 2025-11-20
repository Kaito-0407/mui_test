// MUIテーマ設定ファイル
'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',        // 深い黒
      light: '#424242',       // ダークグレー
      dark: '#000000',        // 純粋な黒
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#757575',        // ミディアムグレー
      light: '#a4a4a4',       // ライトグレー
      dark: '#494949',        // ダークグレー
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa',     // オフホワイト
      paper: '#ffffff',       // 純粋な白
    },
    text: {
      primary: '#000000',     // 主要テキスト：黒
      secondary: '#616161',   // セカンダリテキスト：グレー
    },
    divider: '#e0e0e0',       // 区切り線：ライトグレー
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: [
      'var(--font-playfair-display)',  // CSS変数を使用してPlayfair Displayを指定
      '"Playfair Display"',           // フォールバック
      '"Times New Roman"',
      'serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 300,        // 軽やかな太さ
      letterSpacing: '-0.02em',
      fontSize: '3.75rem',
    },
    h2: {
      fontWeight: 300,
      letterSpacing: '-0.01em',
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 400,
      letterSpacing: '0em',
      fontSize: '2.125rem',
    },
    h4: {
      fontWeight: 400,
      letterSpacing: '0.01em',
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      letterSpacing: '0.01em',
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      fontSize: '1rem',
    },
    body1: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
      ].join(','),
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
  },
  shape: {
    borderRadius: 0,          // シャープなエッジで高級感
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.05)',
    '0px 2px 6px rgba(0, 0, 0, 0.08)',
    '0px 3px 9px rgba(0, 0, 0, 0.1)',
    '0px 4px 12px rgba(0, 0, 0, 0.12)',
    '0px 5px 15px rgba(0, 0, 0, 0.14)',
    '0px 6px 18px rgba(0, 0, 0, 0.16)',
    '0px 7px 21px rgba(0, 0, 0, 0.18)',
    '0px 8px 24px rgba(0, 0, 0, 0.2)',
    '0px 9px 27px rgba(0, 0, 0, 0.22)',
    '0px 10px 30px rgba(0, 0, 0, 0.24)',
    '0px 11px 33px rgba(0, 0, 0, 0.26)',
    '0px 12px 36px rgba(0, 0, 0, 0.28)',
    '0px 13px 39px rgba(0, 0, 0, 0.3)',
    '0px 14px 42px rgba(0, 0, 0, 0.32)',
    '0px 15px 45px rgba(0, 0, 0, 0.34)',
    '0px 16px 48px rgba(0, 0, 0, 0.36)',
    '0px 17px 51px rgba(0, 0, 0, 0.38)',
    '0px 18px 54px rgba(0, 0, 0, 0.4)',
    '0px 19px 57px rgba(0, 0, 0, 0.42)',
    '0px 20px 60px rgba(0, 0, 0, 0.44)',
    '0px 21px 63px rgba(0, 0, 0, 0.46)',
    '0px 22px 66px rgba(0, 0, 0, 0.48)',
    '0px 23px 69px rgba(0, 0, 0, 0.5)',
    '0px 24px 72px rgba(0, 0, 0, 0.52)',
  ],
  components: {
    // Button コンポーネントの高級感のあるスタイリング
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '48px',
          padding: '12px 32px',
          border: '1px solid transparent',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#212121',
          },
        },
        outlined: {
          borderColor: '#000000',
          color: '#000000',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#000000',
            color: '#ffffff',
          },
        },
        text: {
          color: '#000000',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    
    // Card コンポーネントの洗練されたスタイリング
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #f0f0f0',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    // Typography の高級感
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 300,
          letterSpacing: '-0.02em',
        },
        h2: {
          fontWeight: 300,
          letterSpacing: '-0.01em',
        },
        h3: {
          fontWeight: 400,
        },
        h4: {
          fontWeight: 500,
        },
        h5: {
          fontWeight: 600,
        },
        h6: {
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      },
    },

    // IconButton の洗練されたスタイリング
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            transform: 'scale(1.05)',
          },
        },
      },
    },

    // Fab の高級感のあるスタイリング
    MuiFab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    // Container の最適化
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          '@media (min-width: 600px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
          },
        },
      },
    },

    // ButtonBase の共通設定
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    // TouchRipple を完全に無効化
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          display: 'none',
        },
      },
    },
  },
});

export default theme;