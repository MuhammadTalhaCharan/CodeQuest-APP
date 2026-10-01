import 'package:audioplayers/audioplayers.dart';

class AudioService {
  static final AudioPlayer _player = AudioPlayer();
  static bool enabled = true;

  static Future<void> playWrong() async {
    if (!enabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/wrong.mp3'));
    } catch (_) {}
  }

  static Future<void> playCorrect() async {
    if (!enabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/correct.mp3'));
    } catch (_) {}
  }

  static Future<void> playCoin() async {
    if (!enabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/coin.mp3'));
    } catch (_) {}
  }

  static Future<void> playJump() async {
    if (!enabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/jump.mp3'));
    } catch (_) {}
  }

  static Future<void> playFanfare() async {
    if (!enabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/fanfare.mp3'));
    } catch (_) {}
  }

  static Future<void> playClick() async {
    if (!enabled) return;
    try {
      await _player.stop();
      await _player.play(AssetSource('audio/click.mp3'));
    } catch (_) {}
  }
}
