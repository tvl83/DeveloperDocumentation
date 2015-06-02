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
