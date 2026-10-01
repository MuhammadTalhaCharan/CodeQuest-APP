import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';
import '../services/audio_service.dart';

class CodeChallengeScreen extends StatefulWidget {
  final VoidCallback onBack;
  final Function(int xp, int coins) onWin;

  const CodeChallengeScreen({Key? key, required this.onBack, required this.onWin}) : super(key: key);

  @override
  State<CodeChallengeScreen> createState() => _CodeChallengeScreenState();
}

class _CodeChallengeScreenState extends State<CodeChallengeScreen> {
  String? selected;
  bool isChecked = false;
  bool isCorrect = false;

  void check() {
    if (selected == null) return;
    final correct = (selected == '5');
    setState(() {
      isChecked = true;
      isCorrect = correct;
    });
    if (correct) {
      AudioService.playCorrect();
      widget.onWin(50, 20);
    } else {
      AudioService.playWrong();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.surfaceDark,
        leading: IconButton(icon: const Icon(LucideIcons.arrowLeft), onPressed: widget.onBack),
        title: const Text('Complete the Code', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Row(
                children: [
                  Text('• ', style: TextStyle(color: AppColors.primaryCyan, fontSize: 18, fontWeight: FontWeight.bold)),
                  Expanded(
                    child: Text(
                      'Fill in the missing number to print 1 to 5 using a loop.',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.white),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Code Box
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: const Color(0xFF090B16),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.primaryPurple.withOpacity(0.4)),
                ),
                child: Text(
                  'for (int i = 0; i < ${selected ?? "___"}; i++) {\n    print(i + 1);\n}',
                  style: const TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 16,
                    color: AppColors.primaryCyan,
                    height: 1.6,
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Options
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: ['3', '5', '10'].map((opt) {
                  final isSel = selected == opt;
                  return InkWell(
                    onTap: () => setState(() {
                      selected = opt;
                      isChecked = false;
                    }),
                    borderRadius: BorderRadius.circular(16),
                    child: Container(
                      width: 80,
                      height: 56,
                      decoration: BoxDecoration(
                        color: isSel ? AppColors.primaryBlue : AppColors.surface,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: isSel ? AppColors.primaryCyan : AppColors.borderSubtle),
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        opt,
                        style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 24),

              // CHECK button
              SizedBox(
                width: double.infinity,
                height: 54,
                child: ElevatedButton(
                  onPressed: selected == null ? null : check,
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.primaryPurple),
                  child: const Text('CHECK', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),

              if (isChecked) ...[
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isCorrect ? Colors.green.withOpacity(0.2) : Colors.red.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    isCorrect ? 'Outstanding! The loop executes 5 times.' : 'Not quite. Check the loop bound.',
                    style: TextStyle(color: isCorrect ? Colors.greenAccent : Colors.redAccent),
                  ),
                ),
              ],

              const Spacer(),

              // Hint
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Row(
                  children: [
                    Icon(LucideIcons.lightbulb, color: Colors.amber),
                    SizedBox(width: 12),
                    Expanded(
                      child: Text('Hint: The loop should run 5 times (1, 2, 3, 4, 5).', style: TextStyle(fontSize: 12, color: Colors.white70)),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
