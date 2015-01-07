
## Basic Commands

Now it's time to actually do something with Ollie! For this example, we will blink the RGB LED blue. As opposed to previous versions of the Android SDK, commands are now sent through one of three ways:

#### Convenience Robot Function

The `Ollie` class contains the method `Ollie#setLed(float red, float green, float blue)`. We can set the RGB LED with this method. The valid values here are 0.0f to 1.0f.

```java

private Handler _handler = new Handler(Looper.getMainLooper());

{...}

private void blink(final boolean lit) {
    if(lit) {
      _ollie.setLed(0.0f, 0.0f, 0.0f);                              
    } 
    else {
      _ollie.setLed(0.0f, 0.0f, 1.0f);                             
    }

    _handler.postDelayed(new Runnable() {
        public void run() {
            blink(!lit);
        }
    }, 1000);
}
```

#### Convenience Robot Send Command

The `Ollie` class contains the method `Ollie#sendCommand(DeviceCommand command)`. We can make a `RGBLEDOutputCommand` and send it with this method.

```java

private Handler _handler = new Handler(Looper.getMainLooper());

{...}

private void blink(final boolean lit) {
    if(lit) {
      _ollie.sendCommand(new RGBLEDOutputCommand(0.0f, 0.0f, 0.0f));                              
    } 
    else {
      _ollie.sendCommand(new RGBLEDOutputCommand(0.0f, 0.0f, 1.0f));                             
    }

    _handler.postDelayed(new Runnable() {
        public void run() {
            blink(!lit);
        }
    }, 1000);
}
```

#### Robot Send Command

The `Robot` class (the object we get from the `RobotChangedStateListener#changedState(Robot robot, RobotChangedStateNotificationType type)` method or by using `Ollie#getRobot()`) contains the method `Robot#sendCommand(DeviceCommand command)`. We can make a `RGBLEDOutputCommand` and send it with this method.

```java

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

### What's next?

Well, that's up to you. You can explore what the `Ollie` object can do for you, or you can dive right in and start using `Robot#sendCommand(DeviceCommand command)`. If you ever get stuck, don't hesitate to post a question on our [StackOverflow Tag](http://stackoverflow.com/questions/tagged/sphero-api) 