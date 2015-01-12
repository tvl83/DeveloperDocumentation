
# Connecting to Robots

## Implement the Listener
Implement the method `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` to be able to handle robot state change events.

```
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

## Register with the Discovery Agent
Register with the `RKRobotDiscoveryAgent` to get robot state events

```
[[RKRobotDiscoveryAgent sharedAgent] addNotificationObserver:self selector:@selector(handleRobotStateChangeNotification:)];
```

## Start Discovery
All that you have to do now is start discovery with the `+ [RKRobotDiscoveryAgent startDiscovery]` method. 
*Note: Due to limitation in the Apple Bluetooth stack, you cannot start discovery in `- [UIViewController viewDidLoad]`

```
- (void)appDidBecomeActive:(NSNotification *)n {
  [RKRobotDiscoveryAgent startDiscovery];
}
```

 - When you are close enough, the robot will send the connecting and then connected message to your `- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n` method. When you receive the connected message, you are now connected to a robot!

 *Note: Discovery in most cases will stop automatically after connecting to one robot. If you have changed the max connected robots value via `+ [RKRobotDiscoveryAgent setMaxConnectedRobots:(int)maxConnectedRobots]` method, you will manually need to stop discovery using `+ [RKRobotDiscoveryAgent stopDiscovery]`.*

 *Warning: Discovering devices takes a *lot* of resources on the Bluetooth antenna. Do not leave discovery running when you are not about to connect to a robot.*

## Caching a Convenience Robot
When robot connects, you will get an object with the type `id<RKRobotBase>`. This class encompasses the basics of a Bluetooth robot, but does not do much robot-specific functionality. To get some neat built-in functionality, we will create a `RKConvenienceRobot` object when we receive the connected notification. The classes `RKOllie` and `RKSphero` provide even more functionality specific to each of the robots and are subclasses of `RKConvenienceRobot`.

```

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

## Disconnecting a Robot
When you are done with the robot, it is important to disconnect it so that the next application can use it. There are two methods to accomplish this:

### Convenience Robot Method
If you have an `RKConvenienceRobot`, disconnection is accomplished by calling the method `- [RKConvenienceRobot disconnect]` and the robot will take care of the rest for you.

```
@property (strong, nonatomic) RKConvenienceRobot *robot; // Assume that this is set when the robot connects

{...}

- (void)disconnectRobot {
    [_robot disconnect];
}
```

### Robot Method

If you have a `id<RKRobotBase>`, disconnection is a bit more manual. `RKRobotLE` objects need to have `- [RKRobotLE sleep]` called on them as to avoid leaving the processor awake while the robot is not connected. Disconnection will be automatic from the sleep. `RKRobotClassic` objects can just have `- [RKRobotClassic disconnect]` called on them.

```
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
