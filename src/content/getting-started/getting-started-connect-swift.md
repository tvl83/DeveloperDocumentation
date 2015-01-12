
# Connecting to Robots

## Implement the Listener
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

## Register with the Discovery Agent
Register with the `RKRobotDiscoveryAgent` to get robot state events

```
RKRobotDiscoveryAgent.sharedAgent().addNotificationObserver(self, selector: "handleRobotStateChangeNotification:")
```

## Start Discovery
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

## Caching a Convenience Robot
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

## Disconnecting a Robot
When you are done with the robot, it is important to disconnect it so that the next application can use it. There are two methods to accomplish this:

### Convenience Robot Method
If you have an `RKConvenienceRobot`, disconnection is accomplished by calling the method `disconnect()` and the robot will take care of the rest for you.

```
var robot: RKConvenienceRobot!  // Assume that this is set when the robot connects

{...}

func disconnectRobot() {
  self.robot.disconnet()
}
```

### Robot Method

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
