class UserProfile {
  final String id;
  final String name;
  final String avatar;
  final String email;
  final String selectedLanguage;
  int level;
  int xp;
  int xpToNextLevel;
  int coins;
  int streak;
  int projectsCount;
  int certificatesCount;
  int badgesCount;
  bool soundEnabled;
  int lives;

  UserProfile({
    required this.id,
    required this.name,
    required this.avatar,
    required this.email,
    required this.selectedLanguage,
    this.level = 8,
    this.xp = 820,
    this.xpToNextLevel = 1000,
    this.coins = 340,
    this.streak = 7,
    this.projectsCount = 4,
    this.certificatesCount = 2,
    this.badgesCount = 12,
    this.soundEnabled = true,
    this.lives = 3,
  });

  void addRewards(int xpAmount, int coinAmount) {
    xp += xpAmount;
    coins += coinAmount;
    while (xp >= xpToNextLevel) {
      xp -= xpToNextLevel;
      level += 1;
      xpToNextLevel = (xpToNextLevel * 1.25).round();
    }
  }
}
