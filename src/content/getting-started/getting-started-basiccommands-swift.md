
# Basic Commands

Now it's time to actually do something with Ollie! For this example, we will blink the RGB LED blue. As opposed to previous versions of the Robot SDK, commands are now sent through one of three ways:

## Convenience Robot Function

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

## Convenience Robot Send Command

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

## Robot Send Command

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

# What's next?

Well, that's up to you. You can explore what the `RKConvenienceRobot` object can do for you, you can dive right in, take a look at the command documentation and start using `- [id<RKRobotBase> sendCommand:(RKDeviceCommand *)command]`, or none of that! If you ever get stuck, don't hesitate to post a question on our [StackOverflow Tag](http://stackoverflow.com/questions/tagged/sphero-api) 