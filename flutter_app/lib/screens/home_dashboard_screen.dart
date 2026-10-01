import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';
import '../models/user_profile.dart';

class HomeDashboardScreen extends StatelessWidget {
  final UserProfile profile;
  final VoidCallback onOpenMap;
  final VoidCallback onContinueLoop;
  final VoidCallback onOpenChallenge;
  final VoidCallback onOpenSettings;

  const HomeDashboardScreen({
    Key? key,
    required this.profile,
    required this.onOpenMap,
    required this.onContinueLoop,
    required this.onOpenChallenge,
    required this.onOpenSettings,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header: Avatar, Greeting, Settings
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          gradient: const LinearGradient(
                            colors: [AppColors.primaryCyan, AppColors.primaryPurple],
                          ),
                        ),
                        child: const Icon(LucideIcons.user, color: Colors.white),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Good Morning,',
                            style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                          ),
                          Row(
                            children: [
                              Text(
                                profile.name,
                                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                              const SizedBox(width: 4),
                              const Text('👋', style: TextStyle(fontSize: 16)),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                  IconButton(
                    onPressed: onOpenSettings,
                    icon: const Icon(LucideIcons.settings, color: Colors.white70),
                    style: IconButton.styleFrom(
                      backgroundColor: AppColors.surface,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // 7 Day Streak Card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF201530), Color(0xFF2A1B47)],
                  ),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.primaryPurple.withOpacity(0.4)),
                  boxShadow: [
                    BoxShadow(color: AppColors.primaryPurple.withOpacity(0.2), blurRadius: 15),
                  ],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(16),
                            gradient: const LinearGradient(colors: [Colors.amber, Colors.deepOrange]),
                          ),
                          child: const Icon(LucideIcons.flame, color: Colors.white, size: 28),
                        ),
                        const SizedBox(width: 14),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${profile.streak} Day Streak',
                              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                            ),
                            const Text(
                              'Keep it up!',
                              style: TextStyle(fontSize: 12, color: Colors.white70),
                            ),
                          ],
                        ),
                      ],
                    ),
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: Colors.purple.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: Colors.pinkAccent.withOpacity(0.4)),
                      ),
                      child: const Icon(LucideIcons.gift, color: Colors.pinkAccent),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Language Level Progress Card
              InkWell(
                onTap: onOpenMap,
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.borderSubtle),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                width: 44,
                                height: 44,
                                decoration: BoxDecoration(
                                  color: const Color(0xFF10142E),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: Colors.amber.withOpacity(0.5)),
                                ),
                                child: const Center(
                                  child: Text('Py', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.amber)),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    profile.selectedLanguage.toUpperCase(),
                                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
                                  ),
                                  Text(
                                    'Level ${profile.level}',
                                    style: const TextStyle(color: AppColors.primaryCyan, fontSize: 12, fontWeight: FontWeight.w600),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const Icon(LucideIcons.chevronRight, color: AppColors.textSecondary),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(
                            '${profile.xp} / ${profile.xpToNextLevel} XP',
                            style: const TextStyle(fontSize: 11, color: AppColors.textSecondary, fontFamily: 'monospace'),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: LinearProgressIndicator(
                          value: (profile.xp / profile.xpToNextLevel).clamp(0.0, 1.0),
                          minHeight: 8,
                          backgroundColor: Colors.black40,
                          valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primaryCyan),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Continue Learning
              const Text(
                'CONTINUE LEARNING',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.2, color: AppColors.textSecondary),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.borderSubtle),
                ),
                child: Column(
                  children: [
                    const Row(
                      children: [
                        Icon(LucideIcons.repeat, color: AppColors.primaryPurple, size: 28),
                        SizedBox(width: 12),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Loops', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white)),
                            Text('Progress: 60%', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Mission: Coin Loops', style: TextStyle(fontSize: 12, color: AppColors.primaryCyan)),
                        ElevatedButton.icon(
                          onPressed: onContinueLoop,
                          icon: const Icon(LucideIcons.play, size: 14),
                          label: const Text('Continue'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primaryPurple,
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Today's Challenge
              const Text(
                "TODAY'S CHALLENGE",
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.2, color: AppColors.textSecondary),
              ),
              const SizedBox(height: 8),
              InkWell(
                onTap: onOpenChallenge,
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.accentAmber.withOpacity(0.3)),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Icon(LucideIcons.coins, color: AppColors.accentAmber, size: 28),
                          SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Collect 10 Coins', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white)),
                              Text('+100 XP • +50 Coins', style: TextStyle(fontSize: 11, color: AppColors.accentAmber)),
                            ],
                          ),
                        ],
                      ),
                      Icon(LucideIcons.chevronRight, color: AppColors.textSecondary),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
