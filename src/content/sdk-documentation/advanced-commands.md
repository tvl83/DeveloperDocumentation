---
title: Advanced Commands
order: 5
section: SDK Documentation
---

### Advanced Sensors

#### Motion (IMU)

```objective-c
//Create a mask for the sensors you are interested in
RKDataStreamingMask mask =  RKDataStreamingMaskAccelerometerFilteredAll |
                            RKDataStreamingMaskIMUAnglesFilteredAll     |
                            RKDataStreamingMaskGyroFilteredAll;

//Enable sensors with that mask and add a streaming rate
[_robot enableSensors:mask atStreamingRate:10];
[_robot addResponseObserver:self];

...

- (void)handleAsyncMessage:(RKAsyncMessage *)message forRobot:(id<RKRobotBase>)robot {
    if ([message isKindOfClass:[RKDeviceSensorsAsyncData class]]) {
        
        // Received sensor data, so display it to the user.
        RKDeviceSensorsAsyncData *sensorsAsyncData = (RKDeviceSensorsAsyncData *)message;
        RKDeviceSensorsData *sensorsData = [sensorsAsyncData.dataFrames lastObject];

        RKAccelerometerData *accelerometerData = sensorsData.accelerometerData;
        RKAttitudeData *attitudeData = sensorsData.attitudeData;
        RKGyroData *gyroData = sensorsData.gyroData;
        
        float accelX = accelerometerData.acceleration.x;
        float accelY = accelerometerData.acceleration.y;
        float accelZ = accelerometerData.acceleration.z;
        float roll = attitudeData.roll;
        float yaw = attitudeData.yaw;
        float pitch = attitudeData.pitch;
        int16_t gyroX = gyroData.rotationRate.x;
        int16_t gyroY = gyroData.rotationRate.y;
        int16_t gyroZ = gyroData.rotationRate.z;
    }
}

```

```swift
// Coming Soon
```

```java
private ConvenienceRobot mRobot;
...
long sensorFlag = SensorFlag.ACCELEROMETER_NORMALIZED.longValue() | SensorFlag.GYRO_NORMALIZED.longValue();

mRobot.enableSensors( sensorFlag, SensorControl.StreamingRate.STREAMING_RATE10 );

mRobot.addResponseListener(new ResponseListener() {
...
    @Override
    public void handleAsyncMessage(AsyncMessage asyncMessage, Robot robot) {
        if (asyncMessage instanceof DeviceSensorAsyncMessage) {
            double accelerometerX = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getAccelerometerData().getFilteredAcceleration().x;
            double accelerometerY = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getAccelerometerData().getFilteredAcceleration().y;
            double accelerometerZ = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getAccelerometerData().getFilteredAcceleration().z;

            double gyroX = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getGyroData().getRotationRateFiltered().x;
            double gyroY = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getGyroData().getRotationRateFiltered().y;
            double gyroZ = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getGyroData().getRotationRateFiltered().z;
        }
    }
});
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
private ConvenienceRobot mRobot;
...
long sensorFlag = SensorFlag.VELOCITY.longValue() | SensorFlag.LOCATOR.longValue();
mRobot.enableSensors( sensorFlag, SensorControl.StreamingRate.STREAMING_RATE10 );
mRobot.addResponseListener(new ResponseListener() {
...
    @Override
    public void handleAsyncMessage(AsyncMessage asyncMessage, Robot robot) {
        if (asyncMessage instanceof DeviceSensorAsyncMessage) {
            float positionX = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getLocatorData().getPositionX();
            float positionY = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getLocatorData().getPositionY();
            float velocityX = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getLocatorData().getVelocity().x;
            float velocityY = ((DeviceSensorAsyncMessage) asyncMessage).getAsyncData().get(0).getLocatorData().getVelocity().y;
        }
    }
});
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
private ConvenienceRobot mRobot;
...
MacroObject macro = new MacroObject();

//Repeat five times
macro.addCommand( new LoopStart( 5 ) );

//Fade to cyan over 5 seconds
macro.addCommand( new Fade( 0, 255, 255, 5000 ) );
//Set a delay so that the next command isn't processed until the previous one is done
macro.addCommand( new Delay( 5000 ) );

//Fade to magenta over 5 seconds
macro.addCommand( new Fade( 255, 0, 255, 5000 ) );
//Set a delay so that the next command isn't processed until the previous one is done
macro.addCommand( new Delay( 5000 ) );

//Fade to yellow over 5 seconds
macro.addCommand( new Fade( 255, 255, 0, 5000 ) );
//Set a delay so that the next command isn't processed until the previous one is done
macro.addCommand( new Delay( 5000 ) );

//End the current loop and go back to LoopStart if more iterations expected
macro.addCommand( new LoopEnd() );

//Send the macro to the robot and play
macro.setMode( MacroObject.MacroObjectMode.Normal );
macro.setRobot( mRobot.getRobot() );
macro.playMacro();
```

```unity
// Coming Soon
```


