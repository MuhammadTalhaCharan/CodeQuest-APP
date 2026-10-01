import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';

class LearningMapScreen extends StatelessWidget {
  final VoidCallback onBack;
  final Function(String topicId) onSelectTopic;

  const LearningMapScreen({
    Key? key,
    required this.onBack,
    required this.onSelectTopic,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final nodes = [
      {'id': 'functions', 'title': 'Functions', 'status': 'locked'},
      {'id': 'oop', 'title': 'OOP', 'status': 'locked'},
      {'id': 'loops', 'title': 'Loops', 'status': 'active'},
      {'id': 'conditions', 'title': 'Conditions', 'status': 'completed_yellow'},
      {'id': 'data_types', 'title': 'Data Types', 'status': 'completed_green'},
      {'id': 'variables', 'title': 'Variables', 'status': 'completed_green'},
    ];

    return Scaffold(
      backgroundColor: const Color(0xFF09291E),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0C1424),
        title: const Text('Python Learning Path', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        leading: IconButton(
          icon: const Icon(LucideIcons.arrowLeft),
          onPressed: onBack,
        ),
        actions: const [
          Icon(LucideIcons.moreVertical),
          SizedBox(width: 12),
        ],
      ),
      body: Stack(
        children: [
          // Background River & Landscape Canvas
          CustomPaint(
            size: Size.infinite,
            painter: MapPathPainter(),
          ),

          // Scrollable Nodes List
          Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(vertical: 40),
              child: Column(
                children: [
                  ...nodes.map((node) {
                    final status = node['status'];
                    final title = node['title']!;
                    final id = node['id']!;

                    Color bgColor = const Color(0xFF14231B);
                    Color borderColor = Colors.green;
                    Widget icon = const Icon(LucideIcons.check, size: 14, color: Colors.black);

                    if (status == 'active') {
                      bgColor = AppColors.primaryBlue;
                      borderColor = AppColors.primaryCyan;
                      icon = const Icon(LucideIcons.star, size: 14, color: Colors.white);
                    } else if (status == 'locked') {
                      bgColor = const Color(0xFF182030);
                      borderColor = Colors.grey.shade700;
                      icon = const Icon(LucideIcons.lock, size: 14, color: Colors.grey);
                    } else if (status == 'completed_yellow') {
                      borderColor = Colors.amber;
                      icon = const Icon(LucideIcons.check, size: 14, color: Colors.black);
                    }

                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 18.0),
                      child: InkWell(
                        onTap: () => onSelectTopic(id),
                        borderRadius: BorderRadius.circular(24),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(
                            color: bgColor,
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(color: borderColor, width: 2),
                            boxShadow: [
                              if (status == 'active')
                                BoxShadow(color: AppColors.primaryCyan.withOpacity(0.6), blurRadius: 16),
                            ],
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Container(
                                padding: const EdgeInsets.all(4),
                                decoration: BoxDecoration(
                                  color: borderColor,
                                  shape: BoxShape.circle,
                                ),
                                child: icon,
                              ),
                              const SizedBox(width: 10),
                              Text(
                                title,
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  }).toList(),

                  // START Point with Avatar
                  const SizedBox(height: 10),
                  Column(
                    children: [
                      Container(
                        width: 36,
                        height: 36,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppColors.primaryCyan,
                        ),
                        child: const Icon(LucideIcons.user, size: 20, color: Colors.white),
                      ),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFF6D28D9),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text(
                          'START',
                          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 2, color: Colors.white),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class MapPathPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF84CC16)
      ..strokeWidth = 26
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path();
    path.moveTo(size.width * 0.5, size.height * 0.95);
    path.cubicTo(
      size.width * 0.4, size.height * 0.7,
      size.width * 0.6, size.height * 0.4,
      size.width * 0.5, size.height * 0.05,
    );

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
