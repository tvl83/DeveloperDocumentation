
## Resources - Class Documentation

<%= something %>
The class documentation is located in api/ as DocSets for use with Xcode.
It can be installed by following the Sphero SDK installation steps below.
If that does not work or you would like to install the DocSets manually you can simply copy them into the DocSets directory used by Xcode.
It is located at

        ~/Library/Developer/Shared/Documentation/DocSets/

Once the DocSets have been copied, restart Xcode and they will then appear in the Documentation section of the Organizer.

## Installing Xcode

    Notice: The Sphero iOS SDK works with iOS 7.0+

Before you begin to develop applications that interface with Sphero on iOS, you will need to install the iOS developer tools.
There is a general assumption that you are using the latest version of Mac OSX, our software is designed to take advantage of all the most current technologies that are offered but it is possible that it will work on older frameworks and technologies.

- Download and Install the current version of [Xcode](http://developer.apple.com/technologies/xcode.html)

## Installing the Sphero iOS SDK

- Download the current [Sphero iOS SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master).
- Simply Drag `RobotKit.framework` into your project's framework folder.
- Change your Deployment Target to 7.0

**!NOTICE: There are some linker changes that also must be made:** Change Build Settings -> Linking -> Other Linker Flags

- lstdc++
- all_load
- ObjC

The HelloWorld sample has all the necessary code needed to create and maintain a connection to Sphero, and can be used as a guide in best practices.
In general you will need to:

Make sure to import RobotKit.h and define required properties:

```
@import RobotKit

var robot
```




```
-(void)appDidBecomeActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent startDiscovery];
}
```

Call `startDiscovery` to look for connections:

```
[[RKRobotDiscoveryAgent sharedAgent] addNotificationObserver:self selector:@selector(handleRobotStateChangeNotification:)];
```

Listen for robot state changes:

```
-(void) handleRobotStateChangeNotification:(RKRobotChangedStateNotification *) n{
  switch(n.type){
    case RKRobotConnecting:
      break;
    case RKRobotConnected:
      _robot = [[RKConvenienceRobot alloc] initWithRobot:n.robot ];
      break;
    case RKRobotFailedConnect:
      break;
    case RKRobotDisconnected:
      _robot = nil;
      break;
  }
}
```

Create a method to handle robot state changes:

```
-(void)appWillResignActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent stopDiscovery];
  [_robot disconnect]; // will sleep Ollie as well
}
```

Do not forget to Disconnect from the Robot when the app closes, otherwise next time you start a connection it will already be in use.

```
  [_robot driveWithHeading:0.0 andVelocity:0.5];
```

You are now ready to start controlling and receiving information from your Sphero, simply add the following to move the sphero forward:

**Run the application on an iOS Device, if all went well Sphero should have moved forward just a little.**

#### Where is Ollie Going?

If you have successfully completed the quick start guide then Ollie should have moved after running the modified code.

It is necessary for the application to determine what direction forward is for the user from the point of view of the robot.
We call this step `Calibration` and it is **required** to properly drive Ollie in a predictable direction.

To learn more about calibration please check out the `RobotUISample` Sample project.
