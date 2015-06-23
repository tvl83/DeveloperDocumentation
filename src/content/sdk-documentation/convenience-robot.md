---
title: Convenience Robot
order: 3
section: SDK Documentation
---

The Official SDKs have a Convenience Robot class which encapsulates many of the common functions and commands that a developer might want as well as convenient access to sensor data, driving, color changes, and aiming.

For all snippets, assume a field id defined in the current class for the Convenience Robot and is populated during the handling of the Online event.

```objective-c
@property (strong, nonatomic) RKConvenienceRobot *robot;

{...}
- (void)handleRobotStateChangeNotification:(RKRobotChangedStateNotification *)n {
    switch(n.type) {
        case RKRobotOnline: // robot is online and ready for commands
        	_robot = [RKConvenienceRobot convenienceWithRobot:n.robot];
            break;
    }
}
```

```swift
var robot: RKConvenienceRobot!

{...}
func handleRobotStateChangeNotification(notification: RKRobotChangedStateNotification) {
    switch(notification.type) {
        case .Online:
            robot = RKConvenienceRobot(robot: notification.robot)
            break
    }
}

```

```java
private ConvenienceRobot _robot;
```

### Constructor
```objective-c
_robot = [RKConvenienceRobot convenienceWithRobot:robotBase];
```

```swift
robot = RKConvenienceRobot(robot: notification.robot)
```

```java
_robot = new ConvenienceRobot(robotBase);
```
### Properties
#### Sensor Control
Sensor Control is a subsystem of the Robot that controlls things like data streaming, collisions, locator etc.

#### Collisions
Sphero robots contain powerful analysis functions to filter accelerometer data in order to detect collisions. 
```objective-c
{...
	[_robot enableCollisions:YES];
...}

// from the RKResponseObserver protocol
-(void) handleAsyncMessage:(RKAsyncMessage*) message forRobot:(id<RKRobotBase>) robot{
	if([message isKindOf:[RKCollisionDetectedAsyncData class]]){
		// Collision Occured
	}
}

```

```swift
{...
robot.enableCollisions(true)
...}

// from the RKResponseObserver protocol
func handleAsyncMessage(message: RKAsyncMessage, robot: RKRobotBase) {
    if (message is RKCollisionDetectedAsyncData) {
        // Collision Occured
    }
}
```

```java

```

```unity

```

### Methods
#### Commands and Responses
##### Send Command
This method is for sending commands of any type to the underlying Robot object. You would use this when you want to use more advanced functionality that is not included in the Convenience Robot.

##### Add / Remove Response Observer
Response observers provide access to 
Response observers are how you are able to react to responses from the Robot in your Application. To register a response observer, you need to implement the appropriate interface, then use the add method. Similarly, to remove a response observer, you use the remove method.

*Note: In iOS, all of the protocol methods are optional.*
```objective-c
@interface RKMyObserver : NSObject <RKResponseObserver>

@property (strong, nonatomic) RKConvenienceRobot *robot;

@end

@implementation RKMyObserver

- (instancetype)initWithRobot:(RKConvenienceRobot *)robot {
    self = [super init];
    if (self) {
        self.robot = robot;
        [robot addRepsonseObserver:self];
    }
}

- (void)dealloc {
    [_robot removeResponseObserver:self];
    _robot = nil;
}

- (void)handleResponse:(RKDeviceResponse *)response forRobot:(id<RKRobotBase>)robot {
    // Do something with the response here
}

@end
```

```swift
class MyObserver: NSObject, RKResponseObserver {
    var robot: RKConvenienceRobot
    
    init(robot: RKConvenienceRobot) {
        self.robot = robot
        super.init()
        robot.addResponseObserver(self)
    }
    
    deinit {
        robot.removeResponseObserver(self)
    }
    
    func handleResponse(response: RKDeviceResponse!, forRobot robot: RKRobotBase!) {
        // Do somethign with the response here
    }
}
```

