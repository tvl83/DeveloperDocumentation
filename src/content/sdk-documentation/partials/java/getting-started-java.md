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