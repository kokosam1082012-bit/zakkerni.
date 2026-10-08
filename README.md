# فكرني — Fakkerni

Offline-first reminder app: Kotlin · Jetpack Compose (Material 3) · Room · DataStore · AlarmManager.

## Build
1. Open this folder in **Android Studio (Ladybug 2024.2+)** and let Gradle sync (JDK 17).
   If `gradle/wrapper/gradle-wrapper.jar` is missing, Android Studio uses its bundled Gradle,
   or run `gradle wrapper --gradle-version 8.9` once.
2. Run on a device/emulator (Android 8.0+ / API 26+), or `Build > Build APK(s)`.
   CLI: `./gradlew assembleDebug` -> `app/build/outputs/apk/debug/app-debug.apk`

## Architecture
- `data/` Room entity, DAO, database, repository (single source of truth + alarm sync)
- `settings/` DataStore (theme, color, language)
- `notifications/` ReminderScheduler (AlarmManager), Notifier, ReminderReceiver, BootReceiver, SnoozeActivity
- `ui/` Compose screens, ViewModel, Material 3 theme

## Font
See `FONT_AHALEEL_README.txt` (drop `ahaleel.ttf` into `app/src/main/res/font/`).