```java
public class MyResponseListener implements ResponseListener {
    private ConvenienceRobot _robot;

    public MyResponseListener(ConvenienceRobot robot) {
        _robot = robot;
        _robot.addResponseListener(this);
    }

    public void cleanup() {
        _robot.removeResponseListener(this);
        _robot = null;
    }

    @Override
    public void handleResponse(DeviceResponse response, Robot robot) {
        // Do something with the response here
    }

    @Override
    public void handleStringResponse(String stringResponse, Robot robot) {
        // Handle string responses from the robot here
    }

    @Override
    public void handleAsyncMessage(AsyncMessage asyncMessage, Robot robot) {
        // Handle async messages from the robot here
    }
}
```

#### Connection
##### Sleep
Powers off the robot's command processor. In the case of Sphero, this will also disconnect the robot. It is preferble sleep the robot when you are done using it so that it uses less power in standby.

##### Disconnection
Disconnects the robot's Bluetooth connection. There are a few things to consider when using this method:

- Ollies that are disconnected before sleeping will shine a purple light, indicating that there is no Bluetooth connection, but the command processor is on
- Disconnecting a Sphero in iOS will only disconnect the internal ```EAAccessory```. There is no way to disconnect Sphero from the operating system from your application without using sleep

##### Is Connected
Returns true if the robot is connected, false if the Robot is in any other state. In the case of Convenience Robots, "connected" means that the robot is connected with Bluetooth, it's command processor is enabled, and had been initialized by the Robot SDK.

#### Driving
##### Drive
This causes the Robot to begin driving in a direction set by the ```heading``` parameter at a speed set by the ```velocity``` parameter. Keep in mind that this heading is a delta in degrees from what the Robot believes is the zero heading. See the *Set Zero Heading* section to see how to set this zero heading.

*Note: Heading values are valid from 0.0f to 360.0f. A negative value's sign is dropped and values greater than 360 are modded by 360.*
*Note: Velocity values are valid from 0.0f to 1.0f. Values out of this range are clamped to the range.*

##### Drive With Reverse Option
This is the same as the regular *Drive* command, but with the option to reverse the face in which the Robot believes is the front. To drive in reverse, pass ```true``` as the ```reverse``` parameter.

##### Stop
Cancels the current driving command on the Robot, causing it to attempt a stop. This command will attempt to keep the previous heading that was sent as to not turn while stopping.

*Warning: A stop command only stops the current drive command on the robot. Another drive command will override the stop if sent after.*

##### Set Zero Heading
This method teaches the robot what "forward" is. By setting zero heading, you are saying that if you were to send a drive command with a heading of zero, the Robot should go straight forward. Rotating the robot then setting the zero heading is how "calibration" is performed in Sphero applications.

##### Set Raw Motors
Allows you to set the mode and power output of each of the motors.

*Note: Power values are valid from 0 to 255. Note: This command will have no effect with stabilization turned on.*
*Warning: Since this requires stabilization to be turned off, the robot will not attempt to keep itself level. This will result in the robot flipping over on itself at higher power values.*

#### Stabilization
Enables and disables the control system of the robot. This keeps the robot from tumbling over itself from the motors as well as allowing you to drive with drive commands. You will need to disable stabilization if you want to use raw motor commands or if you want to use sensor output to make a Robot behave as a controller.

#### LED Output 
Controls the LED lights on the Robot. The "RGB LED" or sometimes referred to as "the LED" is the multi color LED located on the top of the Robot. The "Back LED" or "Tail Light" is the blue light on the back of the Robot, which is used in calibrating a Robot's heading.

##### Set LED
Sets the RGB LED on the Robot to the specified color. The LED has 3, independently-controlled channels: red, green, and blue. The parameters to the function control how bright each channel is; 0.0f is off, and 1.0f is max brightness.

*Note: Color values are clamped to 0.0f and 1.0f.*

##### Set LED Default
This method also sets the LED of the Robot but also notifies the Robot that this should be the new "default color". In Sphero, the default color is the color you see when the robot is paired, but not connected. In Ollie, the default color is the color you see when the command processor comes awake during the connection process. The factory-set vaule for the default color is an off-white color.

*Note: Color values are clamped to 0.0f and 1.0f.*

##### Set Back LED
Sets the brightness of the blue back LED or tail light of the Robot. This LED is one channel, and it's brightness is controlled by a single float from 0.0f to 1.0f.

