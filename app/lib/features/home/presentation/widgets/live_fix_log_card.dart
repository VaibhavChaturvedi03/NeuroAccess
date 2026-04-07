import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';

class LiveFixLogCard extends StatelessWidget {
  const LiveFixLogCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      color: AppColors.cardTint,
      child: const Padding(
        padding: EdgeInsets.all(14),
        child: Row(
          children: [
            Icon(Icons.check_circle, color: AppColors.successIcon),
            SizedBox(width: 8),
            Text(
              'Scan complete',
              style: TextStyle(
                color: AppColors.successText,
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
