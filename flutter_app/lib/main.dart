import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'models/user_profile.dart';
import 'screens/splash_screen.dart';
import 'screens/home_dashboard_screen.dart';
import 'screens/learning_map_screen.dart';
import 'screens/game_loop_screen.dart';
import 'screens/code_challenge_screen.dart';
import 'screens/ai_mentor_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppState()),
      ],
      child: const CodeQuestApp(),
    ),
  );
}

class AppState extends ChangeNotifier {
  UserProfile profile = UserProfile(
    id: 'talha_1',
    name: 'Talha',
    avatar: 'assets/images/avatar.png',
    email: 'talha@codequest.dev',
    selectedLanguage: 'python',
    level: 8,
    xp: 820,
    xpToNextLevel: 1000,
    streak: 7,
  );

  void addRewards(int xp, int coins) {
    profile.addRewards(xp, coins);
    notifyListeners();
  }
}

class CodeQuestApp extends StatelessWidget {
  const CodeQuestApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CodeQuest',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkGamingTheme,
      home: const MainNavigationHost(),
    );
  }
}

class MainNavigationHost extends StatefulWidget {
  const MainNavigationHost({Key? key}) : super(key: key);

  @override
  State<MainNavigationHost> createState() => _MainNavigationHostState();
}

class _MainNavigationHostState extends State<MainNavigationHost> {
  String currentScreen = 'splash';

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);

    if (currentScreen == 'splash') {
      return SplashScreen(onStart: () => setState(() => currentScreen = 'home'));
    }

    if (currentScreen == 'map') {
      return LearningMapScreen(
        onBack: () => setState(() => currentScreen = 'home'),
        onSelectTopic: (topicId) {
          if (topicId == 'loops') {
            setState(() => currentScreen = 'game_loop');
          } else {
            setState(() => currentScreen = 'code_challenge');
          }
        },
      );
    }

    if (currentScreen == 'game_loop') {
      return GameLoopScreen(
        onBack: () => setState(() => currentScreen = 'home'),
        onWin: (xp, coins) {
          state.addRewards(xp, coins);
        },
      );
    }

    if (currentScreen == 'code_challenge') {
      return CodeChallengeScreen(
        onBack: () => setState(() => currentScreen = 'home'),
        onWin: (xp, coins) {
          state.addRewards(xp, coins);
        },
      );
    }

    if (currentScreen == 'ai_mentor') {
      return AIMentorScreen(
        onBack: () => setState(() => currentScreen = 'home'),
        onStartPractice: () => setState(() => currentScreen = 'game_loop'),
      );
    }

    // Default Home
    return Scaffold(
      body: HomeDashboardScreen(
        profile: state.profile,
        onOpenMap: () => setState(() => currentScreen = 'map'),
        onContinueLoop: () => setState(() => currentScreen = 'game_loop'),
        onOpenChallenge: () => setState(() => currentScreen = 'code_challenge'),
        onOpenSettings: () {},
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        onTap: (index) {
          if (index == 1) setState(() => currentScreen = 'map');
          if (index == 2) setState(() => currentScreen = 'game_loop');
          if (index == 3) setState(() => currentScreen = 'ai_mentor');
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.map), label: 'Map'),
          BottomNavigationBarItem(icon: Icon(Icons.videogame_asset), label: 'Games'),
          BottomNavigationBarItem(icon: Icon(Icons.chat), label: 'Mentor'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
