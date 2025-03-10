<!-- Video Diary App README -->

# 🎥 Video Diary App

Welcome to the **Video Diary App**! This project is built with Expo and React Native to help you record, organize, and share your video diaries seamlessly.

## 🚀 Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository:**
```bash
    git clone https://github.com/yourusername/video-diary.git
    cd video-diary
```

2. **Install Dependencies:**
```bash
    npm install
```

3. **Run the Application:**

   - **For Android:**
```bash
     npx expo run:android
```

   - **For iOS:**
```bash
     npx expo run:ios
```

## 🔧 Configuration

Ensure that your Android and iOS environments are properly configured.

### Android Configuration

- **Set the ANDROID_HOME Environment Variable:**
```bash
    export ANDROID_HOME=~/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools
```

- **Or Update the local.properties File:**
    Create or edit the file located at `android/local.properties` and add the following (modify the path as necessary):
```bash
    sdk.dir=/Users/yourusername/Library/Android/sdk
```

### iOS Configuration

- **Install Xcode:**
  Ensure that you have the latest version of Xcode installed from the App Store.
  
- **Command Line Tools:**
  Verify that the Xcode Command Line Tools are installed:
```bash
    xcode-select --install
```

- **CocoaPods Setup:**
  Navigate to the `ios` directory and install CocoaPods dependencies:
```bash
    cd ios
    pod install
    cd ..
```

## 📂 Project Structure

Below is an overview of the project’s structure:

video-diary/ ├── android/ ├── ios/ ├── src/ │ ├── components/ │ ├── screens/ │ └── assets/ ├── App.js └── package.json

## 💡 Tips & Best Practices

- **Rapid Development:** Take advantage of Expo CLI for fast development cycles and simplified workflows.
- **Documentation:** For further guidance and advanced usage, please refer to the [Expo Documentation](https://docs.expo.dev).
- **Contributing:** We welcome contributions! For bug reports, feature requests, or to contribute code, please check the repository’s issue tracker.

---

Happy coding and enjoy building your video diary!
