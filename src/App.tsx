import React, { useState, useEffect } from 'react';
import { ScreenId, UserProfile, CurriculumTopic, Achievement, DailyChallenge, LearningLevel, ProgrammingLanguage } from './types';
import { storage } from './services/storage';
import { sound } from './services/sound';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { BottomNav } from './components/common/BottomNav';
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { LanguageSelectionScreen } from './components/screens/LanguageSelectionScreen';
import { LevelSelectionScreen } from './components/screens/LevelSelectionScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { LearningMapScreen } from './components/screens/LearningMapScreen';
import { GameLoopScreen } from './components/screens/GameLoopScreen';
import { CodeChallengeScreen } from './components/screens/CodeChallengeScreen';
import { AIMentorScreen } from './components/screens/AIMentorScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { AchievementsScreen } from './components/screens/AchievementsScreen';
import { LeaderboardScreen } from './components/screens/LeaderboardScreen';
import { DailyChallengeScreen } from './components/screens/DailyChallengeScreen';
import { LessonExplanationScreen } from './components/screens/LessonExplanationScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { CertificatesScreen } from './components/screens/CertificatesScreen';
import { GameLibraryScreen } from './components/screens/GameLibraryScreen';
import { DecisionMazeGameScreen } from './components/screens/DecisionMazeGameScreen';
import { SyntaxPuzzleScreen } from './components/screens/SyntaxPuzzleScreen';
import { LoopPatternsGameScreen } from './components/screens/LoopPatternsGameScreen';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { SettingsModal } from './components/modals/SettingsModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [profile, setProfile] = useState<UserProfile>(() => storage.getProfile());
  const [topics, setTopics] = useState<CurriculumTopic[]>(() => storage.getTopics());
  const [achievements, setAchievements] = useState<Achievement[]>(() => storage.getAchievements());
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge>(() => storage.getDailyChallenge());

  // Default active topic is "Loops" as shown in Screenshot 4 & 5
  const [activeTopic, setActiveTopic] = useState<CurriculumTopic>(() => {
    const found = topics.find((t) => t.id === 'loops');
    return found || topics[0];
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Sync state to storage
  useEffect(() => {
    storage.saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    storage.saveTopics(topics);
  }, [topics]);

  // Handlers for game rewards and progress
  const handleReward = (xpAmount: number, coinAmount: number) => {
    const { newProfile, leveledUp } = storage.awardRewards(xpAmount, coinAmount);
    setProfile(newProfile);

    // Update active topic progress
    if (activeTopic) {
      const updatedTopics = topics.map((t) => {
        if (t.id === activeTopic.id) {
          const newProgress = Math.min(100, t.progress + 20);
          return {
            ...t,
            progress: newProgress,
            status: (newProgress === 100 ? 'completed' : 'in_progress') as any,
          };
        }
        return t;
      });
      setTopics(updatedTopics);
    }

    if (leveledUp) {
      sound.playFanfare();
    }
  };

  const handleClaimStreakBonus = () => {
    handleReward(100, 50);
    alert('🎉 Daily 7-Day Streak Gift claimed! +100 XP and +50 Coins added.');
  };

  const handleToggleSound = () => {
    const updated = !profile.soundEnabled;
    sound.enabled = updated;
    setProfile((prev) => ({ ...prev, soundEnabled: updated }));
  };

  const handleResetProgress = () => {
    storage.resetAll();
    setProfile(storage.getProfile());
    setTopics(storage.getTopics());
    setAchievements(storage.getAchievements());
    setDailyChallenge(storage.getDailyChallenge());
    setCurrentScreen('splash');
  };

  // Check if bottom nav should be visible (on main tabbed screens)
  const isTabbedScreen = ['home', 'map', 'games_library', 'progress', 'profile'].includes(
    currentScreen
  );

  return (
    <DeviceFrame currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      <div className="relative w-full h-full flex flex-col flex-1">
        {/* Screen 1: Splash Screen */}
        {currentScreen === 'splash' && (
          <SplashScreen onStart={() => setCurrentScreen('onboarding')} />
        )}

        {/* Screen 2: Onboarding */}
        {currentScreen === 'onboarding' && (
          <OnboardingScreen onContinue={() => setCurrentScreen('language_selection')} />
        )}

        {/* Screen 3: Language Selection */}
        {currentScreen === 'language_selection' && (
          <LanguageSelectionScreen
            currentLanguage={profile.selectedLanguage}
            onSelect={(lang: ProgrammingLanguage) =>
              setProfile((prev) => ({ ...prev, selectedLanguage: lang }))
            }
            onContinue={() => setCurrentScreen('level_selection')}
          />
        )}

        {/* Screen 3b: Level Selection */}
        {currentScreen === 'level_selection' && (
          <LevelSelectionScreen
            onSelectLevel={(_lvl: LearningLevel) => {}}
            onFinish={() => setCurrentScreen('home')}
          />
        )}

        {/* Screen 4: Home Dashboard */}
        {currentScreen === 'home' && (
          <HomeScreen
            profile={profile}
            activeTopic={activeTopic}
            onNavigate={setCurrentScreen}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onClaimDailyStreakReward={handleClaimStreakBonus}
          />
        )}

        {/* Screen 5: Learning Map */}
        {currentScreen === 'map' && (
          <LearningMapScreen
            topics={topics}
            onBack={() => setCurrentScreen('home')}
            onSelectTopic={(t) => setActiveTopic(t)}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 6: 2D Loops Game */}
        {currentScreen === 'game_loop' && (
          <GameLoopScreen
            onBack={() => setCurrentScreen('home')}
            onSuccess={(xp, coins) => handleReward(xp, coins)}
          />
        )}

        {/* Screen 7: Code Challenge (Fill in the blanks) */}
        {currentScreen === 'code_challenge' && (
          <CodeChallengeScreen
            onBack={() => setCurrentScreen('home')}
            onSuccess={(xp, coins) => handleReward(xp, coins)}
          />
        )}

        {/* Screen 8: AI Mentor */}
        {currentScreen === 'ai_mentor' && (
          <AIMentorScreen
            profile={profile}
            onBack={() => setCurrentScreen('home')}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 9: Progress & Analytics */}
        {currentScreen === 'progress' && (
          <ProgressScreen
            topics={topics}
            profile={profile}
            onNavigate={setCurrentScreen}
            onSelectTopic={(t) => setActiveTopic(t)}
          />
        )}

        {/* Screen 10: Achievements & Badges */}
        {currentScreen === 'achievements' && (
          <AchievementsScreen
            achievements={achievements}
            onBack={() => setCurrentScreen('profile')}
          />
        )}

        {/* Screen 11: Leaderboard */}
        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen onBack={() => setCurrentScreen('home')} />
        )}

        {/* Screen 12: Daily Challenge */}
        {currentScreen === 'daily_challenge' && (
          <DailyChallengeScreen
            challenge={dailyChallenge}
            onBack={() => setCurrentScreen('home')}
            onComplete={(xp, coins) => handleReward(xp, coins)}
          />
        )}

        {/* Screen 13: Lesson Explanation */}
        {currentScreen === 'lesson_explanation' && (
          <LessonExplanationScreen
            topic={activeTopic}
            onBack={() => setCurrentScreen('map')}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 14: User Profile */}
        {currentScreen === 'profile' && (
          <ProfileScreen
            profile={profile}
            onNavigate={setCurrentScreen}
            onEditProfile={() => setIsEditProfileOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onLogout={() => setCurrentScreen('splash')}
          />
        )}

        {/* Screen 15: Certificates */}
        {currentScreen === 'certificates' && (
          <CertificatesScreen onBack={() => setCurrentScreen('profile')} />
        )}

        {/* Tab 3: Games Library */}
        {currentScreen === 'games_library' && (
          <GameLibraryScreen onNavigate={setCurrentScreen} />
        )}

        {/* Decision Maze (5 Rounds) */}
        {currentScreen === 'decision_maze' && (
          <DecisionMazeGameScreen
            onBack={() => setCurrentScreen('games_library')}
            onSuccess={(xp, coins) => handleReward(xp, coins)}
          />
        )}

        {/* Syntax Block Puzzle (5 Rounds) */}
        {currentScreen === 'syntax_puzzle' && (
          <SyntaxPuzzleScreen
            onBack={() => setCurrentScreen('games_library')}
            onSuccess={(xp, coins) => handleReward(xp, coins)}
          />
        )}

        {/* Loop Patterns Matrix Builder */}
        {currentScreen === 'loop_patterns' && (
          <LoopPatternsGameScreen
            onBack={() => setCurrentScreen('games_library')}
            onSuccess={(xp, coins) => handleReward(xp, coins)}
          />
        )}

        {/* Persistent Bottom Navigation for Tabbed Views */}
        {isTabbedScreen && (
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        )}

        {/* Modals */}
        <EditProfileModal
          profile={profile}
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
        />

        <SettingsModal
          profile={profile}
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onToggleSound={handleToggleSound}
          onResetProgress={handleResetProgress}
        />
      </div>
    </DeviceFrame>
  );
}
