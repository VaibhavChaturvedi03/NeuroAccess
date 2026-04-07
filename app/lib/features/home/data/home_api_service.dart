import 'dart:convert';

import 'package:http/http.dart' as http;

class HomeApiService {
  HomeApiService({http.Client? client, String? baseUrl})
    : _client = client ?? http.Client(),
      _baseUri = Uri.parse(baseUrl ?? _defaultBaseUrl);

  static const _defaultSessionId = 'flutter-app';
  static const _renderBackendBaseUrl = 'https://neuroaccess-ta8w.onrender.com';

  static String get _defaultBaseUrl {
    return _renderBackendBaseUrl;
  }

  final http.Client _client;
  final Uri _baseUri;

  Uri _uri(String path) => _baseUri.resolve(path);

  Map<String, String> _headers() => {
    'Content-Type': 'application/json',
    'x-session-id': _defaultSessionId,
  };

  Future<Map<String, dynamic>?> fetchSettings() async {
    final response = await _client.get(
      _uri('/api/v1/settings'),
      headers: _headers(),
    );

    final body = _decode(response.body);
    if (response.statusCode >= 400 || body['success'] != true) {
      throw BackendApiException(
        _extractMessage(body, 'Failed to fetch settings'),
      );
    }

    final data = body['data'];
    return data is Map<String, dynamic> ? data : null;
  }

  Future<void> saveSettings({
    required String profile,
    required Map<String, bool> features,
  }) async {
    final payload = {
      'profile': profile,
      'features': features,
      'preferences': <String, dynamic>{},
    };

    final response = await _client.put(
      _uri('/api/v1/settings'),
      headers: _headers(),
      body: jsonEncode(payload),
    );

    final body = _decode(response.body);
    if (response.statusCode >= 400 || body['success'] != true) {
      throw BackendApiException(
        _extractMessage(body, 'Failed to save settings'),
      );
    }
  }

  Future<String> requestReadAloud(String text) async {
    final payload = {
      'provider': 'localai',
      'task': 'tts',
      'payload': {'text': text},
    };

    final response = await _client.post(
      _uri('/api/v1/ai-proxy'),
      headers: _headers(),
      body: jsonEncode(payload),
    );

    final body = _decode(response.body);
    if (response.statusCode >= 400 || body['success'] != true) {
      throw BackendApiException(
        _extractMessage(body, 'Failed to call AI service'),
      );
    }

    final data = body['data'];
    if (data is! Map<String, dynamic>) {
      throw BackendApiException('AI service returned an invalid response.');
    }

    final resultText = data['resultText'];
    return resultText is String ? resultText : 'Voice response generated.';
  }

  Map<String, dynamic> _decode(String raw) {
    if (raw.isEmpty) {
      return <String, dynamic>{};
    }
    final decoded = jsonDecode(raw);
    return decoded is Map<String, dynamic> ? decoded : <String, dynamic>{};
  }

  String _extractMessage(Map<String, dynamic> body, String fallback) {
    final error = body['error'];
    if (error is Map<String, dynamic>) {
      final message = error['message'];
      if (message is String && message.isNotEmpty) {
        return message;
      }
    }
    return fallback;
  }
}

class BackendApiException implements Exception {
  const BackendApiException(this.message);

  final String message;

  @override
  String toString() => message;
}
