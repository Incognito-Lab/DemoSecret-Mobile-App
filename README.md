# DemoSecret React Native Mobile App
This application is a React Native mobile app with the Hermes engine enabled, created for the Hermes React Native Reverse Engineering article.

# Too Lazy to Build?
Go to [Releases](https://github.com/Incognito-Lab/DemoSecret-Mobile-App/releases) section for downloading APK and IPA file.

# Build This App by Yourself

1. Clone this repo and `cd` into its directory. Use Node.js 22 or newer.
2. Install dependencies and start the development server:

   ```bash
   npm ci
   npm start
   ```

   The development server offers options for a development build, Android
   emulator, iOS simulator, or Expo Go.

### Android APK

Install the Android SDK, then run from the repository root:

```bash
npm run build:android
```

The APK is at `android/app/build/outputs/apk/release/app-release.apk`.

### iOS simulator build

On macOS, install Xcode, CocoaPods, and an iOS simulator runtime matching the
Xcode SDK. Then run from the repository root:

```bash
npx expo prebuild --platform ios --no-install
cd ios && pod install && cd ..
xcodebuild -workspace ios/DemoSecret.xcworkspace -scheme DemoSecret -configuration Release -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
```

### Signed iOS IPA

Sign in to your Apple Developer account in Xcode. Set `ios.bundleIdentifier` in
`app.json` to an identifier owned by your team. For an IPA installable on
registered test devices, replace `YOUR_TEAM_ID` with your Apple Developer Team
ID and run from the repository root:

```bash
npx expo prebuild --platform ios --no-install
cd ios && pod install && cd ..

export TEAM_ID=YOUR_TEAM_ID
mkdir -p build

xcodebuild \
  -workspace ios/DemoSecret.xcworkspace \
  -scheme DemoSecret \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  -archivePath "$PWD/build/DemoSecret.xcarchive" \
  -allowProvisioningUpdates \
  DEVELOPMENT_TEAM="$TEAM_ID" \
  archive

cat > build/ExportOptions.plist <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key><string>release-testing</string>
  <key>signingStyle</key><string>automatic</string>
  <key>teamID</key><string>${TEAM_ID}</string>
</dict>
</plist>
PLIST

xcodebuild -exportArchive \
  -archivePath "$PWD/build/DemoSecret.xcarchive" \
  -exportPath "$PWD/build/ipa" \
  -exportOptionsPlist "$PWD/build/ExportOptions.plist" \
  -allowProvisioningUpdates
```

The IPA is in `build/ipa/`. For App Store Connect or TestFlight, change the
export method to `app-store-connect`. Device archive and IPA export require your
Apple signing credentials. The APK and iOS simulator builds have been tested.

This dependency set uses matching Hermes compiler and runtime version
`260318099.0.2` to produce Hermes bytecode version 99. Keep those components
on the same version when updating dependencies.
