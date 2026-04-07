import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';

class ActionButtonsSection extends StatelessWidget {
  const ActionButtonsSection({
    super.key,
    required this.onApply,
    required this.onReset,
    required this.onVoiceControl,
    required this.onReadPage,
    this.isBusy = false,
  });

  final VoidCallback onApply;
  final VoidCallback onReset;
  final VoidCallback onVoiceControl;
  final VoidCallback onReadPage;
  final bool isBusy;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF4D8DFF), AppColors.primaryBlue],
              ),
              borderRadius: BorderRadius.circular(14),
            ),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                shadowColor: Colors.transparent,
                backgroundColor: Colors.transparent,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              onPressed: isBusy ? null : onApply,
              child: const Text(
                'Apply Changes',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
              ),
            ),
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: OutlinedButton(
            style: OutlinedButton.styleFrom(
              side: const BorderSide(color: AppColors.primaryBlue),
              foregroundColor: AppColors.primaryBlue,
              padding: const EdgeInsets.symmetric(vertical: 14),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
            ),
            onPressed: isBusy ? null : onReset,
            child: const Text(
              'Reset',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500),
            ),
          ),
        ),
        const SizedBox(height: 14),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: AppColors.primaryBlue),
                  foregroundColor: AppColors.primaryBlue,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                onPressed: isBusy ? null : onVoiceControl,
                icon: const Icon(Icons.mic, size: 22),
                label: const Text(
                  'Voice Control',
                  style: TextStyle(fontSize: 18),
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: AppColors.primaryBlue),
                  foregroundColor: AppColors.primaryBlue,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                onPressed: isBusy ? null : onReadPage,
                icon: const Icon(Icons.volume_up, size: 22),
                label: const Text('Read Page', style: TextStyle(fontSize: 18)),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
