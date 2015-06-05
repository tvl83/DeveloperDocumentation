---
title: Getting Started
order: 0
section: SDK Documentation
subsections:
  - Objective-C
  - Swift
  - Android
  - Unity
---

Build Apps for Sphero, Ollie and future *Sphero* robots very quickly using the iOS, OSX, Android, and Unity Sphero Robot SDKs.  iOS & Android are available for download below while the OSX and Unity SDKs are made available on request.  Numerous 3rd party SDKs exist as well and are made available in the [Community APIS](/javascript-sdk) section by their developers.

<!-- todo use include / partial but still allow editing of said include -->

<div class="objective-c swift language-only">

{{#markdown}}
There are two ways to get started with the RobotKit SDK, simply exploring samples in the [RobotKit SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master) or by integrating the RobotKit SDK into your own project.

#### iOS Prerequisites

- The iOS RobotKit SDK is compatible with iOS 7.0+
- RobotKit SDK applications *will not work in the emulator* due to the dependency on Bluetooth

#### 1. Install [Xcode](https://macappsto.re/us/Bk9QD.m)
- If you don't have Xcode installed use the install link above.
 
#### 2. Download [RobotKit SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master)
- Keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-iOS-SDK)

#### 3. Add RobotKit SDK to your Xcode Project
- Add Frameworks
	- Navigate to your [RobotKit SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master) download
	- Drag and drop the framework into the project. Ensure the option **Copy files if needed** is checked before clicking **Add**
- Set Deployment Target to **7.0** in the **General** tab
- Set Background Capabilities
	- Open **Capabilities** tab
	- Enable **Background Modes** and check **Uses Bluetooth LE accessories** 
	- note: this setting allows Robots to sleep + disconnect while the app is closing
- Update Build Settings
	- Open **Build Settings** tab
	- Search for **"Other Linker Flags"**
	- Add ```-ObjC -lstdc++ -all_load```
- Build Project
	- Change the device target from iOS Simulator to iOS Device (or the name of the connected iOS device)
	- Press the play button or CMD+B


#### 4. Integrate Connection and Commands

- [Connection Management](/sdk-documentation/connection-management)	
- [Basic Commands](/sdk-documentation/basic-commands)

{{/markdown}}
</div>




<div class="java language-only">
{{#markdown}}
There are two ways to get started with the RobotLibrary SDK, simply exploring samples in the [RobotLibrary SDK](https://github.com/orbotix/Sphero-Android-SDK/zipball/master) or by integrating the RobotKit SDK into your own project.

#### Android Prerequisites

- Android Studio requires JDK 1.7 even though the Robot SDK supports down to 1.6
- The Sphero Android SDK works with Android 3.1+ (API level 12) and Java Compiler Level 6.0(1.6)+
- The Ollie Android SDK works with Android 4.3+ (API level 18) and Java Compiler Level 6.0(1.6)+

- RobotLibrary SDK applications *will not work in the emulator* due to the dependency on Bluetooth

#### 1. Install [Android Studio](http://developer.android.com/sdk/index.html) + [JDK 1.7](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)
Before you begin to develop applications that interface with robots on Android, you will need to install the Android developer tools and an IDE. In this guide we will use Android Studio since Eclipse is no longer supported for Android development. There are many other well written Android IDEs out there and these configuration steps are most often still applicable.

#### 2. Download [RobotLibrary SDK](https://github.com/orbotix/Sphero-Android-SDK/zipball/master)
- Keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-Android-SDK)

#### 3. Add RobotLibrary SDK to your Android Studio Project
- Copy Library to Project
 	- Navigate to your [RobotLibrary SDK](https://github.com/orbotix/Sphero-Android-SDK/zipball/master)
 	- Drag and drop the **RobotLibrary.jar** into the **libs** folder inside the project. It is okay to create this folder if it does not exist.
- Add Library as a Dependency
	- Open the **build.gradle** file for the project
	- Under ```dependencies``` add this line if it does not exist ```compile fileTree(dir: 'libs', include: ['*.jar'])```

- Add Bluetooth Permissions
	- Open the **AndroidManifest.xml** file for the project
	- Add the ```BLUETOOTH``` and ```BLUETOOTH_ADMIN``` permissions

#### 4. Integrate Connection and Commands

- [Connection Management](/sdk-documentation/connection-management)	
- [Basic Commands](/sdk-documentation/basic-commands)
	
{{/markdown}}
</div>







