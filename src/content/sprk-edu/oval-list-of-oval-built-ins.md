---
title: Oval - Reference
order: 8
section: SPRK - EDU
subsections:
 - Keywords
 - Properties
 - Async Callbacks
 - Functions
 - Error Codes
---

## Keywords

## Robot Properties
A built-in "property" acts like a globally defined variable in the robot with optionally defined getters and setters.<br>
*If you invoke a getter that does not exist you will get OVM error ERR_READ_FROM_WRITE_ONLY.*<br>
*If you invoke a setter that does not exist you will get OVM error ERR_WRITE_TO_READ_ONLY.*

| Name                                          | Type  | Getter | Setter | Min Value | Max Value | Units     | Description |
|-----------------------------------------------|-------|--------|--------|-----------|-----------|-----------|-------------|                                                                                                                                                	
| redLed                                        | float | n      | y      | 0.0       | 256.0     | (no unit) | Sets the value of the red component of the RGB LED |
| greenLed                                      | float | n      | y      | 0.0       | 256.0     | (no unit) | Sets the value of the green component of the RGB LED |
| blueLed                                       | float | n      | y      | 0.0       | 256.0.0   | (no unit) | Sets the value of the blue component of the RGB LED. |
| imuPitchAngle                                 | float | y      | n      | -180.0    | 180.0     | degrees   | Gets the value of the pitch angle from the IMU. |
| imuRollAngle                                  | float | y      | n      | -90.0     | 90.0      | degrees   | Gets the value of the roll angle from the IMU. |
| imuYawAngle                                   | float | y      | n      | -180.0    | 180.0     | degrees   | Gets the value of the yaw angle from the IMU. |
| controlSystemIsOn                             | int   | y      | y      | 0         | 1         | bool      | Returns 1 if the control system is on, 0 if it is not. |
| leftMotorPwm                                  | float | y      | y      | -4095.0   | 4095.0    | (no unit) | Get or set the pwm of the left motor. |
| rightMotorPwm                                 | float | y      | y      | -4095.0   | 4095.0    | (no unit) | Get or set the pwm of the right motor. |
| verticalAcceleration                          | float | y      | n      | -8.0      | 8.0       | Gs        | Gets the current vertical acceleration. Note: Should be ~1G when stationary.** |
| controlSystemTargetYaw                        | float | y      | y      | any       | any       | degrees   | Get or set the target yaw for the control system. This will have no effect if the control system is off.<br><br>**Note: in a different coordinate systesm than imuYawAngle (see controlSystemTargetImuYaw).** |
| controlSystemTargetSpeed                      | float | y      | y      | any       | any       | m/s       | Get or set the target speed for the control system. This will have no effect if the control system is off.<br><br>**Note: It is possible to send a speed that is not achievable by the robot.** |
| currentRobotTime                              | float | y      | y      | any       | any       | seconds   | Get or set the robot time.<br><br>**Note: If you send a negative value, the value will be interpreted as an unsigned integer and saved.** |
| controlSystemPitchPGain                       | float | y      | y      | any       | any       | (no unit) | Proportional gain of pitch controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemPitchIGain                       | float | y      | y      | any       | any       | (no unit) | Integral gain of pitch controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemPitchDGain                       | float | y      | y      | any       | any       | (no unit) | Derivative gain of pitch controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemYawPGain                         | float | y      | y      | any       | any       | (no unit) | Proportional gain of yaw controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** | 
| controlSystemYawIGain                         | float | y      | y      | any       | any       | (no unit) | Integral gain of yaw controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemYawDGain                         | float | y      | y      | any       | any       | (no unit) | Derivative gain of yaw controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemTorqueMinSensitiveRegion         | float | y      | y      | any       | any       | (no unit) | Internal control system parameter.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemTorqueMaxSensitiveRegion         | float | y      | y      | any       | any       | (no unit) | Internal control system parameter.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemMinRotationRate                  | float | y      | y      | any       | any       | deg/s     | The minimum rotation rate that the control system is able to use.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemMaxRotationRate                  | float | y      | y      | any       | any       | deg/s     | The maximum rotation rate that the control system is able to use.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemMaxYawErrorWhileDrivingFullSpeed | float | y      | y      | any       | any       | degrees   | <br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| gyroSensorPitch                               | float | y      | n      | any       | any       | deg/s     | Rotation rate around pitch axis. |
| gyroSensorRoll                                | float | y      | n      | any       | any       | deg/s     | Rotation rate around roll axis. |
| gyroSensorYaw                                 | float | y      | n      | any       | any       | deg/s     | Rotation rate around yaw axis. |
| wheelSlipRate                                 | float | y      | n      | 0.0       | any       | (no unit) | Estimate of how much wheels are slipping. |
| controlSystemIsInverted                       | int   | y      | y      | 0         | 1         | bool      | Drive upside down. |
| backLed                                       | float | y      | y      |  0.0      |  256.0    | (no unit) | Brightness of back LED light. |
| shouldOverrideSupercontrollerTargetPitch      | int   | y      | y      | 0         | 1         | bool      | When true disable speed controller and use supercontrollerPitchOverride as target pitch. |
| supercontrollerTargetPitchOverride            | float | y      | y      | any       | any       | degrees   | Desired pitch angle in lieu of speed controller (see shouldOverrideSupercontrollerTargetPitch). |
| locatorPositionX                              | float | y      | y      | any       | any       | meters    | X coordinate of current position on floor. |
| locatorPositionY                              | float | y      | y      | any       | any       | meters    | Y coordinate of current position on floor. |
| locatorVelocityX                              | float | y      | y      | any       | any       | m/s       | Current X velocity. |
| locatorVelocityY                              | float | y      | y      | any       | any       | m/s       | Current Y velocity. |
| lastCollisionTime                             | float | y      | n      | any       | any       | seconds   | Time of last collision (see OnCollision and currentRobotTime). |
| nextRandomInt                                 | int   | y      | y      | -2^31     | 2^31 - 1  | (no unit) | Get next pseudo-random int. Set random number seed. |
| nextRandomFloat                               | float | y      | y      |  0.0      | 1.0       | (no unit) | Get next pseudo-random float. Set random number seed. |
| accelSensorXRight                             | float | y      | n      | -8.0      | 8.0       | Gs        | Accelerometer reading on X axis. |
| accelSensorYForward                           | float | y      | n      | -8.0      | 8.0       | Gs        | Accelerometer reading on Y axis. |
| accelSensorZUp                                | float | y      | n      | -8.0      | 8.0       | Gs        | Accelerometer reading on Z axis. |
| freeFallMaxG                                  | float | y      | y      | any       | any       | Gs        | Total acceleration must be less than this to count as free fall (see OnFreeFall).<br><br>**Note: It is possible to set a max value higher than can be read by the hardware. Ensure that the set value is realistic and falls within accelerometer ranges.**|
| freeFallMinDuration                           | float | y      | y      | any       | any       | seconds   | Total acceleration must be small for at least this time to count as free fall (see OnFreeFall).<br><br>**Note: If you send a negative value, the value will be interpreted as an unsigned integer and saved.**|
| landingMinG                                   | float | y      | y      | -8.0      | 8.0       | Gs        | More total acceleration than this counts as landing (see OnLanding). |
| controlSystemTargetImuYaw                     | float | y      | y      | -180.0    | 180.0     | degrees   | Target yaw for control system in same coordinate system as imuYawAngle. controlSystemTargetImuYaw = imuYawAngle does not rotate the robot. |

