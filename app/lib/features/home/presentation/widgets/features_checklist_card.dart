import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';
import '../../domain/feature_item.dart';

class FeaturesChecklistCard extends StatelessWidget {
  const FeaturesChecklistCard({
    super.key,
    required this.features,
    required this.onFeatureChanged,
  });

  final List<FeatureItem> features;
  final ValueChanged<FeatureToggleEvent> onFeatureChanged;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          for (var i = 0; i < features.length; i++) ...[
            CheckboxListTile(
              value: features[i].enabled,
              contentPadding: const EdgeInsets.symmetric(horizontal: 8),
              activeColor: AppColors.primaryBlue,
              title: Text(
                features[i].name,
                style: const TextStyle(
                  color: AppColors.text,
                  fontWeight: FontWeight.w500,
                  fontSize: 16,
                ),
              ),
              onChanged: (value) {
                onFeatureChanged(
                  FeatureToggleEvent(index: i, value: value ?? false),
                );
              },
              controlAffinity: ListTileControlAffinity.leading,
            ),
            if (i != features.length - 1)
              const Divider(height: 1, color: AppColors.divider),
          ],
        ],
      ),
    );
  }
}

class FeatureToggleEvent {
  const FeatureToggleEvent({required this.index, required this.value});

  final int index;
  final bool value;
}
