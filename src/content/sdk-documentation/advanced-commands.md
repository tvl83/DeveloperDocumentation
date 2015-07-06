---
title: Advanced Commands
order: 5
section: SDK Documentation
---

### Advanced Sensors

#### Motion (IMU)

```objective-c
// Coming Soon
```

```swift
// Coming Soon
```

```java
// Coming Soon
```

```unity
// Coming Soon
```

#### Locator 
```objective-c
// Coming Soon
```

```swift
// Coming Soon
```

```java
// Coming Soon
```

```unity
// Coming Soon
```


#### Collisions
```objective-c
// Coming Soon
```

```swift
// Coming Soon
```

```java
mRobot.enableCollisions( true );
mRobot.addResponseListener(new ResponseListener() {
    @Override
    public void handleAsyncMessage(AsyncMessage asyncMessage, Robot robot) {
        if( asyncMessage instanceof CollisionDetectedAsyncData ) {
            //Collision occurred.
        }
    }
    ...
});
```

```unity
// Coming Soon
```


### Advanced Language

#### Oval
***Note: For Oval language documentation visit [Oval Language](/robot-languages/oval-language)***

#####Initializing Oval

<div class="objective-c language-only">
Interaction with Oval is facilitated by the ```RKOvalControl``` class.  ```RKOvalControl``` is initialized with a ```id<RKRobotBase>``` and allows you to send individual Oval programs or an array of programs.<br /><br />

Create a ```RKOvalControl``` instance and reset the OVM.  This ensures that the OVM on the Robot and the Oval compiler are in sync.
</div>

<div class="swift language-only">
Interaction with Oval is facilitated by the ```RKOvalControl``` class.  ```RKOvalControl``` is initialized with a ```RKRobotBase``` and allows you to send individual Oval programs or an array of programs.<br /><br />

Create a ```RKOvalControl``` instance and reset the OVM.  This ensures that the OVM on the Robot and the Oval compiler are in sync.
</div>

<div class="java language-only">
Interaction with Oval is facilitated by the ```OvalControl``` class.  ```OvalControl``` is initialized with a ```Robot``` and allows you to send individual Oval programs or an array of programs.<br /><br />

When you create an ```OvalControl``` instance, you will need to reset the OVM.  This ensures that the OVM on the Robot and the Oval compiler are in sync.
</div>

```objective-c
self.ovalControl = [[RKOvalControl alloc] initWithRobot:notification.robot delegate:self];
[self.ovalControl resetOvmAndLibrary:YES];
```

```swift
self.ovalControl = RKOvalControl(robot: notification.robot, delegate: self)
self.ovalControl.resetOvmAndLibrary(true)
```

```java
OvalControl control = new OvalControl(robot, new OvalControl.OvalControlListener() {
    @Override
    public void onProgramFailedToSend(OvalControl control, String message) {

    }

    @Override
    public void onProgramSentSuccessfully(OvalControl control) {

    }

    @Override
    public void onOvmReset(OvalControl control) {
    }

    @Override
    public void onOvalNotificationReceived(OvalControl control, OvalDeviceBroadcast notification) {

    }

    @Override
    public void onOvmRuntimeErrorReceived(OvalControl control, OvalErrorBroadcast notification) {

    }

    @Override
    public void onOvalQueueEmptied(OvalControl control) {

    }
});

control.resetOvm(true);
```

```unity
// Coming Soon
```

Send Oval programs from file. This method takes an array of programs so you can separate your Oval project into separate files
```objective-c
NSString *filePath = [[NSBundle mainBundle] pathForResource:@"Sample" ofType:@"oval"];
NSString *ovalProgram = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
[_ovalControl sendOvalPrograms:@[ovalProgram]];
```

```swift
let source = NSString(contentsOfFile: NSBundle.mainBundle().pathForResource("Sample", ofType: "oval")!, encoding: NSUTF8StringEncoding, error: nil)
if let unwrappedSource = source {
    self.ovalControl.sendOvalPrograms([unwrappedSource])
}
```

```java
//getProgramStringsArrayFromFiles() represents your own program creating an array of strings from locally stored files
String[] programs = getProgramStringsArrayFromFiles();
control.sendOvalPrograms( programs );
```

```unity
// Coming Soon
```

#####Streaming Oval

<div class="objective-c language-only">
When streaming Oval you have 2 options: ```-[RKOvalControl sendOvalString:(NSString *)ovalString]``` or ```-[RKOvalControl sendOvalString:(NSString *)ovalString allowQueue:(BOOL)allowQueue]``` Setting ```allowQueue``` to ```YES``` gurantees that your update will be sent to the robot (assuming the robot remains connected).  Setting ```allowQueue``` to ```NO``` does not allow the update to be queued.  This is useful when sending large amounts of data quickly but every update does not need to be executed on the robot (i.e. streaming heading and speed as you move a joystick around the screen). 
</div>

<div class="swift language-only">
When streaming Oval you have 2 options: ```ovalControl.sendOvalString(program: String!)``` or ```ovalControl.sendOvalString(program: String!, allowQueue: Bool)``` Setting ```allowQueue``` to ```true``` gurantees that your update will be sent to the robot (assuming the robot remains connected).  Setting ```allowQueue``` to ```false``` does not allow the update to be queued.  This is useful when sending large amounts of data quickly but every update does not need to be executed on the robot (i.e. streaming heading and speed as you move a joystick around the screen). 
</div>

```objective-c
[_ovalControl sendOvalString:[NSString stringWithFormat:@"speed = %@;...",_lightSpeed.text]]; //allowQueue is YES by default
-OR-
[_ovalControl sendOvalString:[NSString stringWithFormat:@"speed = %@;...",_lightSpeed.text] allowQueue:NO];
```

```swift
self.ovalControl.sendOvalString("speed = \(lightSpeed.text);...")
-OR-
self.ovalControl.sendOvalString("speed = \(lightSpeed.text);...", allowQueue: false)
```

```java
control.sendOval( "leftMotorPwm = 2000;rightMotorPwm = -2000;redLed=255;..." );
```

```unity
// Coming Soon
```

#### Macros
```objective-c
// Coming Soon
```

```swift
// Coming Soon
```

```java
// Coming Soon
```

```unity
// Coming Soon
```


