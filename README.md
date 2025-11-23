# FitBuddy - Health & Wellness Mobile App 💪

A comprehensive React Native mobile application for tracking exercises, managing fitness goals, and maintaining a healthy lifestyle.

## 🎯 Project Info

- **Domain**: Health & Wellness (Index Last Digit: 6)
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation

## ✨ Features

- ✅ **User Authentication** - Register/Login with full validation
- ✅ **Exercise Library** - Browse 10+ exercises with details
- ✅ **Search & Filter** - Find exercises by name or muscle group
- ✅ **Favorites** - Save and manage favorite exercises
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **User Profile** - View stats and manage settings
- ✅ **Persistent Data** - AsyncStorage for offline data
- ✅ **Responsive Design** - Works on all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd fitbuddy

# Install dependencies
npm install

# Start the app
npm start
```

### Running on Your Device

1. Start the development server: `npm start`
2. Open Expo Go on your phone
3. Scan the QR code from the terminal
4. App will load on your device

**Alternative methods:**
```bash
npm run android  # Run on Android device/emulator
npm run ios      # Run on iOS simulator (Mac only)
npm run web      # Run in web browser
```

## 📱 How to Use

1. **Register**: Create an account with your details
2. **Browse**: Explore exercises on the home screen
3. **Search**: Find specific exercises using the search bar
4. **Filter**: Filter exercises by muscle group
5. **View Details**: Tap any exercise to see full information
6. **Favorite**: Add exercises to your favorites list
7. **Dark Mode**: Toggle dark mode in the Profile screen

## 🏗️ Project Structure

```
fitbuddy/
├── src/
│   ├── components/common/     # Reusable UI components
│   ├── screens/
│   │   ├── auth/              # Login & Register
│   │   └── main/              # Home, Details, Favorites, Profile
│   ├── store/                 # Redux slices and store
│   ├── services/              # API calls
│   ├── types/                 # TypeScript interfaces
│   └── utils/                 # Theme and validation
├── App.tsx                    # Main app component
└── package.json
```

## 🛠️ Technologies

- React Native + Expo
- TypeScript
- Redux Toolkit
- React Navigation
- AsyncStorage
- Yup (validation)
- Axios
- Feather Icons

## 📸 Screenshots

(Add your screenshots here)

## 🎥 Demo Video

[Link to demo video] (max 2 minutes)

## 📚 Documentation

- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Complete project overview
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md)** - Pre-submission checklist

## 🔧 Troubleshooting

### Can't connect to development server?
```bash
# Use tunnel mode (works across networks)
npx expo start --tunnel

# Or LAN mode (same Wi-Fi required)
npx expo start --lan
```

### Metro bundler issues?
```bash
# Clear cache and restart
npx expo start --clear
```

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more solutions.

## 📝 Assignment Requirements

All requirements have been implemented:

- ✅ User Authentication with validation (Yup)
- ✅ Navigation (Stack + Bottom Tabs)
- ✅ Dynamic Item List (Exercise API)
- ✅ State Management (Redux Toolkit)
- ✅ Favorites with persistence (AsyncStorage)
- ✅ Consistent Styling (Feather Icons)
- ✅ Responsive Design

**Bonus Features:**
- ✅ Dark Mode Toggle
- ✅ Search Functionality
- ✅ Filter by Muscle Group
- ✅ Pull to Refresh

## 👨‍💻 Developer

**Index Number**: [Your Index Number]
**Last Digit**: 6
**Domain**: Health & Wellness

## 📅 Deadline

November 23rd, 2025

## 📄 License

Created as a university assignment for Cross-Platform Mobile Development.

---

**FitBuddy v1.0.0** - Your Personal Fitness Companion 🏃‍♂️
