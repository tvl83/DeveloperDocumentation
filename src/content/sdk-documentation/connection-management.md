---
title: Connection Management
order: 2
section: SDK Documentation
---

Also see [Connecting A Robot](/sphero-robot-basics/connecting-a-robot) for the end-user connection experience.

### Overview
The Sphero Robot SDKs all connect to robots using the same **DiscoveryAgent** concept.  In order to connect, simply register for *robot connection state change* notifications and start Discovery.

### Register for Connection State Changes
##### Register with the Discovery Agent
```objective-c
[[RKRobotDiscoveryAgent sharedAgent] addNotificationObserver:self selector:@selector(handleRobotStateChangeNotification:)];
```

```swift
func appDidBecomeActive(note: NSNotification) {
    RKRobotDiscoveryAgent.startDiscovery()
}
```

```java
RobotDiscoveryAgent.getInstance().addDiscoveryListener(new RobotChangedStateListener() {
    @Override
    public void handleRobotChangedState(Robot robot, RobotChangedStateNotificationType type) {

    }
}); 
```

##### Handle the Connection State Change

<!-- <p class="objective-c language-only">
  Implement the method `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` to be able to handle robot state change events.
</p> -->

```objective-c
- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n {
    switch(n.type) {
        case RKRobotConnecting:
            break;
        case RKRobotOnline:
            break;
        case RKRobotDisconnected:
            break;
        case RKRobotFailedConnect:
            break;
    }
}
```

```swift
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

```java
@Override
public void handleRobotChangedState(Robot robot, RobotChangedStateNotificationType type) {
    switch (type) {
        case Connecting:
            break;
        case FailedConnect:
            break;
        case Online:
            break;
        case Disconnected:
            break;
    }
}
```

```javascript
// changedState
```

### Start Discovery

All that you have to do now is start discovery with the `+ [RKRobotDiscoveryAgent startDiscovery]` method.
*Note: Due to limitation in the Apple Bluetooth stack, you cannot start discovery in `- [UIViewController viewDidLoad]`

```objective-c
- (void)appDidBecomeActive:(NSNotification *)n {
  [RKRobotDiscoveryAgent startDiscovery];
}
```

```swift
```

```java
@Override
protected void onStart() {
    super.onStart();
    // This line assumes that this object is a Context
    RobotDiscoveryAgent.getInstacne().startDiscovery(this);
}
```

```javascript
// onStart
```

 - When you are close enough, the robot will send the connecting and then connected message to your `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` method. When you receive the connected message, you are now connected to a robot!

 *Note: Discovery in most cases will stop automatically after connecting to one robot. If you have changed the max connected robots value via `+ [RKRobotDiscoveryAgent setMaxConnectedRobots:(int)maxConnectedRobots]` method, you will manually need to stop discovery using `+ [RKRobotDiscoveryAgent stopDiscovery]`.*

 *Warning: Discovering devices takes a *lot* of resources on the Bluetooth antenna. Do not leave discovery running when you are not about to connect to a robot.*

### Caching a Convenience Robot

When robot connects, you will get an object with the type `id<RKRobotBase>`. This class encompasses the basics of a Bluetooth robot, but does not do much robot-specific functionality. To get some neat built-in functionality, we will create a `RKConvenienceRobot` object when we receive the connected notification. The classes `RKOllie` and `RKSphero` provide even more functionality specific to each of the robots and are subclasses of `RKConvenienceRobot`.

```objective-c

@property (strong, nonatomic) RKConvenienceRobot *robot;

{...}

- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n {
    switch(n.type) {
        case RKRobotConnecting:
            break;
        case RKRobotOnline:
            // Bluetooth Classic (Sphero)
            if ([n.robot isKindOfClass:[RKRobotClassic class]]) {
                self.robot = [[RKSphero alloc] initWithRobot:n.robot]
            }
            else if ([n.robot isKindOfClass:[RKRobotLE class]) {
                self.robot = [[RKOllie alloc] initWithRobot:n.robot];
            }
            break;
        case RKRobotDisconnected:
            break;
        case RKRobotFailedConnect:
            break;
    }
}
```

```swift
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

```java
private ConvenienceRobot _robot;

{...}

@Override
public void handleRobotChangedState(Robot robot, RobotChangedStateNotificationType type) {
    switch (type) {
        case Online:
        // Bluetooth Classic (Sphero)
        if (robot instanceof RobotClassic) {
            _robot = new Sphero(robot);
        }
        // Bluetooth LE (Ollie)
        if (robot instanceof RobotLE) {
            _robot = new Ollie(robot);
        }
        break;
    }
}
```

```javascript
// changedState
```

### Disconnecting a Robot

When you are done with the robot, it is important to disconnect it so that the next application can use it. There are two methods to accomplish this:

#### Convenience Robot Method

If you have an `RKConvenienceRobot`, disconnection is accomplished by calling the method `- [RKConvenienceRobot disconnect]` and the robot will take care of the rest for you.

```objective-c
@property (strong, nonatomic) RKConvenienceRobot *robot; // Assume that this is set when the robot connects

{...}

- (void)disconnectRobot {
    [_robot disconnect];
}
```

```swift
var robot: RKConvenienceRobot!  // Assume that this is set when the robot connects

{...}

func disconnectRobot() {
  self.robot.disconnet()
}
```

```java
private ConvenienceRobot _robot; // Assume that this is set when the robot connects

{...}

@Override
public void onStop() {
    super.onStop();
    _robot.disconnect();
}
```

```javascript
// onStop
```

#### Robot Method

If you have a `id<RKRobotBase>`, disconnection is a bit more manual. `RKRobotLE` objects need to have `- [RKRobotLE sleep]` called on them as to avoid leaving the processor awake while the robot is not connected. Disconnection will be automatic from the sleep. `RKRobotClassic` objects can just have `- [RKRobotClassic disconnect]` called on them.

```objective-c
@property (strong, nonatomic) id<RKRobotBase> robot; // Assume this is set when the robot connects

{...}

- (void)disconnectRobot {
    if ([_robot isKindOfClass:[RKRobotLE class]]) {
        [_robot sleep];
    }
    else if ([_robot isKindOfClass:[RKRobotClassic class]]) {
        [_robot disconnect];
    }
}
```

```swift
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

```java
private Robot _robot;

{...}

@Override
public void onStop() {
    super.onStop();
    if (_robot instanceof RobotLE) {
        _robot.sleep();
    }
    else if (_robot instanceof RobotClassic) {
        _robot.disconnect();
    }
}
```

```javascript
// onStop
```

