import { UserProfile, CurriculumTopic, Achievement, DailyChallenge } from '../types';
import { INITIAL_TOPICS } from '../data/curriculum';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { sound } from './sound';

const STORAGE_KEYS = {
  PROFILE: 'codequest_profile_v1',
  TOPICS: 'codequest_topics_v1',
  ACHIEVEMENTS: 'codequest_achievements_v1',
  DAILY: 'codequest_daily_v1',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'talha_user',
  name: 'Talha',
  avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
  email: 'talha@codequest.dev',
  selectedLanguage: 'python',
  level: 8,
  xp: 820,
  xpToNextLevel: 1000,
  coins: 340,
  streak: 7,
  lastActiveDate: new Date().toISOString(),
  projectsCount: 4,
  certificatesCount: 2,
  badgesCount: 12,
  soundEnabled: true,
  lives: 3,
  maxLives: 3,
};

const DEFAULT_DAILY: DailyChallenge = {
  id: 'daily_calc_1',
  title: 'Build a Simple Calculator',
  description: 'Create a calculator using Python (add, subtract, multiply, divide).',
  language: 'Python',
  xpReward: 100,
  coinReward: 50,
  isCompleted: false,
  codeTask: 'Implement basic arithmetic operations in Python.',
  starterCode: `def calculate(a, b, op):\n    if op == '+':\n        return a + b\n    elif op == '-':\n        return a - b\n    elif op == '*':\n        return a * b\n    elif op == '/':\n        return a / b if b != 0 else "Error"\n    return "Invalid"`,
  testCases: [
    { input: 'calculate(10, 5, "+")', expected: '15' },
    { input: 'calculate(20, 4, "/")', expected: '5.0' },
  ],
};

class StorageService {
  getProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) {
        const parsed = JSON.parse(stored);
        sound.enabled = parsed.soundEnabled ?? true;
        return { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  }

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      sound.enabled = profile.soundEnabled;
    } catch {}
  }

  getTopics(): CurriculumTopic[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TOPICS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return INITIAL_TOPICS;
  }

  saveTopics(topics: CurriculumTopic[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
    } catch {}
  }

  getAchievements(): Achievement[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return INITIAL_ACHIEVEMENTS;
  }

  saveAchievements(achievements: Achievement[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch {}
  }

  getDailyChallenge(): DailyChallenge {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DAILY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return DEFAULT_DAILY;
  }

  saveDailyChallenge(daily: DailyChallenge): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DAILY, JSON.stringify(daily));
    } catch {}
  }

  awardRewards(xpAmount: number, coinAmount: number): { newProfile: UserProfile; leveledUp: boolean } {
    const profile = this.getProfile();
    let newXp = profile.xp + xpAmount;
    let newLevel = profile.level;
    let newXpToNext = profile.xpToNextLevel;
    let leveledUp = false;

    while (newXp >= newXpToNext) {
      newXp -= newXpToNext;
      newLevel += 1;
      newXpToNext = Math.round(newXpToNext * 1.25);
      leveledUp = true;
    }

    const updatedProfile: UserProfile = {
      ...profile,
      xp: newXp,
      level: newLevel,
      xpToNextLevel: newXpToNext,
      coins: profile.coins + coinAmount,
    };

    this.saveProfile(updatedProfile);
    return { newProfile: updatedProfile, leveledUp };
  }

  resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.TOPICS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.DAILY);
  }
}

export const storage = new StorageService();
