class FeatureItem {
  const FeatureItem({required this.name, this.enabled = false});

  final String name;
  final bool enabled;

  FeatureItem copyWith({String? name, bool? enabled}) {
    return FeatureItem(
      name: name ?? this.name,
      enabled: enabled ?? this.enabled,
    );
  }
}
