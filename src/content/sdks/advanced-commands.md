---
title: Advanced Commands
order: 5
section: SDK Documentation
---

## Code Examples

### Button Driver Sample Application

* Download the [ButtonDrive Sample app](https://github.com/orbotix/Sphero-iOS-SDK/tree/Beta/samples/ButtonDrive)

### Run the Application

Open the `ButtonDrive.xcodeproj` Xcode project.

Once it's open, drag `RobotKit.framework` into your project's framework folder.

If it isn't already, change the Deployment Target to 7.0.

Click **Run** to build and run the application.
If your Sphero is paired with your phone, you'll be able to control it with the on-screen d-pad buttons.

### How It Works

The `ButtonDriverViewController` imports dependencies, and defines required
properties.

```
#import "ButtonDriveViewController.h"
#import <RobotKit/RobotKit.h>

@interface ButtonDriveViewController()

@property (strong, nonatomic) RUICalibrateGestureHandler *calibrateHandler;
@property (strong, nonatomic) RKConvenienceRobot* robot;
```

When the app receives the `appDidBecomeActive` event, it tells RobotKit to start looking for a Sphero.

```
-(void)appDidBecomeActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent startDiscovery];
}
```

The RobotKit discovery agent is then told to add an observer to trigger event when a robot's state changes.

```
[[RKRobotDiscoveryAgent sharedAgent] addNotificationObserver:self selector:@selector(handleRobotStateChangeNotification:)];
```

Then, inside the handler, specific actions are defined for different possible robot states.

```
-(void) handleRobotStateChangeNotification:(RKRobotChangedStateNotification *) n{
  switch(n.type){
    case RKRobotConnecting:
      break;
    case RKRobotConnected:
      _robot = [[RKConvenienceRobot alloc] initWithRobot:n.robot ];
      [_calibrateHandler setRobot:n.robot];
      break;
    case RKRobotFailedConnect:
      break;
    case RKRobotDisconnected:
      _robot = nil;
      [_calibrateHandler setRobot:nil];
      break;
  }
}
```

Two methods then tell the robot to drive or stop the Sphero when buttons are pressed.

```
-(IBAction)twoSeventyPressed:(id)sender {
  [_robot driveWithHeading:270.0 andVelocity:0.5];
}

-(IBAction)stopPressed:(id)sender {
  [_robot stop];
}
```

Finally, when the app is closed, it will stop looking for new robots.

```
-(void)appWillResignActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent stopDiscovery];
  [_robot disconnect];
}
```

