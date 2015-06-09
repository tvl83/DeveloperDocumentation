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
*If you invoke a getter that does not exist you will get OVM error [ERR_READ_FROM_WRITE_ONLY](/sprk-edu/oval-ovm-runtime-error-codes#ERR_READ_FROM_WRITE_ONLY).*<br>
*If you invoke a setter that does not exist you will get OVM error [ERR_WRITE_TO_READ_ONLY](/sprk-edu/oval-ovm-runtime-error-codes#ERR_WRITE_TO_READ_ONLY).*

| Name | Type | Getter | Setter | Min Value | Max Value | Units | Description |
|------|------|--------|--------|-----------|-----------|-------|-------------|                                                                                                                                                	
| redLed<a name="redLed"></a> | float | | | 0.0 | 256.0 | | Sets the value of the red component of the RGB LED |
| greenLed | float | | | 0.0 | 256.0 | | Sets the value of the green component of the RGB LED |
| blueLed | float | | |  0.0 |  256.0.0 | | Sets the value of the blue component of the RGB LED. |
| imuPitchAngle | float | | | -180.0 |  180.0 | degrees | Gets the value of the pitch angle from the IMU. |
| imuRollAngle | float | | | -90.0 |  90.0 | degrees | Gets the value of the roll angle from the IMU. |
| imuYawAngle<a name="imuYawAngle"></a>| float | | | -180.0 |  180.0 | degrees | Gets the value of the yaw angle from the IMU. |
| controlSystemIsOn | int   | | | 0 | 1               | bool      | Returns 1 if the control system is on, 0 if it is not. |
| leftMotorPwm | float | | | -4095.0 |  4095.0 | | Get or set the pwm of the left motor. |
| rightMotorPwm | float | | | -4095.0 |  4095.0 | | Get or set the pwm of the right motor. |
| verticalAcceleration | float | | | -8.0 |  8.0 | Gs | Gets the current vertical acceleration. Note: Should be ~1G when stationary.** |
| controlSystemTargetYaw<a name="controlSystemTargetYaw"></a>| float | | | any | any | degrees | Get or set the target yaw for the control system. This will have no effect if the control system is off.<br><br>**Note: in a different coordinate systesm than imuYawAngle (see controlSystemTargetImuYaw).** |
| controlSystemTargetSpeed                                    | float | | | robot dependent | robot dependent | m/s       | Get or set the target speed for the control system. This will have no effect if the control system is off |
| currentRobotTime<a name="currentRobotTime"></a>| float | | | any | any | seconds | Get or set the robot time.<br><br>**Note: If you send a negative value, the value will be interpreted as an unsigned integer and saved.** |
| controlSystemPitchPGain | float | | | any | any | (no unit) | Proportional gain of pitch controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemPitchIGain | float | | | any | any | (no unit) | Integral gain of pitch controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemPitchDGain | float | | | any | any | (no unit) | Derivative gain of pitch controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemYawPGain | float | | | any | any | (no unit) | Proportional gain of yaw controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** | 
| controlSystemYawIGain | float | | | any | any | (no unit) | Integral gain of yaw controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemYawDGain | float | | | any | any | (no unit) | Derivative gain of yaw controller.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemTorqueMinSensitiveRegion | float | | | any | any | (no unit) | Internal control system parameter.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemTorqueMaxSensitiveRegion | float | | | any | any | (no unit) | Internal control system parameter.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemMinRotationRate | float | | | any | any | deg/s | Internal control system parameter.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemMaxRotationRate | float | | | any | any | deg/s | Internal control system parameter.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| controlSystemMaxYawErrorWhileDrivingFullSpeed | float | | | any | any | degrees | Internal control system parameter.<br><br>**WARNING: Changing this value can break the way your robot to drives. Ensure that you back up the value before changing it.** |
| gyroSensorPitch | float | | | any | any | deg/s | Rotation rate around pitch axis. |
| gyroSensorRoll | float | | | any | any | deg/s | Rotation rate around roll axis. |
| gyroSensorYaw | float | | | any | any | deg/s | Rotation rate around yaw axis. |
| wheelSlipRate | float | | | 0.0 | any | (no unit) | Estimate of how much wheels are slipping. |
| controlSystemIsInverted | int   | | | 0 | 1 | bool | Drive upside down. |
| backLed | float | | |  0.0 |  256.0 | (no unit) | Brightness of back LED light. |
| shouldOverrideSupercontrollerTargetPitch | int   | | | 0 | 1 | bool | When true disable speed controller and use supercontrollerPitchOverride as target pitch. |
| supercontrollerTargetPitchOverride | float | | | any | any | degrees | Desired pitch angle in lieu of speed controller (see shouldOverrideSupercontrollerTargetPitch). |
| locatorPositionX | float | | | any | any | meters | X coordinate of current position on floor. |
| locatorPositionY | float | | | any | any | meters | Y coordinate of current position on floor. |
| locatorVelocityX | float | | | any | any | m/s | Current X velocity. |
| locatorVelocityY | float | | | any | any | m/s | Current Y velocity. |
| lastCollisionTime | float | | | any | any | seconds | Time of last collision (see OnCollision and currentRobotTime). |
| nextRandomInt | int   | | | -2^31 | 2^31 - 1 | (no unit) | Get next pseudo-random int. Set random number seed. |
| nextRandomFloat | float | | |  0.0 |  1.0 | (no unit) | Get next pseudo-random float. Set random number seed. |
| accelSensorXRight | float | | | -8.0 |  8.0 | Gs | Accelerometer reading on X axis. |
| accelSensorYForward | float | | | -8.0 |  8.0 | Gs | Accelerometer reading on Y axis. |
| accelSensorZUp | float | | | -8.0 |  8.0 | Gs | Accelerometer reading on Z axis. |
| freeFallMaxG | float | | | any | any | Gs | Total acceleration must be less than this to count as free fall (see OnFreeFall).<br><br>**Note: It is possible to set a max value higher than can be read by the hardware. Ensure that the set value is realistic and falls within accelerometer ranges.**|
| freeFallMinDuration | float | | | any | any | seconds | Total acceleration must be small for at least this time to count as free fall (see OnFreeFall).<br><br>**Note: If you send a negative value, the value will be interpreted as an unsigned integer and saved.**|
| landingMinG | float | | | -8.0 |  8.0 | Gs | More total acceleration than this counts as landing (see OnLanding). |
| controlSystemTargetImuYaw | float | | | -180.0 |  180.0 | degrees | Target yaw for control system in same coordinate system as imuYawAngle. controlSystemTargetImuYaw = imuYawAngle does not rotate the robot. |

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

| Return Type | Name | Parameters | Description |
|-|-|-|-|
| void | sendAsync | untyped varargs... | Sends the values passed by the parameters back to the host device as an asynchronous message. |
| void | setRgbLed | float red, float green, float blue | Sets the color of the RGB LED on the robot to the values specified by the parameters. |
| void | setRgbLedUsingPalette | float hot, float alt, float cold, float palette, float shouldInvertHeat | Sets the color of the RGB LED using a palette defined previously.|
| void | saveCodeLibarary | int stashId | Saves the current library to the location in flash specified by the stash id. |
| void | loadCodeLibrary | int stashId | Loads a block from flash into the code library. |
| int | getCodeLibraryHashCode | int stashId | Gets a CRC32 value of the stash specified by the stashId parameter. |
| void | configureCollisionDetection | int mode, float xt, float xs, float yt, float ys, float deadTime | Configures collision detection based on the parameters:<br>"mode: The collision detection method. 0 is off, 1 is normal."<br>xt: The x threshold that needs to be surpassed to be considered a collision. 0 disables the contribution for the x axis.<br>xs: The speed of the x axis that should be taken into account when calculating a collision.<br>yt: The y threshold that needs to be surpassed to be considered a collision. 0 disables the contribution for the y axis.<br>ys: The speed of the y axis that should be taken into account when calculating a collision.<br>deadTime: How long the robot should wait before another event meeting the threshold parameters is counted as a collision. |
| void | configureScheduler | int schedulerId, float delay, float startTime, int callbackFuncitonPointer | Allows for you to configure a timer that will regularly invoke a function. See Asynchronous Communication With Oval for more information as to how this works. |
| void | invokeAPI | int varargs... | "Allows you to invoke an API command using the Oval system. You need to specify the device id, command id, and data for the command in the parameters." |
| void | getRgbLedUsingPalette | float hot, float alt, float cold, float palette, float shouldInvertHeat, int pColorVectorOut | Gets the value of the current RGB LED within the context of the current color palette and places the value in the pColorVectorOut parameter. |

## Runtime Error Codes