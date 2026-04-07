import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';

class AccessibilityScoreCard extends StatelessWidget {
  const AccessibilityScoreCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      color: AppColors.cardTint,
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            Container(
              width: 92,
              height: 92,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.accentBlue, width: 6),
              ),
              child: const Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      '60',
                      style: TextStyle(
                        fontSize: 34,
                        fontWeight: FontWeight.w700,
                        color: AppColors.title,
                      ),
                    ),
                    Text(
                      '/100',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: AppColors.title,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(width: 14),
            const Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Accessibility Score',
                    style: TextStyle(
                      color: AppColors.title,
                      fontWeight: FontWeight.w700,
                      fontSize: 18,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text('• 8 Missing alt text'),
                  Text('• 1 Low contrast areas'),
                  Text('• 2 Navigation issues'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
