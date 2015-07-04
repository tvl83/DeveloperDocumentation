---
title: Basic Commands
order: 4
section: SDK Documentation
---

Robots objects in all supported Sphero SDKs have a sendCommand function.  This function abstracts the creation of the binary packet to be sent, queues the packet, and marshals it through the Bluetooth Stack.  

All examples assume a valid robot connection and class variable.  See [Connections](/sdk-documentation/connection-management)

### Aim & Setting Heading
As described in [Heading & Aiming](/sphero-robot-basics/heading-and-aiming) an application will need to be able to Aim the robot before allowing your user to attempt to navigate.

##### UI Aim Component


##### Custom Aiming
To implement a custom aim component, the following commands will need to be used.
1. Turn on Back (Aim) LED
2. Rotate with zero velocity
2. Set Heading

```objective-c
// turn on the blue taillight
[_robot sendCommand:[RKBackLEDOutputCommand commandWithBrightness:1.0]];
...
// rotate the robot
[_robot sendCommand:[RKRollCommand commandWithHeading:0 andVelocity:0.0];
...
// when user is done aiming - set the heading
[_robot sendCommand:[RKSetHeadingCommand command]];
```

```swift
robot.driveWithHeading(180, andVelocity: 0)
robot.setZeroHeading()
```

```java
// coming soon
```


### Driving
Driving forward
```objective-c
[_robot sendCommand:[RKRollCommand commandWithHeading:0 andVelocity:1.0];
```

```swift
robot.sendCommand(RKRollCommand(heading: 0, velocity: 1.0))
```

```java
_robot.sendCommand(new RollCommand(h, v * v, RollCommand.State.GO));
```

```unity
// Unity
```

Stopping
```objective-c
[_robot sendCommand:[RKRollCommand commandWithStopAtHeading:0]];
```

```swift
RKRollCommand.commandWithStopAtHeading(0)
```

```java
_robot.sendCommand(new RollCommand(RollCommand.getCurrentHeading(), 0.0f, RollCommand.State.STOP));
```

```unity
// Unity
```

### Changing Color
Set white at 50% brightness 
```objective-c
[_robot sendCommand:[RKRGBLEDOutputCommand commandWithRed:.5 green:.5 blue:.5]];
// The valid color values here are 0.0f to 1.0f.
```

```swift
robot.sendCommand(RKRGBLEDOutputCommand(red: 0.5, green: 0.5, blue: 0.5))
```

```java
robot.sendCommand(RGBLEDOutputCOmmand(.5, .5, .5));
```

```unity
// unity
```


### Convenience Robot Function

<div class="objective-c language-only">
{{#markdown}}
The `RKConvenienceRobot` class contains the method `- [RKConvenienceRobot setLEDWithRed:(float)redVal Green:(float)greenVal Blue:(float)blueVal`. We can set the RGB LED with this method. The valid values here are 0.0f to 1.0f.
{{/markdown}}
</div>

```objective-c
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

<div class="swift language-only">
{{#markdown}}
The `RKConvenienceRobot` class contains the method `setLEDWithRed(redVal: Float, green: Float, blue: Float)`. We can set the RGB LED with this method. The valid values here are 0.0 to 1.0.
{{/markdown}}
</div>

```swift
var robot: RKConvenienceRobot

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

```java
// coming soon
```

```unity
// coming soon
```

### Convenience Robot Send Command

<div class="objective-c language-only">
{{#markdown}}
The `RKConvenienceRobot` class contains the method `- [RKConvenienceRobot sendCommand:(RKDeviceCommand *)command]`. We can make a `RKRGBLEDOutputCommand` and send it with this method.
{{/markdown}}
</div>

```objective-c
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

<div class="swift language-only">
{{#markdown}}
The `RKConvenienceRobot` class contains the method `sendCommand(commad: RKDeviceCommand)`. We can make a `RKRGBLEDOutputCommand` and send it with this method.
{{/markdown}}
</div>

```swift
var robot: RKConvenienceRobot

{...}

func blink(lit: Bool) {
    if (lit) {
        robot.sendCommand(RKRGBLEDOutputCommand(red: 0.0, green: 0.0, blue: 0.0))
    } else {
        robot.sendCommand(RKRGBLEDOutputCommand(red: 0.0, green: 0.0, blue: 1.0))
    }
    
    var delay = Int64(0.5 * Float(NSEC_PER_SEC))
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, delay), dispatch_get_main_queue(), { () -> Void in
        self.blink(!lit);
    })
}
```

```java
// java
```

```javascript
// js
```

### Robot Send Command

<div class="objective-c language-only">
{{#markdown}}
The `id<RKRobotBase>` object (the one we get from the `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` method or by using `- [RKConvenienceRobot robot]`) contains the method `- [id<RKRobotBase> sendCommand:(RKDeviceCommand *)command]`. We can make an `RKRGBLEDOutputCommand` and send it with this method.
{{/markdown}}
</div>

```objective-c
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

<div class="swift language-only">
{{#markdown}}
The `RKRobotBase` object (the one we get from the `handleRobotStateChangeNotification(n: RKRobotChangedStateNotification)` method or by using the `robot` property) contains the method `sendCommand(command: RKDeviceCommand)`. We can make an `RKRGBLEDOutputCommand` and send it with this method.
{{/markdown}}
</div>


```swift
var robot: RKRobotBase

{...}

func blink(lit: Bool) {
    if (lit) {
        robot.sendCommand(RKRGBLEDOutputCommand(red: 0.0, green: 0.0, blue: 0.0))
    } else {
        robot.sendCommand(RKRGBLEDOutputCommand(red: 0.0, green: 0.0, blue: 1.0))
    }
    
    var delay = Int64(0.5 * Float(NSEC_PER_SEC))
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, delay), dispatch_get_main_queue(), { () -> Void in
        self.blink(!lit);
    })
}
```

```java
// java
```

```javascript
// js
```