*Note: The brightness value is clamped to 0.0f and 1.0f*

#### Sensors
These methods simplify controlling the various sensor systems on robots.

##### Enable Collisions
This method controls collision detection on the Robot. The parameter enable controls whether the system is on. The Robot will provide an asynchronous notification when a collision was detected.

*Note: You must implement a response observer and listen for asynchronous notifications to get collision notifications.*
```objective-c
// Enables collisions
[_robot enableCollisions:YES];

// Listens for the collisions, provided the class is registered for responses
-(void)handleAsyncMessage:(RKAsyncMessage *)message forRobot:(id<RKRobotBase>)robot {
    if ([message isKindOfClass:[RKCollisionDetectedAsyncData class]]) {
        // Collision detected!
    }
}
```

```swift
// Enables collions
robot.enableCollisions(true)

// Listens for the collisions, provided the class is registered for responses
func handleAsyncMessage(message: RKAsyncMessage!, forRobot robot: RKRobotBase!) {
    if (message is RKCollisionDetectedAsyncData) {
        // Collision Detected!
    }
}
```

```java
// Enables collisions
_robot.enableCollisions(true);

// Listens for the collisions, provided the class is registered for responses
@Override
public void handleAsyncMessage(final AsyncMessage asyncMessage, final Robot robot) {
    if (asyncMessage instanceof CollisionDetectedAsyncData) {
        // Collision detected!
    }
}
```

##### Enable Locator
Enables location data to be streamed from the Robot. The parameter `enable controls whether the system is on. The Robot will provide an asynchronous notification with the locator update at a regulat interval.

*Note: You must implement a response observer and listen for asynchronous notifications to get locator updates.*
```objective-c
// Enables the locator
[_robot enableLocator:YES];

// Listens for the locator updates
-(void)handleAsyncMessage:(RKAsyncMessage *)message forRobot:(id<RKRobotBase>)robot {
    if ([message isKindOfClass:[RKDeviceSensorsAsyncData class]]) {
        RKDeviceSensorsAsyncData *sensorsAsyncData = (RKDeviceSensorsAsyncData *)message;
        RKDeviceSensorsData *sensorsData = [sensorsAsyncData.dataFrames lastObject];
        RKLocatorData *locatorData = sensorsData.locatorData;

        // Do something with the locator data
    }
}
```

```swift
// Enables the locator
robot.enableLocator(true)

// Listens for the locator updates
func handleAsyncMessage(message: RKAsyncMessage!, forRobot robot: RKRobotBase!) {
        if (message is RKDeviceSensorsAsyncData) {
            let sensorsAsyncData = message as! RKDeviceSensorsAsyncData
            let sensorsData = sensorsAsyncData.dataFrames.last as? RKDeviceSensorsData
            if let locatorData = sensorsData?.locatorData {
                // Do something with the locator data
            }
        }
    }
```

```java
// Enables the locator
_robot.enableLocator(true);

// Listens for the locator updates, provided the class is registered for responses
@Override
public void handleAsyncMessage(final AsyncMessage asyncMessage, final Robot robot) {
    if (asyncMessage instanceof DeviceSensorAsyncMessage) {
        DeviceSensorAsyncMessage sensorsData = (DeviceSensorAsyncMessage) asyncMessage;
        ArrayList<DeviceSensorsData> sensorDataArray = sensorsData.getAsyncData();
        DeviceSensorData dsd = sensorDataArray.get(sensorDataArray.size() - 1);
        LocatorData locatorData = dsd.getLocatorData();

        // Do something with the locator data
    }
}
```

##### Enable Sensors
Allows you to enable and disable any of the sensors on the Robot with an update rate of the parameter hz. The mask correspods to what sensors you want enabled on the Robot. Use bitwise OR operations to create the mask that you wish to use. For some sensors, there are the raw and the filtered values. Filtered values are normalized to a "sensible" value, and in most cases you will want to use the filtered values.

*Note: You must implement a response observer and listen for asynchronous notifications to get sensor updates.*

*Note: Robots can only stream ~400hz as their maximum and this puts a lot of pressure on the connection. Carefully consider what rate you need to use.*

```objective-c
// Enables the sensors, expecting accelerometer and attitude streaming
RKSetDataStreamingMask mask = RKDataStreamingMaskAccelerometerFilteredAll | RKDataStreamingMaskIMUAnglesFilteredAll;
[_robot enableSensors:mask atStreamingRate:RKStreamingRate10];

