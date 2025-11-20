// 掲示板システムの型定義

export interface User {
  id: string;
  username: string;
  email: string;
  joinedAt: Date;
  postCount: number;
  role?: 'admin' | 'user';
}

export interface Post {
  id: string;
  threadId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
  postNumber: number; // スレッド内での投稿番号
}

export interface Thread {
  id: string;
  title: string;
  category: string;
  userId: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  postCount: number;
  viewCount: number;
  isPinned?: boolean;
  isLocked?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  threadCount: number;
}

export type SortOrder = 'newest' | 'oldest' | 'mostPosts' | 'mostViews';
