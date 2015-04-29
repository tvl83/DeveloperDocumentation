---
word: Mobile SDK
title: Mobile SDK
order: 2
---
# Mobile SDK

# Objective-C

## IDE Setup

*Note: The Robot SDK works with iOS 7.0+*

### Installing Xcode

Before you begin to develop applications that interface with robots on iOS, you will need to install Xcode. As of writing this, there are no other supported IDEs for iOS development.

 - Install [Xcode](https://macappsto.re/us/Bk9QD.m)

### Installing the Robot SDK

 - Download the latest version of the [Robot SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master)

**You can always keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-iOS-SDK)**

## Project Setup

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

## Connecting to Robot

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

## Basic Commands

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

## Code Examples

### Button Driver Sample Application

* Download the [ButtonDrive Sample app](https://github.com/orbotix/Sphero-iOS-SDK/tree/Beta/samples/ButtonDrive)

### Run the Application

Open the `ButtonDrive.xcodeproj` Xcode project.

Once it's open, drag `RobotKit.framework` into your project's framework folder.

If it isn't already, change the Deployment Target to 7.0.

Click **Run** to build and run the application.
If your Sphero is paired with your phone, you'll be able to control it with the on-screen d-pad buttons.

### How It Works

```
#import "ButtonDriveViewController.h"
#import <RobotKit/RobotKit.h>

@interface ButtonDriveViewController()

@property (strong, nonatomic) RUICalibrateGestureHandler *calibrateHandler;
@property (strong, nonatomic) RKConvenienceRobot* robot;
```

The `ButtonDriverViewController` imports dependencies, and defines required
properties.

```
-(void)appDidBecomeActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent startDiscovery];
}
```

When the app recieves the `appDidBecomeActive` event, it tells RobotKit to start looking for Spheros.

```
[[RKRobotDiscoveryAgent sharedAgent] addNotificationObserver:self selector:@selector(handleRobotStateChangeNotification:)];
```

The RobotKit discovery agent is then told to add an observer to trigger event when a robot's state changes.

```
-(void) handleRobotStateChangeNotification:(RKRobotChangedStateNotification *) n{
  switch(n.type){
    case RKRobotConnecting:
      break;
    case RKRobotConnected:
      _robot = [[RKConvenienceRobot alloc] initWithRobot:n.robot ];
      [_calibrateHandler setRobot:n.robot];
      break;
    case RKRobotFailedConnect:
      break;
    case RKRobotDisconnected:
      _robot = nil;
      [_calibrateHandler setRobot:nil];
      break;
  }
}
```

Then, inside the handler, specific actions are defined for different possible robot states.

```
-(IBAction)twoSeventyPressed:(id)sender {
  [_robot driveWithHeading:270.0 andVelocity:0.5];
}

-(IBAction)stopPressed:(id)sender {
  [_robot stop];
}
```

Two methods then tell the robot to drive or stop the Sphero when buttons are pressed.

```
-(void)appWillResignActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent stopDiscovery];
  [_robot disconnect];
}
```

Finally, when the app is closed, it will stop looking for new robots.

# Swift

## IDE Setup

*Note: The Robot SDK works with iOS 7.0+*

### Installing Xcode

Before you begin to develop applications that interface with robots on iOS, you will need to install Xcode. As of writing this, there are no other supported IDEs for iOS development.

 - Install [Xcode](https://macappsto.re/us/Bk9QD.m)

### Installing the Robot SDK

 - Download the latest version of the [Robot SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master)

**You can always keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-iOS-SDK)**

## Project Setup

COMING SOON

## Connecting to Robot

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

## Basic Commands

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

# Java

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

# Convenience Robot

This is a detailed view of the Convenience Robot. The motivation behind using a Convenience Robot is to abstract away all the commonplace things that you do with a robot once it's connected. View the **Connection** guide in the **Getting Started** section to see how to connect and construct a Convenience Robot.

For all snippets, assume a field is defined in the current class for the Convenience Robot:

##### iOS

```
@property (strong, nonatomic) RKConvenienceRobot *robot;
```

##### Android

```
private ConvenienceRobot _robot;
```

## Constructors

##### iOS

```
@property (strong, nonatomic) id<RKRobotBase> robotBase; // Assume this is set when the robot connects

{...}

// Init
self.robot = [[RKConvenienceRobot alloc] initWithRobot:_robotBase];

// Class initializer
self.robot = [RKConvenienceRobot convenienceWithRobot:_robotBase];
```

##### Android

```
private Robot _robotBase; // Assume this is set when the robot connects

{...}

_robot = new ConvenienceRobot(robotBase);
```

## Properties

#### Robot

Each Convenience Robot implementation has the Robot base that is given to you when the Robot connects.

#### Sensor Control

Sensor Control is a subsystem of the Robot that controlls things like data streaming, collisions, locator etc.

#### Last Versioning

The last versioning of the Robot.

*Warning: This value will be null if you have not queried the versioning yet!*

## Methods

#### Commands and Responses

### Send Command

This method is for sending commands of any type to the underlying Robot object. You would use this when you want to use a bit of functionality that is not included in the Convenience Robot.

### Add / Remove Response Observer

Response observers are how you are able to react to responses from the Robot in your Application. To register a response observer, you need to implement the appropriate interface, then use the add method. Similarly, to remove a response observer, you use the remove method.

*Note: In iOS, all of the protocol methods are optional. Android, not so much.*

##### iOS

```
@interface RKMyObserver : NSObject <RKResponseObserver>

@property (strong, nonatomic) RKConvenienceRobot *robot;

@end

@implementation RKMyObserver

- (instancetype)initWithRobot:(RKConvenienceRobot *)robot {
	self = [super init];
	if (self) {
		self.robot = robot;
		[robot addRepsonseObserver:self];
	}
}

- (void)dealloc {
	[_robot removeResponseObserver:self];
	_robot = nil;
}

- (void)handleResponse:(RKDeviceResponse *)response forRobot:(id<RKRobotBase>)robot {
	// Do something with the response here
}

@end
```

##### Android

```
public class MyResponseListener implements ResponseListener {
	private ConvenienceRobot _robot;

	public MyResponseListener(ConvenienceRobot robot) {
		_robot = robot;
		_robot.addResponseListener(this);
	}

	public void cleanup() {
		_robot.removeResponseListener(this);
		_robot = null;
	}

	@Override
    public void handleResponse(DeviceResponse response, Robot robot) {
    	// Do something with the response here
    }

    @Override
    public void handleStringResponse(String stringResponse, Robot robot) {
        // Handle string responses from the robot here
    }

    @Override
    public void handleAsyncMessage(AsyncMessage asyncMessage, Robot robot) {
        // Handle async messages from the robot here
    }
}
```

#### Connection

### Sleep

Powers off the robot's command processor. In the case of Sphero, this will also disconnect the robot.

*Note: It is usually a good idea to sleep the robot when you are done using it so that it uses less power in standby.*

### Disconnect

Disconnects the robot's Bluetooth connection. There are a few things to consider when using this method:
 - Ollie that are disconnected before sleeping will shine a purple light, indicating that there is no Bluetooth connection, but the command processor is on
 - Disconnecting a Sphero in iOS will only disconnect the internal `EAAccessory`. There is no way to disconnect Sphero from the operating system from your application without using sleep

### Is Connected

Returns true if the robot is connected, false if the Robot is in any other state. In the case of Convenience Robots, "connected" means that the robot is connected with Bluetooth, it's command processor is enabled, and had been initialized by the Robot SDK.

#### Driving

### Drive

This causes the Robot to begin driving in a direction set by the `heading` parameter at a speed set by the `velocity` parameter. Keep in mind that this heading is a delta in degrees from what the Robot believes is the zero heading. See the **Set Zero Heading** section to see how to set this zero heading.

*Note: Heading values are valid from 0.0f to 360.0f. A negative value's sign is dropped and values greater than 360 are modded by 360.*
*Note: Velocity values are valid from 0.0f to 1.0f. Values out of this range are clamped to the range.

##### iOS

### Drive With Reverse Option
This is the same as the regular **Drive** command, but with the option to reverse the face in which the Robot believes is the front. To drive in reverse, pass `true` as the `reverse` parameter.

### Stop

Cancels the current driving command on the Robot, causing it to attempt a stop. This command will attempt to keep the previous heading that was sent as to not turn while stopping.

*Warning: A stop command only stops the *current* drive command on the robot. Another drive command will override the stop if sent after.*

### Set Zero Heading

This method teaches the robot what "forward" is. By setting zero heading, you are saying that if you were to send a drive command with a heading of zero, the Robot should go straight forward. Rotating the robot then setting the zero heading is how "calibration" is performed in Sphero applications.

### Set Raw Motors

Allows you to set the mode and power output of each of the motors.

*Note: Power values are valid from 0 to 255.*
*Note: This command will have no effect with stabilization turned on.*
*Warning: Since this requires stabilization to be turned off, the robot will not attempt to keep itself level. This will result in the robot flipping over on itself at higher power values.*

#### Stabilization

Enables and disables the control system of the robot. This keeps the robot from tumbling over itself from the motors as well as allowing you to drive with drive commands. You will need to disable stabilization if you want to use raw motor commands or if you want to use sensor output to make a Robot behave as a controller.

#### LED Output

Controls the LED lights on the Robot. The "RGB LED" or sometimes referred to as "the LED" is the multi color LED located on the top of the Robot. The "Back LED" or "Tail Light" is the blue light on the back of the Robot, which is used in calibrating a Robot's heading.

### Set LED

Sets the RGB LED on the Robot to the specified color. The LED has 3, independently-controlled channels: red, green, and blue. The parameters to the function control how bright each channel is; 0.0f is off, and 1.0f is max brightness.

*Note: Color values are clamped to 0.0f and 1.0f.*

### Set LED Default

This method also sets the LED of the Robot but also notifies the Robot that this should be the new "default color". In Sphero, the default color is the color you see when the robot is paired, but not connected. In Ollie, the default color is the color you see when the command processor comes awake during the connection process. The factory-set vaule for the default color is an off-white color.

*Note: Color values are clamped to 0.0f and 1.0f.*

### Set Back LED

Sets the brightness of the blue back LED or tail light of the Robot. This LED is one channel, and it's brightness is controlled by a single float from 0.0f to 1.0f.

*Note: The brightness value is clamped to 0.0f and 1.0f.*

#### Sensors

These methods simplify controlling the various sensor systems on Robots.

### Enable Collisions

This method controlls collision detection on the Robot. The parameter `enable` controls whether the system is on. The Robot will provide an asynchronous notification when a collision was detected.

*Note: You must implement a response observer and listen for asynchronous notifications to get collision notifications.*

##### iOS

```
// Enables collisions
[_robot enableCollisions:YES];

// Listens for the collisions, provided the class is registered for responses
-(void)handleAsyncMessage:(RKAsyncMessage *)message forRobot:(id<RKRobotBase>)robot {
	if ([message isKindOfClass:[RKCollisionDetectedAsyncData class]]) {
		// Collision detected!
	}
}
```

##### Android

```
// Enables collisions
_robot.enableCollisions(true);

// Listens for the collisions, provided the class is registered for responses
@Override
public void handleAsyncMessage(final AsyncMessage asyncMessage, final Robot robot) {
	if (asyncMessage instanceof CollisionDetectedAsyncData) {
		// Collision detected!
	}
}
```

### Enable Locator

Enables location data to be streamed from the Robot. The parameter `enable controls whether the system is on. The Robot will provide an asynchronous notification with the locator update at a regular interval.

*Note: You must implement a response observer and listen for asynchronous notifications to get locator updates.*

##### iOS

```
// Enables the locator
[_robot enableLocator:YES];

// Listens for the locator updates
-(void)handleAsyncMessage:(RKAsyncMessage *)message forRobot:(id<RKRobotBase>)robot {
	if ([message isKindOfClass:[RKDeviceSensorsAsyncData class]]) {
		RKDeviceSensorsAsyncData *sensorsAsyncData = (RKDeviceSensorsAsyncData *)message;
        RKDeviceSensorsData *sensorsData = [sensorsAsyncData.dataFrames lastObject];
        RKLocatorData *locatorData = sensorsData.locatorData;

        // Do something with the locator data
	}
}
```

##### Android

```
// Enables collisions
_robot.enableLocator(true);

// Listens for the collisions, provided the class is registered for responses
@Override
public void handleAsyncMessage(final AsyncMessage asyncMessage, final Robot robot) {
	if (asyncMessage instanceof DeviceSensorAsyncMessage) {
		DeviceSensorAsyncMessage sensorsData = (DeviceSensorAsyncMessage) asyncMessage;
		ArrayList<DeviceSensorsData> sensorDataArray = sensorsData.getAsyncData();
		DeviceSensorData dsd = sensorDataArray.get(sensorDataArray.size() - 1);
		LocatorData locatorData = dsd.getLocatorData();

		// Do something with the locator data
	}
}
```

### Enable Sensors

Allows you to enable and disable any of the sensors on the Robot with an update rate of the parameter `hz`. The mask corresponds to what sensors you want enabled on the Robot. Use bitwise OR operations to create the mask that you wish to use. For some sensors, there are the *raw* and the *filtered* values. Filtered values are normalized to a "sensible" value, and in most cases you will want to use the *filtered* values.

*Note: You must implement a response observer and listen for asynchronous notifications to get sensor updates.*

*Note: Robots can only stream ~400hz as their maximum and this puts a lot of pressure on the connection. Carefully consider what rate you need to use.*

##### iOS

```
// Enables the sensors, expecting accelerometer and attitude streaming
RKSetDataStreamingMask mask = RKDataStreamingMaskAccelerometerFilteredAll | RKDataStreamingMaskIMUAnglesFilteredAll;
[_robot enableSensors:mask atStreamingRate:RKStreamingRate10];

// Listens for the locator updates
-(void)handleAsyncMessage:(RKAsyncMessage *)message forRobot:(id<RKRobotBase>)robot {
	if ([message isKindOfClass:[RKDeviceSensorsAsyncData class]]) {
		RKDeviceSensorsAsyncData *sensorsAsyncData = (RKDeviceSensorsAsyncData *)message;
        RKDeviceSensorsData *sensorsData = [sensorsAsyncData.dataFrames lastObject];

        // Do something with the sensor data
	}
}
```

##### Android

```
// Enables collisions
long mask = SensorFlag.ACCELEROMETER_NORMALIZED.longValue() | SensorFlag.ATTITUDE.longValue();
_robot.enableSensors(mask, SensorControl.StreamingRate.STREAMING_RATE10);

// Listens for the collisions, provided the class is registered for responses
@Override
public void handleAsyncMessage(final AsyncMessage asyncMessage, final Robot robot) {
	if (asyncMessage instanceof DeviceSensorAsyncMessage) {
		DeviceSensorAsyncMessage sensorsData = (DeviceSensorAsyncMessage) asyncMessage;
		ArrayList<DeviceSensorsData> sensorDataArray = sensorsData.getAsyncData();
		DeviceSensorData dsd = sensorDataArray.get(sensorDataArray.size() - 1);

		// Do something with the sensor data
	}
}
```

### Disable Sensors

This will disable all sensor streaming on the Robot. This is equivalent of enabling the sensors with no mask.

#### Macros

Macros are a series of instructions for the Robot to follow. The methods on a Convenience Robot are for interfacing with the macro executor. To learn more about macros, see the [MacroLab Tutorial](/MacroLab). See the iOS Object `RKMacroObject` or the Android object `MacroObject` to learn more about how to contruct macro objects for use in the Convenience Robot.

### Run Macro At ID

Runs an already loaded macro on the Robot

### Macro Abort

Aborts the currently executing macro, or does nothing if one is not running.

### Macro Save Temporary

Saves a temporary macro to the temporary slot on the Robot.

*Note: This method takes the byte data from the macro. Make sure to use the `generateMacroData` method to get the appropriate macro data.*

#### Orb Basic

Orb Basic is a BASIC interpreter for Robots. These methods interface with the Orb Basic executor on the Robot. To learn more about Orb Basic, see the [Orb Basic Tutorial](/OrbBasic).

### Reset Orb Basic Memory

Deletes all Orb Basic programs from the Robot.

### Append Orb Basic Program

Adds a new Orb Basic program to the Robot's memory.

*Note: If the final size of your Orb Basic program is greater than 254 you need to split it into chunks and send the chunks with this command.*

*Note: This method takes the bytes from the string of your Orb Basic program*

### Execute Orb Basic Program

Starts executing an Orb Basic program. The `line` parameter is used to specify the entry point of the execution. In most cases this will be the first line number written in the program.

### Abort Orb Basic Program

Stops execution of the currently executing Orb Basic Program.

# What's next?

If you ever get stuck, don't hesitate to post a question on our [StackOverflow Tag](http://stackoverflow.com/questions/tagged/sphero-api)
