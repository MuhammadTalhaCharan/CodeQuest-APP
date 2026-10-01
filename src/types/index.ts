export type ProgrammingLanguage =
  | 'python'
  | 'java'
  | 'cpp'
  | 'dart'
  | 'javascript'
  | 'typescript'
  | 'rust'
  | 'golang'
  | 'kotlin'
  | 'swift'
  | 'php'
  | 'sql';

export type LearningLevel = 'beginner' | 'intermediate' | 'advanced';

export type ScreenId =
  | 'splash'
  | 'onboarding'
  | 'language_selection'
  | 'level_selection'
  | 'home'
  | 'map'
  | 'game_loop'
  | 'code_challenge'
  | 'ai_mentor'
  | 'progress'
  | 'achievements'
  | 'leaderboard'
  | 'daily_challenge'
  | 'lesson_explanation'
  | 'profile'
  | 'certificates'
  | 'games_library'
  | 'decision_maze'
  | 'syntax_puzzle'
  | 'loop_patterns';

export interface ChallengeItem {
  id: string;
  topic: string;
  language: string;
  instruction: string;
  codeSnippet: string;
  blankPlaceholder: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
  roundNumber?: number;
}


export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  selectedLanguage: ProgrammingLanguage;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  lastActiveDate: string;
  projectsCount: number;
  certificatesCount: number;
  badgesCount: number;
  soundEnabled: boolean;
  lives: number;
  maxLives: number;
}

export type TopicStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';

export interface CurriculumTopic {
  id: string;
  title: string;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number; // 0 - 100
  status: TopicStatus;
  estimatedTime: string;
  xpReward: number;
  coinReward: number;
  summary: string;
  learningPoints: string[];
  explanation: {
    title: string;
    text: string;
    codeSnippet: string;
    bulletPoints: string[];
  };
  example: {
    title: string;
    code: string;
    output: string;
    explanation: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  fillBlankChallenge: {
    instruction: string;
    codeWithBlank: string;
    options: string[];
    correctAnswer: string;
    hint: string;
    explanation: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'completed' | 'in_progress' | 'locked';
  progress: number; // 0 - 100
  xpReward: number;
  dateUnlocked?: string;
  tier: 'gold' | 'silver' | 'bronze' | 'locked';
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
  change?: 'up' | 'down' | 'same';
}

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  issuerLogo: string;
  course: string;
  recipientName: string;
  completionDate: string;
  credentialId: string;
  status: 'Completed';
  skills: string[];
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  hintCard?: {
    title: string;
    content: string;
    actionLabel?: string;
  };
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  language: string;
  xpReward: number;
  coinReward: number;
  isCompleted: boolean;
  codeTask: string;
  starterCode: string;
  testCases: { input: string; expected: string }[];
}
