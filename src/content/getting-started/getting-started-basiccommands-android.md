
# Basic Commands

Now it's time to actually do something with Ollie! For this example, we will blink the RGB LED blue. As opposed to previous versions of the Android SDK, commands are now sent through one of three ways:

## Convenience Robot Function

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

## Convenience Robot Send Command

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

## Robot Send Command

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

# What's next?

Well, that's up to you. You can explore what the `ConvenienceRobot` object can do for you, you can dive right in, take a look at the command documentation and start using `Robot#sendCommand(DeviceCommand command)`, or none of that! If you ever get stuck, don't hesitate to post a question on our [StackOverflow Tag](http://stackoverflow.com/questions/tagged/sphero-api) 
