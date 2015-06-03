---
title: Basic Commands
order: 4
section: SDK Documentation
---

## Basic Commands
Robots objects in all supported Sphero SDKs have a sendCommand function.  This function abstracts the creation of the binary packet to be sent, queues the packet, and marshals it throught the Bluetooth Stack.

```objective-c
@property (strong, nonatomic) id<RKRobotBase> robot; // set this upon connection
// OR USE
@property (strong, nonatomic) RKConvenienceRobot *robot; //
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

```java
```






### Driving
Driving forward
```objective-c
[_robot sendCommand:[RKRollCommand commandWithHeading:0 andVelocity:];
```
Stopping
```objective-c
[_robot sendCommand:[RKRollCommand commandWithStop]];
```

### Changing Color
```objective-c

```


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

