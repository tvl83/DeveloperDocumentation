
# Basic Commands

Now it's time to actually do something with Ollie! For this example, we will blink the RGB LED blue. As opposed to previous versions of the Robot SDK, commands are now sent through one of three ways:

## Convenience Robot Function

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

## Convenience Robot Send Command

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

## Robot Send Command

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

Well, that's up to you. You can explore what the `RKConvenienceRobot` object can do for you, you can dive right in, take a look at the command documentation and start using `sendCommand(command: RKDeviceCommand)`, or none of that! If you ever get stuck, don't hesitate to post a question on our [StackOverflow Tag](http://stackoverflow.com/questions/tagged/sphero-api) 