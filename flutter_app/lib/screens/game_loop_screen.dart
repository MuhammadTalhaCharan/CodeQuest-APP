import 'package:flutter/material.dart';
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
  List<String> program = ['Repeat', 'Move Forward', 'Collect'];
  bool isRunning = false;
  String feedback = 'Construct your loop sequence and press RUN!';

  void runLoop() async {
    if (isRunning) return;
    setState(() {
      isRunning = true;
      characterPos = 0;
      coins = [false, false, false, false, false];
    });

    bool hasRepeat = program.contains('Repeat');
    bool hasMove = program.contains('Move Forward');
    bool hasCollect = program.contains('Collect');

    if (hasRepeat && hasMove && hasCollect) {
      for (int i = 1; i <= 5; i++) {
        await Future.delayed(const Duration(milliseconds: 500));
        if (!mounted) return;
        setState(() {
          characterPos = i;
          coins[i - 1] = true;
        });
      }
      await Future.delayed(const Duration(milliseconds: 300));
      setState(() {
        feedback = '🎉 Mission Complete! All 5 coins collected!';
        isRunning = false;
      });
      widget.onWin(60, 30);
    } else {
      await Future.delayed(const Duration(milliseconds: 500));
      if (!mounted) return;
      setState(() {
        characterPos = 1;
        lives = (lives > 0) ? lives - 1 : 0;
        feedback = 'Loop missed commands! Make sure to combine Repeat, Move, and Collect.';
        isRunning = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.surfaceDark,
        leading: IconButton(icon: const Icon(LucideIcons.arrowLeft), onPressed: widget.onBack),
        title: const Text('Loops', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          Row(
            children: [
              const Icon(LucideIcons.heart, color: Colors.red, size: 20),
              const SizedBox(width: 4),
              Text('$lives', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.redAccent)),
              const SizedBox(width: 16),
            ],
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // 2D Game Platform Canvas
            Container(
              margin: const EdgeInsets.all(16),
              height: 220,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF38BDF8), Color(0xFF0284C7)],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppColors.primaryCyan, width: 2),
              ),
              child: Stack(
                children: [
                  // Mission Banner
                  Align(
                    alignment: Alignment.topCenter,
                    child: Container(
                      margin: const EdgeInsets.only(top: 10),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.black87,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.primaryCyan),
                      ),
                      child: const Text(
                        'MISSION: Collect all 5 coins!',
                        style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.primaryCyan),
                      ),
                    ),
                  ),

                  // Floating 5 Coins
                  Positioned(
                    bottom: 70,
                    left: 40,
                    right: 20,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: List.generate(5, (index) {
                        return AnimatedOpacity(
                          duration: const Duration(milliseconds: 300),
                          opacity: coins[index] ? 0.0 : 1.0,
                          child: const Icon(LucideIcons.circle, color: Colors.amber, size: 24),
                        );
                      }),
                    ),
                  ),

                  // Adventurer Character
                  AnimatedPositioned(
                    duration: const Duration(milliseconds: 400),
                    bottom: 45,
                    left: 20.0 + (characterPos * 50.0),
                    child: Container(
                      width: 36,
                      height: 44,
                      decoration: BoxDecoration(
                        color: Colors.blueAccent,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: Colors.white, width: 1.5),
                      ),
                      child: const Icon(LucideIcons.bot, color: Colors.white, size: 22),
                    ),
                  ),

                  // Ground Platform
                  Align(
                    alignment: Alignment.bottomCenter,
                    child: Container(
                      height: 45,
                      color: const Color(0xFF16A34A),
                    ),
                  ),
                ],
              ),
            ),

            // Program Sequence Box
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Loop Program Sequence:', style: TextStyle(fontSize: 11, color: AppColors.primaryCyan, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    children: program.map((p) => Chip(
                      label: Text(p, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                      backgroundColor: Colors.purple.shade900,
                    )).toList(),
                  ),
                  const SizedBox(height: 6),
                  Text(feedback, style: const TextStyle(fontSize: 11, color: Colors.white70)),
                ],
              ),
            ),
            const Spacer(),

            // RUN Button
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: SizedBox(
                width: double.infinity,
                height: 54,
                child: ElevatedButton.icon(
                  onPressed: isRunning ? null : runLoop,
                  icon: const Icon(LucideIcons.play),
                  label: Text(isRunning ? 'RUNNING LOOP...' : 'RUN', style: const TextStyle(fontWeight: FontWeight.w900)),
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.accentEmerald, foregroundColor: Colors.black),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
