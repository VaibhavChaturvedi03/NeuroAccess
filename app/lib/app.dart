import 'package:flutter/material.dart';

import 'core/theme/app_theme.dart';
import 'features/home/presentation/home_screen.dart';

class NeuroAccessApp extends StatelessWidget {
  const NeuroAccessApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'NeuroAccess',
      theme: AppTheme.lightTheme,
      home: const HomeScreen(),
    );
  }
}