## Asynchronous Callbacks
An "asynchronous callback" is a registered function that will be invoked when a certain condition is met. To use a callback you must create a function, then register it on the callback using the address of the function.

```
float invokeMeWhenYouLand() {
	sendAsync(1);
}

OnLanding = &invokeMeWhenYouLand;
...
```
**Note: A callback can only store one function at a time. If you need more, you must implement a multiplexing function.**

| Name         | Description                                                                                                                                                                      |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OnCollision  | Invoked when the accelerometer detects a change violent enough to be a collision specified by the collision parameters. See configureCollisionDetection to set these parameters. |
| OnGyroMax    | Invoked when the limits of the gyroscope are reached.                                                                                                                            |
| OnDisconnect | Invoked when the robot is disconnected from the host device.                                                                                                                     |
| OnConnect    | Invoked when the robot is connected to a host device.                                                                                                                            |
| OnFreeFall   | Invoked when the robot is in free fall as is specified by the free fall parameters. See freeFallMaxG and freeFallMinDuration for parameter information.                          |
| OnLanding    | Invoked when the robot lands after free fall as is specified by the landing parameters. See landingMinG for parameter information.                                               |

## Functions
There are build in functions in the robot to execute some sort of functionality. These are invoked just like any other function that you would define in Oval.

| Return Type | Name                        | Parameters                                                                                   | Description                                                                                                                                                    |
|-------------|-----------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| void        | sendAsync                   | untyped varargs...                                                                           | Sends the values passed by the parameters back to the host device as an asynchronous message.                                                                  |
| void        | setRgbLed                   | float red, float green, float blue                                                           |                                                                                                                                                                |
| void        | setRgbLedUsingPalette       | float hot, float alt, float cold, float palette, float shouldInvertHeat                      | Sets the color of the RGB LED using a palette defined previously.                                                                                              |
| void        | saveCodeLibarary            | int stashId                                                                                  | Saves the current library to the location in flash specified by the stash id.                                                                                  |
| void        | loadCodeLibrary             | int stashId                                                                                  | Loads a block from flash into the code library.                                                                                                                |
| int         | getCodeLibraryHashCode      | int stashId                                                                                  | Gets a CRC32 value of the stash specified by the stashId parameter.                                                                                            |
| void        | configureCollisionDetection | int mode, float xt, float xs, float yt, float ys, float deadTime                             | Configures collision detection based on the parameters:<br>- mode: The collision detection method. 0 is off, 1 is normal.<br>- xt: The x threshold that needs to be surpassed to be considered a collision. 0 disables the contribution for the x axis.<br>- xs: The speed of the x axis that should be taken into account when calculating a collision.<br>- yt: The y threshold that needs to be surpassed to be considered a collision. 0 disables the contribution for the y axis.<br>- ys: The speed of the y axis that should be taken into account when calculating a collision.<br>- deadTime: How long the robot should wait before another event meeting the threshold parameters is counted as a collision. |
| void        | configureScheduler          | int schedulerId, float delay, float startTime, int callbackFuncitonPointer                   | Allows for you to configure a timer that will regularly invoke a function. See Asynchronous Communication With Oval for more information as to how this works. |
| void        | invokeAPI                   | int varargs...                                                                               | "Allows you to invoke an API command using the Oval system. You need to specify the device id, command id, and data for the command in the parameters."        |
| void        | getRgbLedUsingPalette       | float hot, float alt, float cold, float palette, float shouldInvertHeat, int pColorVectorOut | Gets the value of the current RGB LED within the context of the current color palette and places the value in the pColorVectorOut parameter.                   |

