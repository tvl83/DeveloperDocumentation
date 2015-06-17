---
title: Basic Commands
order: 4
section: SDK Documentation
---

Robots objects in all supported Sphero SDKs have a sendCommand function.  This function abstracts the creation of the binary packet to be sent, queues the packet, and marshals it through the Bluetooth Stack.  
Note that both robotBase and robot contain the ```sendCommand:(RKDeviceCommand*)``` selector.

```objective-c
@property (strong, nonatomic) id<RKRobotBase> robot; // set this upon connection
// OR USE
@property (strong, nonatomic) RKConvenienceRobot *robot;
```

```swift
// swift
```

```java
// java
```

```javascript
// js
```


### Aim & Setting Heading
As described in **ADD LINK to Aim/Heading** your application will need to be able to Aim the robot before allowing your user to attempt to navigate.

##### UI Aim Component

##### Custom Aiming
To implement a custom aim component, the following commands will need to be used.
1. Drive with zero velocity
2. Set Heading

```objective-c
// update this
// set heading
```

```swift
// swift
```

```java
// java
```

```javascript
// js
```

### Driving
Driving forward
```objective-c
[_robot sendCommand:[RKRollCommand commandWithHeading:0 andVelocity:1.0];
```

```swift
// Swift
```

```java
// Java
```

```unity
```

Stopping
```objective-c
[_robot sendCommand:[RKRollCommand commandWithStop]];
```

```swift
// Swift
```

```java
// Java
```

```unity
// Unity
```

### Changing Color
Set white at 50% brightness 
```objective-c
[_robot sendCommand:[RKRGBLEDOutputCommand commandWithRed:.5 green:.5 blue:.5]];
```

```swift
// swift
```

```java
// Java
```

```unity
// unity
```


### Convenience Robot Function

The `RKConvenienceRobot` class contains the method `- [RKConvenienceRobot setLEDWithRed:(float)redVal Green:(float)greenVal Blue:(float)blueVal`. We can set the RGB LED with this method. The valid values here are 0.0f to 1.0f.

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

```swift
// swift
```

```java
// java
```

```javascript
// js
```

### Convenience Robot Send Command

The `RKConvenienceRobot` class contains the method `- [RKConvenienceRobot sendCommand:(RKDeviceCommand *)command]`. We can make a `RKRGBLEDOutputCommand` and send it with this method.

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

```swift
// swift
```

```java
// java
```

```javascript
// js
```

### Robot Send Command

The `id<RKRobotBase>` object (the one we get from the `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` method or by using `- [RKConvenienceRobot robot]`) contains the method `- [id<RKRobotBase> sendCommand:(RKDeviceCommand *)command]`. We can make an `RKRGBLEDOutputCommand` and send it with this method.

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

```swift
// swift
```

```java
// java
```

```javascript
// js
```