// Listens for the locator updates
-(void)handleAsyncMessage:(RKAsyncMessage *)message forRobot:(id<RKRobotBase>)robot {
    if ([message isKindOfClass:[RKDeviceSensorsAsyncData class]]) {
        RKDeviceSensorsAsyncData *sensorsAsyncData = (RKDeviceSensorsAsyncData *)message;
        RKDeviceSensorsData *sensorsData = [sensorsAsyncData.dataFrames lastObject];

        // Do something with the sensor data
    }
}
```

```swift
// Enables the sensors, expecting accelerometer and attitude streaming
let mask: RKDataStreamingMask = .AccelerometerFilteredAll | .IMUAnglesFilteredAll
robot.enableSensors(mask, atStreamingRate: RKStreamingRate.DataStreamingRate10)

// Listens for the locator updates
func handleAsyncMessage(message: RKAsyncMessage!, forRobot robot: RKRobotBase!) {
    if (message is RKDeviceSensorsAsyncData) {
        let sensorsAsyncData = message as! RKDeviceSensorsAsyncData
        if let sensorsData = sensorsAsyncData.dataFrames.last as? RKDeviceSensorsData {
            // Do something with the sensor data
        }
    }
}
```

```java
// Enables collisions
long mask = SensorFlag.ACCELEROMETER_NORMALIZED.longValue() | SensorFlag.ATTITUDE.longValue();
_robot.enableSensors(mask, SensorControl.StreamingRate.STREAMING_RATE10);

// Listens for the collisions, provided the class is registered for responses
@Override
public void handleAsyncMessage(final AsyncMessage asyncMessage, final Robot robot) {
    if (asyncMessage instanceof DeviceSensorAsyncMessage) {
        DeviceSensorAsyncMessage sensorsData = (DeviceSensorAsyncMessage) asyncMessage;
        ArrayList<DeviceSensorsData> sensorDataArray = sensorsData.getAsyncData();
        DeviceSensorData dsd = sensorDataArray.get(sensorDataArray.size() - 1);

        // Do something with the sensor data
    }
}
```

##### Disable Sensors
This will disable all sensor streaming on the robot. This is equivalent of enabling the sensors with no mask.

#### Macros
Macros are a series of instructions for the Robot to follow. The methods on a Convenience Robot are for interfacing with the macro executor. To learn more about macros, see the (MacroLab Tutorial)[MacroLab]. See the iOS Object ```RKMacroObject``` or the Android object ```MacroObject``` to learn more about how to contruct macro objects for use in the Convenience Robot.

##### Run Macro At ID
Runs an already loaded macro on the Robot

##### Macro Abort 
Aborts the currently executing macro, or does nothing if one is not running.

##### Macro Save Temporary
Saves a temporary macro to the temporary slot on the Robot.

*Note: This method takes the byte data from the macro. Make sure to use the ```generateMacroData``` method to get the appropriate macro data.*

#### Orb Basic

Orb Basic is a BASIC interpreter for Robots. These methods interface with the Orb Basic executor on the Robot. To learn more about Orb Basic, see the (Orb Basic Tutorial)[OrbBasic].

#####Reset Orb Basic Memory
Deletes all Orb Basic programs from the Robot.

#####Append Orb Basic Program
Adds a new Orb Basic program to the Robot's memory.

*Note: If the final size of your Orb Basic program is greater than 254 you need to split it into chunks and send the chunks with this command.*

*Note: This method takes the bytes from the string of your Orb Basic program*

#####Execute Orb Basic Program
Starts executing an Orb Basic program. The line parameter is used to specify the entry point of the execution. In most cases this will be the first line number written in the program.

#####Abort Orb Basic Program
Stops execution of the currently executing Orb Basic Program.
