## IDE Setup

*Note: The Sphero Android SDK works with Android 3.1+ and Java Compiler Level 6.0(1.6)+*

### Installing an IDE and the Android SDK

Before you begin to develop applications that interface with robots on Android, you will need to install the Android developer tools and an IDE. In this guide we will use Android Studio since Eclipse is no longer supported for Android development. There are many other well written Android IDEs out there and these configuration steps are most often still applicable.

*Note: You must have JDK 1.7 for Android Studio to work, even though the Robot SDK supports down to 1.6*

 - Install [JDK 1.7](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)
 - Install [Android Studio and Android SDK](http://developer.android.com/sdk/index.html)

### Installing the Robot SDK

 - Download the latest version of the [Robot SDK](https://github.com/orbotix/Sphero-Android-SDK/zipball/master)

**You can always keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-Android-SDK)**

## Project Setup

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

## Connecting to Robot

### Implement the Listener

Implement the `RobotChangedStateListener` interface. This will have you implement the `RobotChangedStateListener#changedState(Robot robot, RobotChangedStateNotificationType type)` method

```
@Override
public void changedState(Robot robot, RobotChangedStateNotificationType type) {
    switch (type) {
        case Connecting:
            break;
        case FailedConnect:
            break;
        case Online:
            break;
        case Disconnected:
            break;
    }
}
```

### Register with the Discovery Agent

Register with the `DiscoveryAgent` to get robot state events

```
// Bluetooth Classic (Sphero)
DiscoveryAgentClassic.getInstance().addRobotStateChangeListener(this);

// Bluetooth LE (Ollie)
DiscoveryAgentLE.getInstance().addRobotStateChangeListener(this);
```

### Start Discovery

All that you have to do now is start discovery with the `DiscoveryAgent#startDiscovery()` method. A good place to do this is the `Activity#onStart()` method, but there may be other places in your application where starting discovery is better suited

```
@Override
protected void onStart() {
    super.onStart();
    // Bluetooth Classic (Sphero)
    DiscoveryAgentClassic.getInstance().addRobotStateChangeListener(this);
    // Bluetooth LE (Ollie)
    DiscoveryAgentLE.getInstance().startDiscovery();
}
```

 - When you are close enough, the robot will send the connecting and then connected message to your `RobotChangedStateListener#changedState(Robot robot, RobotChangedStateNotificationType type)` method. When you receive the connected message, you are now connected to a robot!

 *Note: Discovery in most cases will stop automatically after connecting to one robot. If you have changed the max connected robots value via `DiscoveryAgent#setMaxConnectedRobots(int maxConnectedRobots)` method, you will manually need to stop discovery using `DiscoveryAgent#stopDiscovery()`.*

 *Warning: Discovering devices takes a *lot* of resources on the Bluetooth antenna. Do not leave discovery running when you are not about to connect to a robot.*

### Caching a Convenience Robot

When robot connects, you will get the Java object `Robot`. This class encompasses the basics of a Bluetooth robot, but does not do much robot-specific functionality. To get some neat built-in functionality, we will create a `ConvenienceRobot` object when we receive the connected notification. The classes `Ollie` and `Sphero` provide even more functionality specific to each of the robots and are subclasses of `ConvenienceRobot`.

```

private ConvenienceRobot _robot;

{...}

@Override
public void changedState(Robot robot, RobotChangedStateNotificationType type) {
    switch (type) {
        case Connecting:
            break;
        case FailedConnect:
            break;
        case Online:
        	// Bluetooth Classic (Sphero)
        	if (robot instanceof RobotClassic) {
        		_robot = new Sphero(robot);
        	}
        	// Bluetooth LE (Ollie)
        	if (robot instanceof RobotLE) {
        		_robot = new Ollie(robot);
        	}
            break;
        case Disconnected:
            break;
    }
}
```

### Disconnecting a Robot

When you are done with the robot, it is important to disconnect it so that the next application can use it. There are two methods to accomplish this:

#### Convenience Robot Method

If you have a `ConvenienceRobot`, disconnection is accomplished by calling the method `ConvenienceRobot#disconnect()` and the robot will take care of the rest for you.

```
private ConvenienceRobot _robot; // Assume that this is set when the robot connects

{...}

@Override
public void onStop() {
	super.onStop();
	_robot.disconnect();
}
```

#### Robot Method

If you have a `Robot`, disconnection is a bit more manual. `RobotLE` objects need to have `Robot#sleep()` called on them as to avoid leaving the processor awake while the robot is not connected. Disconnection will be automatic from the sleep. `RobotClassic` objects can just have disconnect called on them.

```
private Robot _robot;

{...}

@Override
public void onStop() {
	super.onStop();
	if (_robot instanceof RobotLE) {
		_robot.sleep();
	}
	else if (_robot instanceof RobotClassic) {
		_robot.disconnect();
	}
}
```

## Basic Commands

### Convenience Robot Function

The `ConvenienceRobot` class contains the method `ConvenienceRobot#setLed(float red, float green, float blue)`. We can set the RGB LED with this method. The valid values here are 0.0f to 1.0f.

```

private ConvenienceRobot _robot; // Assume this is set when the robot connects
private Handler _handler = new Handler(Looper.getMainLooper());

{...}

private void blink(final boolean lit) {
    if(lit) {
      _robot.setLed(0.0f, 0.0f, 0.0f);
    }
    else {
      _robot.setLed(0.0f, 0.0f, 1.0f);
    }

    _handler.postDelayed(new Runnable() {
        public void run() {
            blink(!lit);
        }
    }, 1000);
}
```

### Convenience Robot Send Command

The `ConvenienceRobot` class contains the method `ConvenienceRobot#sendCommand(DeviceCommand command)`. We can make a `RGBLEDOutputCommand` and send it with this method.

```

private ConvenienceRobot _robot; // Assume this is set when the robot connects
private Handler _handler = new Handler(Looper.getMainLooper());

{...}

private void blink(final boolean lit) {
    if(lit) {
      _robot.sendCommand(new RGBLEDOutputCommand(0.0f, 0.0f, 0.0f));
    }
    else {
      _robot.sendCommand(new RGBLEDOutputCommand(0.0f, 0.0f, 1.0f));
    }

    _handler.postDelayed(new Runnable() {
        public void run() {
            blink(!lit);
        }
    }, 1000);
}
```

### Robot Send Command

The `Robot` class (the object we get from the `RobotChangedStateListener#changedState(Robot robot, RobotChangedStateNotificationType type)` method or by using `ConvenienceRobot#getRobot()`) contains the method `Robot#sendCommand(DeviceCommand command)`. We can make a `RGBLEDOutputCommand` and send it with this method.

```
private Handler _handler = new Handler(Looper.getMainLooper());
private Robot _robot; // Assume this is set when the robot is connected

{...}

private void blink(final boolean lit) {
    if(lit) {
      _robot.sendCommand(new RGBLEDOutputCommand(0.0f, 0.0f, 0.0f));
    }
    else {
      _robot.sendCommand(new RGBLEDOutputCommand(0.0f, 0.0f, 1.0f));
    }

    _handler.postDelayed(new Runnable() {
        public void run() {
            blink(!lit);
        }
    }, 1000);
}
```

## Code Examples
