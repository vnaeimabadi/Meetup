# steps for generating the app for Android:
## step1: 
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

## Step2: Go to android directory:
  cd android

## Step3: Now in this android folder, run this command:
  for mac/linux: ./gradlew assembleDebug
  for windows: gradlew assembleDebug or .\gradlew assembleDebug


## App Images:
<img src="./assets/app-images/1.png" width="180" height="300">
<img src="./assets/app-images/2.png" width="180" height="300">
<img src="./assets/app-images/3.png" width="180" height="300">
<img src="./assets/app-images/4.png" width="180" height="300">
<img src="./assets/app-images/5.png" width="180" height="300">
<img src="./assets/app-images/6.png" width="180" height="300">
<img src="./assets/app-images/7.png" width="180" height="300">
<img src="./assets/app-images/8.png" width="180" height="300">
<img src="./assets/app-images/9.png" width="180" height="300">
<img src="./assets/app-images/10.png" width="180" height="300">
<img src="./assets/app-images/11.png" width="180" height="300">
<img src="./assets/app-images/12.png" width="180" height="300">
<img src="./assets/app-images/13.png" width="180" height="300">
<img src="./assets/app-images/14.png" width="180" height="300">
<img src="./assets/app-images/15.png" width="180" height="300">