# Reconnect

Reconnect is a modern reimagining of the New York Times "Connections" game — but better. 
With Reconnect, you can play through all puzzles without daily limits, track your progress locally, and enjoy a clean, mobile-first experience.

Built entirely in **React Native** with **Expo** and **AsyncStorage**, Reconnect stores all your game data locally, ensuring you can play offline anytime — no backend required.

## Features

- 🎯 **Unlimited Puzzles** – Play through the full library without waiting for the next day.
- 📱 **Offline Play** – Thanks to AsyncStorage, all game state and progress are saved locally.
- 🎨 **Modern UI** – Smooth animations and intuitive design for an enjoyable experience.
- 🧩 **Better Than the Original** – More puzzles, no ads, and improved UX.
- 🚫 **No Backend Needed** – Fast and lightweight, with everything stored on your device.

## Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/cajaun/reconnect.git
cd reconnect
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Open in Expo Go on your device or in an emulator.

## How It Works

Reconnect uses **AsyncStorage** to save:
- Completed puzzles
- Player statistics
- Current game progress

This ensures you can close the app and pick up exactly where you left off, even without an internet connection.

## Contributing

Contributions are welcome! If you’d like to improve Reconnect, please fork the repo and submit a pull request.

## License

MIT License © 2025 Your Name
