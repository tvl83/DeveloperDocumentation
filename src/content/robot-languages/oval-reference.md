---
title: Oval - Reference
order: 8
section: Robot Languages
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

## OVM Op Codes
The op codes used by the OVM to perform operations as well as their Inline Assemby equivalents.

| Name                    | Assembly Literal | Op Code Literal | Description |
|-------------------------|------------------|-----------------|-------------|
| OP_PUSH_LIT             | push             | 0x00 (0)        | Push the next literal in the code. |
| OP_POP_TO               | popto            | 0x01 (1)        | Pop the destination address, pop the value to store, and then store the value in the memory at the address. |
| OP_CAST_INT_TO_FLOAT    | itof             | 0x02 (2)        | Pop one value, cast it to a float, and push the result. |
| OP_PUSH_FROM            | pushfrom         | 0x03 (3)        | Pop the memory address, then push the value from that address. |
| OP_CALL                 | call             | 0x04 (4)        | Pop the jump id and attempt to jump to it. |
| OP_PUSH_LOCAL           | pushloc          | 0x05 (5)        | Pop the local (relative to the frame pointer) address from the stack, then push the value from that address. |
| OP_POP_LOCAL            | poploc           | 0x06 (6)        | Pop the local (relative to the frame pointer) destination address, pop the value to store, and then store the value in the memory at the address. |
| OP_MULTIPLY_FLOAT       | mulf             | 0x07 (7)        | Pop two values, multiply them as float values, and push the result. |
| OP_ADD_FLOAT            | addf             | 0x08 (8)        | Pop two values, add them as float values, and push the result. |
| OP_SUBTRACT_FLOAT       | subf             | 0x09 (9)        | Pop two values, subtract them as float values, and push the result. |
| OP_RELJUMP              | jump             | 0x0A (10)       | Pop the relative jump value, and jump that many instructions relative to the current instruction pointer. |
| OP_RELJUMP_IF           | jumpif           | 0x0B (11)       | Pop the boolean condition, pop the address to jump to, jump to address if the boolean condition is false. |
| OP_RETURN               | return           | 0x0C (12)       | Return from the current execution. |
| OP_COMPARE_FLOAT        | compf            | 0x0D (13)       | Pop two values, compare them, then push a Comparison Code indicating the result. |
| OP_DIVIDE_FLOAT         | divf             | 0x0E (14)       | Pop two values, divide them, then push the result. |
| OP_POW_FLOAT            | powf             | 0x0F (15)       | Pop two values, exponentiate them, then push the result. |
| OP_COS_FLOAT            | cos              | 0x10 (16)       | Pop one value, take the cosine of it, then push the result. |
| OP_SIN_FLOAT            | sin              | 0x11 (17)       | Pop one value, take the sine of it, then push the result. |
| OP_TAN_FLOAT            | tan              | 0x12 (18)       | Pop one value, take the tangent of it, then push the result. |
| OP_ATAN2_FLOAT          | atan2            | 0x13 (19)       | Pop one value, take the ATan2 of it, then push the result. |
| OP_LN_FLOAT             | ln               | 0x14 (20)       | Pop one value, take the natural log of it, then push the result. |
| OP_ADD_INT              | addi             | 0x15 (21)       | Pop two values, add them together as int values, then push the result. |
| OP_SUBTRACT_INT         | subi             | 0x16 (22)       | Pop two values, subtract them as int values, then push the result. |
| OP_MULTIPLY_INT         | muli             | 0x17 (23)       | Pop two values, multiply them as int values, then push the result. |
| OP_DIVIDE_INT           | divi             | 0x18 (24)       | Pop two values, divide them as int values, then push the result. |
| OP_COMPARE_INT          | compi            | 0x19 (25)       | Pop two values, compare them, then push a Comparison Code indicating the result. |
| OP_LOGICAL_NOT          | not              | 0x1A (26)       | Pop one value, then if the value is bitwise zero, push 1.0f, otherwise push 0.0f. |
| OP_LOGICAL_AND          | and              | 0x1B (27)       | Pop two values, performs the logical and operation treating the values as booleans, and pushes the result as 1.0f or 0.0f. |
| OP_LOGICAL_OR           | or               | 0x1C (28)       | Pop two values, performs the logical or operation treating the values as booleans, and pushes the result as 1.0f or 0.0f. |
| OP_CAST_FLOAT_TO_INT    | ftoi             | 0x1D (29)       | Pop one value, cast from float to int, and push the result. |
| OP_YIELD                | yield            | 0x1E (30)       | Yield to the streaming buffer, or back to a function from the buffer. See Yield and Yielding Functions for more information. |
| OP_WAIT                 | wait             | 0x1F (31)       | Relinquish the oval time slice. See Atomic Execution and Wait for more information. |
| OP_RETAIN               | retain           | 0x20 (32)       | Notify the stream to not garbage collect the streamed code until an OP_RELEASE is reached. |
| OP_RELEASE              | release          | 0x21 (33)       | Notify the stream to garbage collect the stream up to the op code. |
| OP_ALLOCATE             | alloc            | 0x22 (34)       | Pop one value and move the stack pointer that many words ahead. |
| OP_PROC                 | proc             | 0x23 (35)       | Denotes the start of a procedure definition. |
| OP_PROC_END             | procend          | 0x24 (36)       | Denotes the end of a procedure definition. Saves the block behind it into the library to be called later. |
| OP_ATOMIC               | atomic           | 0x25 (37)       | Denotes the start of an atomic operation block. See Atomic Execution and Wait for more information. |
| OP_ATOMIC_END           | atomicend        | 0x26 (38)       | Denotes the end of an atomic operation block. See Atomic Execution and Wait for more information. |
| OP_FAIL                 |                  | 0x27 (39)       | Used as a testing op code that indicates a failure in the OVM operation. A user should never see this op code. |
| OP_END                  | end              | 0x28 (40)       | Indicates the end of the code has been reached. This will pause the execution of the OVM. |
| OP_BAD                  |                  | 0x29 (41)       | Blank op codes are translated to this op code during interpretation. This tells the OVM to send ERR_BAD_OP_CALLED. A user should never see this op code. |
| OP_CAST_LOCAL_TO_GLOBAL | ltog             | 0x2A (42)       | Pop one value off of the stack as an address, add the address of the current stack pointer, push the result. |
| OP_COMPRESSED_PROC      | cproc            | 0x2B (43)       | Denotes the start of a compressed procedure. |
| OP_INCLUSIVE_OR         | bitor            | 0x2C (44)       | Pop two values from the stack, perform bitwise inclusive or on the values, and push the result. |
| OP_EXCLUSIVE_OR         | bitxor           | 0x2D (45)       | Pop two values from the stack, perform bitwise exclusive or on the values, and push the result. |
| OP_AND                  | bitand           | 0x2E (46)       | Pop two values from the stack, perform bitwise and on the values, and push the result. |
| OP_LEFT_SHIFT           | lshift           | 0x2F (47)       | Pop the value to shift, pop the amount to shift by, shift the value by the amount to shift by, and push the result.<br><br>Note: This shift performs sign extension on the value. |
| OP_RIGHT_SHIFT          | rshift           | 0x30 (48)       | Pop the value to shift, pop the amount to shift by, shift the value right by the amount to shift by, and push the result. |
| OP_BITWISE_NOT          | bitnot           | 0x31 (49)       | Pop one value, perform bitwise not on the value, and push the result. |

## Comparison Codes
Values returned from performing a comparison operation in Inline Assembly

| Value | Meaning                                            |
|-------|----------------------------------------------------|
| 1     | The first pushed value is greater than the second. |
| 0     | The two values are equal.                          |
| -1    | The first pushed value is less than the second.    |