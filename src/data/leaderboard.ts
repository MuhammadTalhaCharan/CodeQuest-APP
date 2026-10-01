import { LeaderboardUser } from '../types';

export const GLOBAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'user_1',
    rank: 1,
    name: 'Ahmed',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    xp: 2480,
    change: 'same',
  },
  {
    id: 'user_2',
    rank: 2,
    name: 'Sara',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    xp: 2210,
    change: 'up',
  },
  {
    id: 'current_user',
    rank: 3,
    name: 'Talha (You)',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
    xp: 1980,
    isCurrentUser: true,
    change: 'up',
  },
  {
    id: 'user_4',
    rank: 4,
    name: 'Zain',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    xp: 1760,
    change: 'down',
  },
  {
    id: 'user_5',
    rank: 5,
    name: 'Ayesha',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    xp: 1605,
    change: 'same',
  },
  {
    id: 'user_6',
    rank: 6,
    name: 'Omar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    xp: 1540,
    change: 'up',
  },
  {
    id: 'user_7',
    rank: 7,
    name: 'Layla',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    xp: 1420,
    change: 'down',
  },
];

export const FRIENDS_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'current_user',
    rank: 1,
    name: 'Talha (You)',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
    xp: 1980,
    isCurrentUser: true,
    change: 'up',
  },
  {
    id: 'user_4',
    rank: 2,
    name: 'Zain',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    xp: 1760,
    change: 'down',
  },
  {
    id: 'user_6',
    rank: 3,
    name: 'Omar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    xp: 1540,
    change: 'same',
  },
];

export const WEEKLY_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'user_2',
    rank: 1,
    name: 'Sara',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    xp: 680,
    change: 'up',
  },
  {
    id: 'current_user',
    rank: 2,
    name: 'Talha (You)',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
    xp: 620,
    isCurrentUser: true,
    change: 'up',
  },
  {
    id: 'user_1',
    rank: 3,
    name: 'Ahmed',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    xp: 590,
    change: 'down',
  },
];
