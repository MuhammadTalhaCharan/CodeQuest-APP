import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';

class AIMentorScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onStartPractice;

  const AIMentorScreen({Key? key, required this.onBack, required this.onStartPractice}) : super(key: key);

  @override
  State<AIMentorScreen> createState() => _AIMentorScreenState();
}

class _AIMentorScreenState extends State<AIMentorScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, String>> messages = [
    {
      'role': 'mentor',
      'text': "You're getting better! 👏\n\nI noticed you're struggling with loop conditions.\n\nLet's try a simpler challenge with a hint.",
    },
  ];

  void sendMessage() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;

    setState(() {
      messages.add({'role': 'user', 'text': text});
      messages.add({
        'role': 'mentor',
        'text': 'A loop helps repeat identical logic automatically! Think of how many items need to be processed.',
      });
      _controller.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.surfaceDark,
        leading: IconButton(icon: const Icon(LucideIcons.arrowLeft), onPressed: widget.onBack),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: const BoxDecoration(color: AppColors.primaryCyan, shape: BoxShape.circle),
              child: const Icon(LucideIcons.bot, size: 20, color: Colors.black),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('AI Mentor', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                Text('Online', style: TextStyle(fontSize: 11, color: Colors.greenAccent)),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final msg = messages[index];
                final isMentor = msg['role'] == 'mentor';

                return Align(
                  alignment: isMentor ? Alignment.centerLeft : Alignment.centerRight,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(16),
                    constraints: const BoxConstraints(maxWidth: 300),
                    decoration: BoxDecoration(
                      color: isMentor ? AppColors.surface : AppColors.primaryBlue,
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: isMentor ? AppColors.borderSubtle : Colors.transparent),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(msg['text']!, style: const TextStyle(fontSize: 13, height: 1.5)),
                        if (isMentor && index == 0) ...[
                          const SizedBox(height: 12),
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: Colors.black45,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Icon(LucideIcons.lightbulb, color: Colors.amber, size: 16),
                                    SizedBox(width: 6),
                                    Text('Hint', style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 11)),
                                  ],
                                ),
                                SizedBox(height: 4),
                                Text(
                                  'A loop helps you repeat the same code multiple times without writing it again and again.',
                                  style: TextStyle(fontSize: 11, color: Colors.white70),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 10),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: widget.onStartPractice,
                              style: ElevatedButton.styleFrom(backgroundColor: AppColors.primaryBlue),
                              child: const Text('Start Practice', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(12),
            color: AppColors.surfaceDark,
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      hintText: 'Type a message...',
                      hintStyle: const TextStyle(color: AppColors.textSecondary, fontSize: 13),
                      filled: true,
                      fillColor: AppColors.surface,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: sendMessage,
                  icon: const Icon(LucideIcons.send, color: AppColors.primaryCyan),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
