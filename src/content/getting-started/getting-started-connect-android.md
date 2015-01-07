
# Connecting to Robots

 - Implement the `RobotChangedStateListener` interface. This will have you implement the `RobotChangedStateListener#changedState(Robot robot, RobotChangedStateNotificationType type)` method

```java
@Override
public void changedState(Robot robot, RobotChangedStateNotificationType type) {
    switch (type) {
        case Connecting:
            break;
        case FailedConnect:
            break;
        case Connected:
            break;
        case Disconnected:
            break;
    }
}
```

 - Register with the `DiscoveryAgent` to get robot state events

```java
// Bluetooth Classic (Sphero)
DiscoveryAgentClassic.getInstance().addRobotStateChangeListener(this);

// Bluetooth LE (Ollie)
DiscoveryAgentLE.getInstance().addRobotStateChangeListener(this);
```

 - All that you have to do now is start discovery with the `DiscoveryAgent#startDiscovery()` method. A good place to do this is the `Activity#onStart()` method, but there may be other places in your application where starting discovery is better suited

```java
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

```java

private ConvenienceRobot _robot;

{...}

@Override
public void changedState(Robot robot, RobotChangedStateNotificationType type) {
    switch (type) {
        case Connecting:
            break;
        case FailedConnect:
            break;
        case Connected:
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