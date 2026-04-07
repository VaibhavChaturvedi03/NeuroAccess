import 'package:flutter_test/flutter_test.dart';

import 'package:app/app.dart';

void main() {
  testWidgets('Home screen renders themed NeuroAccess UI', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const NeuroAccessApp());

    expect(find.text('NeuroAccess'), findsOneWidget);
    expect(find.text('Accessibility Score'), findsOneWidget);
    expect(find.text('Features'), findsOneWidget);
    expect(find.text('Live Fix Log'), findsOneWidget);
    expect(find.text('Apply Changes'), findsOneWidget);
  });
}
