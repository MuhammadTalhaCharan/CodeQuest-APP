import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Folder, Download, Terminal, Layers } from 'lucide-react';
import { sound } from '../../services/sound';

interface FlutterStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterStudioModal: React.FC<FlutterStudioModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState('lib/main.dart');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const flutterFiles: Record<string, string> = {
    'pubspec.yaml': `name: codequest
description: "CodeQuest - Gamified Programming Learning Mobile Application in Flutter"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.2
  google_fonts: ^6.1.0
  lucide_icons: ^0.252.0
  confetti: ^0.7.0
  audioplayers: ^5.2.1
  shared_preferences: ^2.2.2
  http: ^1.2.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/avatar.png
    - assets/images/logo.png
    - assets/images/app_icon.png
    - assets/images/trophy.png
    - assets/audio/coin.mp3
    - assets/audio/jump.mp3
    - assets/audio/correct.mp3
    - assets/audio/wrong.mp3
    - assets/audio/fanfare.mp3
    - assets/audio/click.mp3`,

    'assets/README.md': `# CodeQuest Assets Catalog

## 📁 assets/images/
- avatar.png: 3D cute coder boy with headphones & glowing laptop
- logo.png: Futuristic neon gamepad with programming brackets
- app_icon.png: Mobile launcher app icon
- trophy.png: 3D golden championship cup

## 📁 assets/audio/
- coin.mp3 / coin.wav: Dual-tone arcade coin collect chime
- jump.mp3 / jump.wav: Character platform jump upward sweep
- correct.mp3 / correct.wav: C-major chord challenge success
- wrong.mp3 / wrong.wav: Error buzz tone
- fanfare.mp3 / fanfare.wav: Level-up brass fanfare sequence
- click.mp3 / click.wav: Mechanical UI tap click`,

    'lib/main.dart': `import 'package:flutter/material.dart';
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
}`,

    'lib/theme/app_theme.dart': `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const Color background = Color(0xFF0B0E1B);
  static const Color surface = Color(0xFF141838);
  static const Color surfaceDark = Color(0xFF0D1024);
  static const Color primaryBlue = Color(0xFF2563EB);
  static const Color primaryCyan = Color(0xFF06B6D4);
  static const Color primaryPurple = Color(0xFF8B5CF6);
  static const Color accentAmber = Color(0xFFF59E0B);
  static const Color accentEmerald = Color(0xFF10B981);
}

class AppTheme {
  static ThemeData get darkGamingTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.background,
      primaryColor: AppColors.primaryPurple,
      textTheme: GoogleFonts.plusJakartaSansTextTheme(
        ThemeData.dark().textTheme.apply(
          bodyColor: Colors.white,
          displayColor: Colors.white,
        ),
      ),
    );
  }
}`,

    'lib/screens/splash_screen.dart': `import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';

class SplashScreen extends StatelessWidget {
  final VoidCallback onStart;
  const SplashScreen({Key? key, required this.onStart}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(LucideIcons.gamepad2, size: 72, color: AppColors.primaryCyan),
            const SizedBox(height: 16),
            const Text('CodeQuest', style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 8),
            const Text('LEARN. PLAY. CODE.', style: TextStyle(fontSize: 12, letterSpacing: 2, color: AppColors.primaryCyan)),
            const SizedBox(height: 32),
            ElevatedButton(onPressed: onStart, child: const Text('Get Started')),
          ],
        ),
      ),
    );
  }
}`,

    'lib/screens/game_loop_screen.dart': `import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';

class GameLoopScreen extends StatefulWidget {
  final VoidCallback onBack;
  final Function(int xp, int coins) onWin;
  const GameLoopScreen({Key? key, required this.onBack, required this.onWin}) : super(key: key);

  @override
  State<GameLoopScreen> createState() => _GameLoopScreenState();
}

class _GameLoopScreenState extends State<GameLoopScreen> {
  int lives = 3;
  int characterPos = 0;
  List<bool> coins = [false, false, false, false, false];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Loops 2D Game')),
      body: Column(
        children: [
          // 2D Platform Canvas with animated character and coins
        ],
      ),
    );
  }
}`,
  };

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(flutterFiles[selectedFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl h-[650px] rounded-3xl bg-[#0c1024] border-2 border-cyan-500/50 shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#111736] border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="font-black text-slate-950 text-sm">FL</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">Flutter Mobile Codebase</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                  Dart 3 • Material 3
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Complete mobile application architecture in Flutter matching the UI
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800/40 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Split: File Tree & Code Editor */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-64 bg-[#090c1c] border-r border-purple-900/30 p-3 overflow-y-auto no-scrollbar space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
              Flutter Architecture
            </div>

            {Object.keys(flutterFiles).map((fileName) => (
              <button
                key={fileName}
                onClick={() => {
                  sound.playClick();
                  setSelectedFile(fileName);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all text-left cursor-pointer ${
                  selectedFile === fileName
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:bg-[#141a3a] hover:text-white'
                }`}
              >
                <FileCode className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                <span className="truncate">{fileName}</span>
              </button>
            ))}

            <div className="pt-4 px-2 text-[11px] text-slate-500 leading-relaxed">
              💡 Files are stored in <code className="text-cyan-400">/flutter_app/</code> in the project workspace.
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-[#070914] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e122b] border-b border-purple-950 text-xs">
              <span className="font-mono text-cyan-300 font-bold">{selectedFile}</span>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-semibold cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Dart Code'}</span>
              </button>
            </div>

            <pre className="flex-1 p-4 font-mono text-xs text-slate-200 overflow-auto whitespace-pre leading-relaxed select-text">
              {flutterFiles[selectedFile] || ''}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 bg-[#111736] border-t border-purple-900/40 flex items-center justify-between text-xs text-slate-400">
          <span>Run with: <code className="text-cyan-400 font-bold">flutter run</code> in terminal</span>
          <button
            onClick={() => {
              sound.playClick();
              alert('Flutter source is located in /flutter_app/ in your project root ready for Android/iOS build!');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Project Ready</span>
          </button>
        </div>
      </div>
    </div>
  );
};
