---
title: "Basic Commands"
word: "Basic Commands"
order: 2.4
---

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
