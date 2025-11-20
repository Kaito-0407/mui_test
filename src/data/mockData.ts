// 開発用モックデータ
import { Thread, Post, Category, User } from '@/types/board';

export const mockUsers: User[] = [
  { id: '1', username: '名無しさん', email: 'user1@example.com', joinedAt: new Date('2024-01-01'), postCount: 42 },
  { id: '2', username: '通りすがり', email: 'user2@example.com', joinedAt: new Date('2024-02-15'), postCount: 28 },
  { id: '3', username: '常連さん', email: 'user3@example.com', joinedAt: new Date('2023-12-01'), postCount: 156 },
  { id: '4', username: '新参者', email: 'user4@example.com', joinedAt: new Date('2024-10-01'), postCount: 5 },
];

export const mockCategories: Category[] = [
  { id: '1', name: '雑談', description: '何でも気軽に話せる場所', threadCount: 42 },
  { id: '2', name: 'テクノロジー', description: '技術的な話題や最新のトレンド', threadCount: 28 },
  { id: '3', name: 'ニュース', description: '時事ネタや話題のニュース', threadCount: 35 },
  { id: '4', name: '趣味', description: '趣味や娯楽について', threadCount: 19 },
];

export const mockThreads: Thread[] = [
  {
    id: '1',
    title: 'このサイトについて語るスレ',
    category: '雑談',
    userId: '1',
    username: '名無しさん',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-27'),
    postCount: 156,
    viewCount: 1234,
    isPinned: true,
  },
  {
    id: '2',
    title: 'Next.js 15について',
    category: 'テクノロジー',
    userId: '2',
    username: '通りすがり',
    createdAt: new Date('2024-10-25'),
    updatedAt: new Date('2024-10-27'),
    postCount: 42,
    viewCount: 567,
  },
  {
    id: '3',
    title: '2024年振り返りスレ',
    category: '雑談',
    userId: '3',
    username: '常連さん',
    createdAt: new Date('2024-10-26'),
    updatedAt: new Date('2024-10-27'),
    postCount: 89,
    viewCount: 890,
  },
  {
    id: '4',
    title: '最近のAI事情',
    category: 'テクノロジー',
    userId: '1',
    username: '名無しさん',
    createdAt: new Date('2024-10-26'),
    updatedAt: new Date('2024-10-27'),
    postCount: 67,
    viewCount: 723,
  },
  {
    id: '5',
    title: 'モノクロデザインについて',
    category: '趣味',
    userId: '4',
    username: '新参者',
    createdAt: new Date('2024-10-27'),
    updatedAt: new Date('2024-10-27'),
    postCount: 12,
    viewCount: 145,
  },
];

export const mockPosts: { [threadId: string]: Post[] } = {
  '1': [
    {
      id: '1-1',
      threadId: '1',
      userId: '1',
      username: '名無しさん',
      content: 'このサイトについて、自由に語り合いましょう。\n良い点、改善してほしい点など、何でもOKです。',
      createdAt: new Date('2024-10-20T10:00:00'),
      postNumber: 1,
    },
    {
      id: '1-2',
      threadId: '1',
      userId: '2',
      username: '通りすがり',
      content: 'モノクロのデザインがすごく洗練されてていいですね。\n高級感があって見やすいです。',
      createdAt: new Date('2024-10-20T10:15:00'),
      postNumber: 2,
    },
    {
      id: '1-3',
      threadId: '1',
      userId: '3',
      username: '常連さん',
      content: '>>2\n同意です。最近のサイトは色が多すぎて疲れることがあるので、\nこういうシンプルなデザインは目に優しいです。',
      createdAt: new Date('2024-10-20T11:30:00'),
      postNumber: 3,
    },
    {
      id: '1-4',
      threadId: '1',
      userId: '1',
      username: '名無しさん',
      content: 'ありがとうございます！\nミニマルで使いやすいサイトを目指して作りました。',
      createdAt: new Date('2024-10-20T12:00:00'),
      postNumber: 4,
    },
    {
      id: '1-5',
      threadId: '1',
      userId: '4',
      username: '新参者',
      content: '初めて来ました。\n会員制なのがいいですね。質の高い議論ができそうです。',
      createdAt: new Date('2024-10-27T09:00:00'),
      postNumber: 5,
    },
  ],
  '2': [
    {
      id: '2-1',
      threadId: '2',
      userId: '2',
      username: '通りすがり',
      content: 'Next.js 15がリリースされましたが、使ってる人いますか？\n新機能についての感想を聞きたいです。',
      createdAt: new Date('2024-10-25T14:00:00'),
      postNumber: 1,
    },
    {
      id: '2-2',
      threadId: '2',
      userId: '3',
      username: '常連さん',
      content: 'Turbopackが速くなったのが体感できますね。\n開発体験が向上してます。',
      createdAt: new Date('2024-10-25T14:30:00'),
      postNumber: 2,
    },
    {
      id: '2-3',
      threadId: '2',
      userId: '1',
      username: '名無しさん',
      content: 'React 19のサポートも入ってるのがいいですね。\nServer Actionsがより使いやすくなりました。',
      createdAt: new Date('2024-10-25T15:00:00'),
      postNumber: 3,
    },
  ],
};

// 現在のログインユーザー（開発用）
export const currentUser: User = mockUsers[0];
