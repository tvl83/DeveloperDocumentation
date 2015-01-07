
# Project Setup

## Importing the Sample Project
### Download the Ollie Sample Project

Download and unzip the [Sample]({{assets}}/bin/Android-OllieDriveSample.zip)

### Open the Ollie Sample Project
 - Open android studio 
 - Select the "**Open an existing Android Studio project**" option on the main menu
 - Navigate to the "**DriveSample**" directory that was unzipped

### Installing Android API 12 and Android API 18
*Note: You may skip this step if you already have Android API 12 and Android API 18 installed*
 - If you have not already installed Android API 12 and Android API 18, then the bottom box of Android Studio will tell you "**failed to find target**" and will provide you a link to install the missing frameworks. You will need to follow this step for both "**android-18**" and "**android-12**"

![QSG-libs.png]({{assets}}/images/android-studio-setup-1.png)

 - If Android Studio did not prompt you to install the extra APIs and the project does not build, ensure that the "**SDK Platform**" is installed in the Android SDK Manager for API 12 and API 18. You can reach this by going to Tools > Android > SDK Manager inside of Android Studio

### Build the project
 - Press the play button on the top bar just to the right of the current build configuration button

 *Note: Sphero and Ollie applications will not work in the emulator due to the dependency on Bluetooth*

## Create a New Project in <br /> Android Studio for Ollie

If you are creating a new project it is important to take special notice to the Android API Level and the Java compliance level.
The Ollie SDK currently supports:

 - Android API level 18 (Android 4.3.1) or greater.
 - Java language compliance level 6.0(1.6) or greater.

### Making a new project
 - Creating a new Ollie project is the same as creating a new Android application but also with the **RobotLibrary.jar** included in the project.

### Integrating the Ollie SDK Into Your Project

You can get a copy of the **RobotLibrary.jar** from the [GitHub Repository](https://github.com/orbotix/Sphero-Android-SDK) or by using the copy inside of the libs folder in the Drive Sample project.

If you made a project from scratch with Android Studio or are using the default gradle configuration:
 - Place the **RobotLibrary.jar** inside of the **libs** folder of your project. It is safe to make the folder if it does not exist

If you use a custom gradle build script or do not have all libs included as dependencies:
 - Place the **RobotLibrary.jar** inside of the **libs** folder of your project. It is safe to make the folder if it does not exist
 - In Android Studio, using the project explorer, change the explorer tab to Project if it is not so already
 - Navigate to the **libs** folder in the Android Studio Project view
 - Right click (or option click on Mac) the **RobotLibrary.jar** and select "**Add as Library**"

### Modify the AndroidManifest.xml File.

Before running the application, you will need to add permissions to use Bluetooth,

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

You are now ready to use the Ollie SDK!