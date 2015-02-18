---
word: Getting Started
title: Getting Started
order: 1
---

# Intro to Ollie

## What is Ollie?

PENDING: We need this content to update.

# IDE Setup

## Android

*Note: The Ollie Android SDK works with Android 4.3+ and Java Compiler Level 6.0(1.6)+*

### Installing an IDE and the Android SDK

Before you begin to develop applications that interface with robots on Android, you will need to install the Android developer tools and an IDE. In this guide we will use Android Studio since Eclipse is no longer supported for Android development. There are many other well written Android IDEs out there and these configuration steps are most often still applicable.

*Note: You must have JDK 1.7 for Android Studio to work, even though the Robot SDK supports down to 1.6*

 - Install [JDK 1.7](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)
 - Install [Android Studio and Android SDK](http://developer.android.com/sdk/index.html)

### Installing the Robot SDK

 - Download the latest version of the [Robot SDK](https://github.com/orbotix/Sphero-Android-SDK/zipball/master)

**You can always keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-Android-SDK)**

## Objective-C

*Note: The Robot SDK works with iOS 7.0+*

### Installing Xcode

Before you begin to develop applications that interface with robots on iOS, you will need to install Xcode. As of writing this, there are no other supported IDEs for iOS developement.

 - Install [Xcode](https://macappsto.re/us/Bk9QD.m)

### Installing the Robot SDK

 - Download the latest version of the [Robot SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master)

**You can always keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-iOS-SDK)**

## Swift

*Note: The Robot SDK works with iOS 7.0+*

### Installing Xcode

Before you begin to develop applications that interface with robots on iOS, you will need to install Xcode. As of writing this, there are no other supported IDEs for iOS developement.

 - Install [Xcode](https://macappsto.re/us/Bk9QD.m)

### Installing the Robot SDK

 - Download the latest version of the [Robot SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master)

**You can always keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-iOS-SDK)** 

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

# Connecting to Robots

## Android

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

## Objective-C

### Implement the Listener
Implement the method `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` to be able to handle robot state change events.

```
- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n {
    switch(n.type) {
        case RKRobotConnecting:
            break;
        case RKRobotOnline:
            break;
        case RKRobotDisconnected:
            break;
        case RKRobotFailedConnect:
            break;
    }
}
```

### Register with the Discovery Agent
Register with the `RKRobotDiscoveryAgent` to get robot state events

```
[[RKRobotDiscoveryAgent sharedAgent] addNotificationObserver:self selector:@selector(handleRobotStateChangeNotification:)];
```

### Start Discovery
All that you have to do now is start discovery with the `+ [RKRobotDiscoveryAgent startDiscovery]` method. 
*Note: Due to limitation in the Apple Bluetooth stack, you cannot start discovery in `- [UIViewController viewDidLoad]`

```
- (void)appDidBecomeActive:(NSNotification *)n {
  [RKRobotDiscoveryAgent startDiscovery];
}
```

 - When you are close enough, the robot will send the connecting and then connected message to your `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` method. When you receive the connected message, you are now connected to a robot!

 *Note: Discovery in most cases will stop automatically after connecting to one robot. If you have changed the max connected robots value via `+ [RKRobotDiscoveryAgent setMaxConnectedRobots:(int)maxConnectedRobots]` method, you will manually need to stop discovery using `+ [RKRobotDiscoveryAgent stopDiscovery]`.*

 *Warning: Discovering devices takes a *lot* of resources on the Bluetooth antenna. Do not leave discovery running when you are not about to connect to a robot.*

### Caching a Convenience Robot
When robot connects, you will get an object with the type `id<RKRobotBase>`. This class encompasses the basics of a Bluetooth robot, but does not do much robot-specific functionality. To get some neat built-in functionality, we will create a `RKConvenienceRobot` object when we receive the connected notification. The classes `RKOllie` and `RKSphero` provide even more functionality specific to each of the robots and are subclasses of `RKConvenienceRobot`.

```

@property (strong, nonatomic) RKConvenienceRobot *robot;

{...}

- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n {
    switch(n.type) {
        case RKRobotConnecting:
            break;
        case RKRobotOnline:
            // Bluetooth Classic (Sphero)
            if ([n.robot isKindOfClass:[RKRobotClassic class]]) {
                self.robot = [[RKSphero alloc] initWithRobot:n.robot]
            }
            else if ([n.robot isKindOfClass:[RKRobotLE class]) {
                self.robot = [[RKOllie alloc] initWithRobot:n.robot];
            }
            break;
        case RKRobotDisconnected:
            break;
        case RKRobotFailedConnect:
            break;
    }
}
```

### Disconnecting a Robot
When you are done with the robot, it is important to disconnect it so that the next application can use it. There are two methods to accomplish this:

#### Convenience Robot Method
If you have an `RKConvenienceRobot`, disconnection is accomplished by calling the method `- [RKConvenienceRobot disconnect]` and the robot will take care of the rest for you.

```
@property (strong, nonatomic) RKConvenienceRobot *robot; // Assume that this is set when the robot connects

{...}

- (void)disconnectRobot {
    [_robot disconnect];
}
```

#### Robot Method

If you have a `id<RKRobotBase>`, disconnection is a bit more manual. `RKRobotLE` objects need to have `- [RKRobotLE sleep]` called on them as to avoid leaving the processor awake while the robot is not connected. Disconnection will be automatic from the sleep. `RKRobotClassic` objects can just have `- [RKRobotClassic disconnect]` called on them.

```
@property (strong, nonatomic) id<RKRobotBase> robot; // Assume this is set when the robot connects

{...}

- (void)disconnectRobot {
    if ([_robot isKindOfClass:[RKRobotLE class]]) {
        [_robot sleep];
    }
    else if ([_robot isKindOfClass:[RKRobotClassic class]]) {
        [_robot disconnect];
    }
}
```

## Swift

### Implement the Listener
Implement the method `handleRobotStateChangeNotification(notification: RKRobotChangedStateNotification)` to be able to handle robot state change events.

```
func handleRobotStateChangeNotification(notification: RKRobotChangedStateNotification) {
    switch (notification.type) {
    case .Connecting:
        break
    case .Online:
        break
    case .Disconnected:
        break
    default:
    }
}
```

### Register with the Discovery Agent
Register with the `RKRobotDiscoveryAgent` to get robot state events

```
RKRobotDiscoveryAgent.sharedAgent().addNotificationObserver(self, selector: "handleRobotStateChangeNotification:")
```

### Start Discovery
All that you have to do now is start discovery with the `RKRobotDiscoveryAgent.startDiscovery()` method. 
*Note: Due to limitation in the Apple Bluetooth stack, you cannot start discovery in `override func viewDidLoad()`

```
func appDidBecomeActive(note: NSNotification) {
    RKRobotDiscoveryAgent.startDiscovery()
}
```

 - When you are close enough, the robot will send the connecting and then connected message to your `handleRobotStateChangeNotification(notification: RKRobotChangedStateNotification)` method. When you receive the connected message, you are now connected to a robot!

 *Note: Discovery in most cases will stop automatically after connecting to one robot. If you have changed the max connected robots value via `RKRobotDiscoveryAgent.sharedAgent().maxConnectedRobots` method, you will manually need to stop discovery using `RKRobotDiscoveryAgent.stopDiscovery()`.*

 *Warning: Discovering devices takes a *lot* of resources on the Bluetooth antenna. Do not leave discovery running when you are not about to connect to a robot.*

### Caching a Convenience Robot
When robot connects, you will get an object with the type `RKRobotBase`. This object encompasses the basics of a Bluetooth robot, but does not do much robot-specific functionality. To get some neat built-in functionality, we will create a `RKConvenienceRobot` object when we receive the connected notification. The classes `RKOllie` and `RKSphero` provide even more functionality specific to each of the robots and are subclasses of `RKConvenienceRobot`.

```

var robot: RKConvenienceRobot!

{...}

func handleRobotStateChangeNotification(notification: RKRobotChangedStateNotification) {
    let noteRobot = notification.robot

    switch (notification.type) {
    case .Connecting:
        break
    case .Online:
        if (noteRobot.isKindOfClass(RKRobotLE)) {
          self.robot = RKOllie(robot: noteRobot)
        } else if (noteRobot.isKindOfClass(RKRobotClassic)) {
          self.robot = RKSphero(robot: noteRobot)
        }
        break
    case .Disconnected:
        break
    default:
    }
}
```

### Disconnecting a Robot
When you are done with the robot, it is important to disconnect it so that the next application can use it. There are two methods to accomplish this:

#### Convenience Robot Method
If you have an `RKConvenienceRobot`, disconnection is accomplished by calling the method `disconnect()` and the robot will take care of the rest for you.

```
var robot: RKConvenienceRobot!  // Assume that this is set when the robot connects

{...}

func disconnectRobot() {
  self.robot.disconnet()
}
```

#### Robot Method

If you have a `RKRobotBase`, disconnection is a bit more manual. `RKRobotLE` objects need to have `sleep()` called on them as to avoid leaving the processor awake while the robot is not connected. Disconnection will be automatic from the sleep. `RKRobotClassic` objects can just have `disconnect()` called on them.

```
var robot: RKRobotBase! // Assume this is set when the robot connects

{...}

func disconnectRobot() {
  if (robot.isKindOfClass(RKRobotLE)) {
    robot.sleep()
  } else if (robot.isKindOfClass(RKRobotClass)) {
    robot.disconnect()
  }
}
``` 

# Basic Commands

Now it's time to actually do something with Ollie! For this example, we will blink the RGB LED blue. As opposed to previous versions of the Android SDK, commands are now sent through one of three ways:

## Android
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

## Objective-c
Now it's time to actually do something with Ollie! For this example, we will blink the RGB LED blue. As opposed to previous versions of the Robot SDK, commands are now sent through one of three ways:

### Convenience Robot Function

The `RKConvenienceRobot` class contains the method `- [RKConvenienceRobot setLEDWithRed:(float)redVal Green:(float)greenVal Blue:(float)blueVal`. We can set the RGB LED with this method. The valid values here are 0.0f to 1.0f.

```
@property (strong, nonatomic) RKConvenienceRobot *robot; // Assume this is set when the robot connects

{...}

- (void)blink:(BOOL)lit {
	if (lit) {
		[_robot setLEDWithRed:0.0f Green:0.0f Blue:0.0f];
	}
	else {
		[_robot setLEDWithRed:0.0f Green:0.0f Blue:1.0f];
	}

	[self performSelector:@selector(blink:) withObject:!lit afterDelay:0.5];
}
```

### Convenience Robot Send Command

The `RKConvenienceRobot` class contains the method `- [RKConvenienceRobot sendCommand:(RKDeviceCommand *)command]`. We can make a `RKRGBLEDOutputCommand` and send it with this method.

```
@property (strong, nonatomic) RKConvenienceRobot *robot; // Assume this is set when the robot connects

{...}

- (void)blink:(BOOL)lit {
	if (lit) {
		[_robot sendCommand:[RKRGBLEDOutputCommand commandWithRed:0.0f 
															green:0.0f
															 blue:0.0f]];
	}
	else {
		[_robot sendCommand:[RKRGBLEDOutputCommand commandWithRed:0.0f 
															green:0.0f
															 blue:1.0f]];
	}

	[self performSelector:@selector(blink:) withObject:!lit afterDelay:0.5];
}
```

### Robot Send Command

The `id<RKRobotBase>` object (the one we get from the `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` method or by using `- [RKConvenienceRobot robot]`) contains the method `- [id<RKRobotBase> sendCommand:(RKDeviceCommand *)command]`. We can make an `RKRGBLEDOutputCommand` and send it with this method.

```
@property (strong, nonatomic) id<RKRobotBase> robot; // Assume this is set when the robot connects

{...}

- (void)blink:(BOOL)lit {
	if (lit) {
		[_robot sendCommand:[RKRGBLEDOutputCommand commandWithRed:0.0f 
														    green:0.0f
														     blue:0.0f]];
	}
	else {
		[_robot sendCommand:[RKRGBLEDOutputCommand commandWithRed:0.0f 
															green:0.0f
															 blue:1.0f]];
	}

	[self performSelector:@selector(blink:) withObject:!lit afterDelay:0.5];
}
```
## Swift

### Convenience Robot Function

The `RKConvenienceRobot` class contains the method `setLEDWithRed(redVal:, green:, blue:)`. We can set the RGB LED with this method. The valid values here are 0.0f to 1.0f.

```
var robot: RKConvenienceRobot // Assume this is set when the robot connects

{...}

func blink(lit: Bool) {
	if (lit) {
		robot.setLEDWithRed(0.0, green: 0.0, blue: 0.0)
	} else {
		robot.setLEDWithRed(0.0, green: 0.0, blue: 1.0)
	}

	var delay = Int64(0.5 * Float(NSEC_PER_SEC))
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, delay), dispatch_get_main_queue(), { () -> Void in
        self.blink(!lit);
    })
}
```

### Convenience Robot Send Command

The `RKConvenienceRobot` class contains the method `sendCommand(command: RKDeviceCommand)`. We can make a `RKRGBLEDOutputCommand` and send it with this method.

```
var robot: RKConvenienceRobot // Assume this is set when the robot connects

{...}

func blink(lit: Bool) {
	if (lit) {
	    robot.sendCommand(RKRGBLEDOutputCommand.commandWithRed(0.0, green: 0.0, blue: 0.0) as RKDeviceCommand)
	} else {
	    robot.sendCommand(RKRGBLEDOutputCommand.commandWithRed(0.0, green: 0.0, blue: 1.0) as RKDeviceCommand)
	}

	var delay = Int64(0.5 * Float(NSEC_PER_SEC))
	dispatch_after(dispatch_time(DISPATCH_TIME_NOW, delay), dispatch_get_main_queue(), { () -> Void in
	    self.blink(!lit);
	})
}
```

### Robot Send Command

The `RKRobotBase` object (the one we get from the `handleRobotStateChangeNotification(notification: RKRobotChangedStateNotification)` method or by using `robot()` on `RKConvenienceRobot`) contains the method `sendCommand(command: RKDeviceCommand)`. We can make an `RKRGBLEDOutputCommand` and send it with this method.

```
var robot: RKRobotBase // Assume this is set when the robot connects

{...}

func blink(lit: Bool) {
	if (lit) {
	    robot.sendCommand(RKRGBLEDOutputCommand.commandWithRed(0.0, green: 0.0, blue: 0.0) as RKDeviceCommand)
	} else {
	    robot.sendCommand(RKRGBLEDOutputCommand.commandWithRed(0.0, green: 0.0, blue: 1.0) as RKDeviceCommand)
	}

	var delay = Int64(0.5 * Float(NSEC_PER_SEC))
	dispatch_after(dispatch_time(DISPATCH_TIME_NOW, delay), dispatch_get_main_queue(), { () -> Void in
	    self.blink(!lit);
	})
}
```

# What's next?

Well, that's up to you. You can explore what the `ConvenienceRobot` object can do for you in the SDK section, you can dive right in, take a look at the command documentation and start using `- [id<RKRobotBase> sendCommand:(RKDeviceCommand *)command]`, or none of that! If you ever get stuck, don't hesitate to post a question on our [StackOverflow Tag](http://stackoverflow.com/questions/tagged/ollie-api) 