## Runtime Error Codes
The error codes that you may encounter when executing Oval code. These are sent to the device using an asynchronous notification.

| Name                         | Value     | Description                                                                                                                                                                                              |
|------------------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ERR_NONE                     | 0x00 (0)  | No error. In a user application this will never be sent from the robot. This is used in the OVM to detect if there is an error to send.                                                                  |
| ERR_DIV_0                    | 0x01 (1)  | Divided by zero. Some execution of code caused the OVM to divide by zero.                                                                                                                                |
| ERR_LABEL_OUT_OF_BOUNDS      | 0x02 (2)  | Attempted to access a label that is not in the label table. This could occur if your compiler and OVM are out of sync and attempts to call a function or global variable that is not defined in the OVM. |
| ERR_INVALID_OP_CODE          | 0x03 (3)  | OVM received an op code that is not recognized. If the op code used was zero, you will receive ERR_BAD_OP_CALLED instead.                                                                                |
| ERR_MEM_ACCESS_OUT_OF_BOUNDS | 0x04 (4)  | Attempted to access ordinary memory out of its bounds. This occurs if an operation attempts to access a stack location outside of the bounds of the stack size.                                          |
| ERR_MEM_MAP_OUT_OF_BOUNDS    | 0x05 (5)  | Attempted to access a memory mapped location that was out of bounds. This occurs if the index of the mapped variable is out of bounds of the OVM memory map size.                                        |
| ERR_INVALID_MEM_MAP_LOCATION | 0x06 (6)  | Attempted to get or set a location on the memory map that was invalid. This can occur by giving the wrong index when specifying a location to the memory map.                                            |
| ERR_BAD_OP_CALLED            | 0x07 (7)  | OVM detected that a blank (zero) op code was used. This is most likely due to generating bad code from the compiler or doing nefarious things with Inline Assembly.                                      |
| ERR_STACK_OVERFLOW           | 0x08 (8)  | Attempted to call push with no space left. This occurs from allocating too much memory on the stack.                                                                                                     |
| ERR_STACK_UNDERFLOW          | 0x09 (9)  | Attempted to pop from an empty stack.                                                                                                                                                                    |
| ERR_READ_FROM_WRITE_ONLY     | 0x0A (10) | Tried to read from a write-only location. For example, attempting to read the red RGB LED value from the redLed built-in property.                                                                       |
| ERR_WRITE_TO_READ_ONLY       | 0x0B (11) | Tried to write to a read-only location. For example, attempting to set the gyrometer pitch value using the gyroSensorPitch built-in property.                                                            |
| ERR_EXEC_OUT_OF_BOUNDS       | 0x0C (12) | Attempted to execute at a memory location that is out of bounds. This can occur if a jump has an out of bounds offset.                                                                                   |
| ERR_STREAM_BUFFER_OVERFLOW   | 0x0D (13) | Attempted to append more data to the circular buffer stream than can fit. This is usually not possible over Bluetooth communications if the OVM is running.                                              | 
| ERR_LIBRARY_OVERFLOW         | 0x0E (14) | Attempted to write a new procedure to the library and ran out of space. This occurs if you send more function definitions than the robot has room for.                                                   |
| ERR_CALL_STACK_OVERFLOW      | 0x0F (15) | Attempted to push a call onto the call stack (by invoking a function) and ran out of call stack space.                                                                                                   |
| ERR_CALL_STACK_UNDERFLOW     | 0x10 (16) | Attempted to return more times than we have function calls. This can occur by invoking a return op code in the global scope.                                                                             |
| ERR_UNBOUND_PROC_END         | 0x11 (17) | The OVM received the procedure end op code without first receiving a procedure start op code.                                                                                                            |
| ERR_CODE_STREAM_OVER_RELEASE | 0x12 (18) | Attempted to release code for garbage collection when that code was already free for collection. This occurs by using the release op code without a corresponding retain op code.                        |



