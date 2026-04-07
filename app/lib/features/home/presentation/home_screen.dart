import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../domain/feature_item.dart';
import 'widgets/accessibility_score_card.dart';
import 'widgets/action_buttons_section.dart';
import 'widgets/features_checklist_card.dart';
import 'widgets/live_fix_log_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<FeatureItem> _features = [
    const FeatureItem(name: 'Smart Contrast Fix'),
    const FeatureItem(name: 'Keyboard Navigation'),
    const FeatureItem(name: 'Dyslexia Font Mode'),
    const FeatureItem(name: 'Text-to-Speech'),
    const FeatureItem(name: 'AI Image Descriptions'),
  ];

  void _toggleFeature(int index, bool value) {
    setState(() {
      _features[index] = _features[index].copyWith(enabled: value);
    });
  }

  void _resetSelections() {
    setState(() {
      for (var i = 0; i < _features.length; i++) {
        _features[i] = _features[i].copyWith(enabled: false);
      }
    });
  }

  void _noopAction() {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        title: const Text(
          'NeuroAccess',
          style: TextStyle(color: AppColors.title, fontWeight: FontWeight.w700),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const AccessibilityScoreCard(),
              const SizedBox(height: 16),
              const Text(
                'Features',
                style: TextStyle(
                  color: AppColors.title,
                  fontWeight: FontWeight.w700,
                  fontSize: 20,
                ),
              ),
              const SizedBox(height: 8),
              FeaturesChecklistCard(
                features: _features,
                onFeatureChanged: (event) =>
                    _toggleFeature(event.index, event.value),
              ),
              const SizedBox(height: 16),
              const Text(
                'Live Fix Log',
                style: TextStyle(
                  color: AppColors.title,
                  fontWeight: FontWeight.w700,
                  fontSize: 20,
                ),
              ),
              const SizedBox(height: 8),
              const LiveFixLogCard(),
              const SizedBox(height: 16),
              ActionButtonsSection(
                onApply: _noopAction,
                onReset: _resetSelections,
                onVoiceControl: _noopAction,
                onReadPage: _noopAction,
              ),
              const SizedBox(height: 16),
              const Center(
                child: Text(
                  'Privacy-first • Runs locally',
                  style: TextStyle(color: AppColors.footer, fontSize: 15),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
