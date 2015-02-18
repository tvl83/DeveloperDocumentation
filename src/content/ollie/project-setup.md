---
title: "Project Setup"
word: "Project Setup"
order: 2.2
published: false
---

# Project Setup

## Android
### Importing the Sample Project

#### Open the Sample Project
 - Open android studio
 - Select the "**Open an existing Android Studio project**" option on the main menu
 - Navigate to the "**DriveSample**" directory that was unzipped when you downloaded the Robot SDK

#### Installing Android API 12 and Android API 18
*Note: You may skip this step if you already have Android API 12 and Android API 18 installed*
 - If you have not already installed Android API 12 and Android API 18, then the bottom box of Android Studio will tell you "**failed to find target**" and will provide you a link to install the missing frameworks. You will need to follow this step for both "**android-18**" and "**android-12**"

<a class="img-popup" href="{{assets}}/images/android-studio-setup-2.png">
  Click to zoom on image:
  ![QSG-libs.png]({{assets}}/images/android-studio-setup-2.png)
</a>

 - If Android Studio did not prompt you to install the extra APIs and the project does not build, ensure that the "**SDK Platform**" is installed in the Android SDK Manager for API 12 and API 18. You can reach this by going to *Tools > Android > SDK Manager* inside of Android Studio

#### Build the project
 - Press the play button on the top bar just to the right of the current build configuration button

 *Note: Robot applications will not work in the emulator due to the dependency on Bluetooth*

### Create a New Project in <br /> Android Studio

If you are creating a new project it is important to take special notice to the Android API Level and the Java compliance level.
The Robot SDK currently supports:

 - Android API level 18 (Android 4.3.1) or greater.
 - Java language compliance level 6.0(1.6) or greater.

#### Making a new project
 - Creating a new project is the same as creating a new Android application but also with the **RobotLibrary.jar** included in the project.

#### Integrating the Robot SDK Into Your Project

If you made a project from scratch with Android Studio or are using the default gradle configuration:
 - Place the **RobotLibrary.jar** inside of the **libs** folder of your project. It is safe to make the folder if it does not exist

If you use a custom gradle build script or do not have all libs included as dependencies:
 - Place the **RobotLibrary.jar** inside of the **libs** folder of your project. It is safe to make the folder if it does not exist
 - In Android Studio, using the project explorer, change the explorer tab to Project if it is not so already
 - Navigate to the **libs** folder in the Android Studio Project view
 - Right click (or option click on Mac) the **RobotLibrary.jar** and select "**Add as Library**"

#### Modify the AndroidManifest.xml File.

Before running the application, you will need to add permissions to use Bluetooth,

```
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

You are now ready to use the Robot SDK!

## Objective-C

### Importing the Sample Project

#### Open the Sample Project
 - Open Xcode
 - Select the "**Open another project**" option on the main menu
 - Navigate to the "**Samples**" directory that was unzipped when you downloaded the Robot SDK
 - Select a sample folder to open
 - Double click on the "xcodeproj" file

#### Build the project
 - Change the device target from iOS Simulator to iOS Device (or the name of the connected iOS device)
 - Press the play button or CMD+B

 *Note: Robot applications will not work in the emulator due to the dependency on Bluetooth*

### Create a New Project in <br /> Xcode

#### Making a new project
 - Create a new iOS application as normal
 - Move on to the next step

#### Integrating the Robot SDK Into Your Project

 - Open your project
 - Navigate in Finder to the **RobotKit.framework**
 - Drag and drop the framework into the project. Ensure the option **Copy files if needed** is checked before clicking **Add**
 - In the project navigator, click the name of your project to open the project options
 - Open the **General** tab
 - Change the **Deployment Target** to "7.0"
 - Open the **Capabilities** tab
 - Enable **Background Modes** and check **Uses Bluetooth LE accessories** this is to allow the robot to disconnect while the app is backgrounding
 - Open the **Build Settings** tab
 - Use the search bar to find "Other Linker Flags"
 - Add the linker flags "-ObjC" and "-lstdc++"

You are now ready to use the Robot SDK!

## Swift

### Importing the Sample Project

#### Open the Sample Project
 - Open Xcode
 - Select the "**Open another project**" option on the main menu
 - Navigate to the "**Samples**" directory that was unzipped when you downloaded the Robot SDK
 - Select a sample folder to open
 - Double click on the "xcodeproj" file

#### Build the project
 - Change the device target from iOS Simulator to iOS Device (or the name of the connected iOS device)
 - Press the play button or CMD+B

 *Note: Robot applications will not work in the emulator due to the dependency on Bluetooth*

### Create a New Project in <br /> Xcode

#### Making a new project
 - Create a new iOS application as normal
 - Move on to the next step

#### Integrating the Robot SDK Into Your Project

 - Open your project
 - Navigate in Finder to the **RobotKit.framework**
 - Drag and drop the framework into the project. Ensure the option **Copy files if needed** is checked before clicking **Add**
 - In the project navigator, click the name of your project to open the project options
 - Open the **General** tab
 - Change the **Deployment Target** to "7.0"
 - Open the **Capabilities** tab
 - Enable **Background Modes** and check **Uses Bluetooth LE accessories** this is to allow the robot to disconnect while the app is backgrounding
 - Open the **Build Settings** tab
 - Use the search bar to find "Other Linker Flags"
 - Add the linker flags "-ObjC" and "-lstdc++"

You are now ready to use the Robot SDK!
