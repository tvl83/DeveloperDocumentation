---
title: Oval - Interfacing With the Robot
order: 6
section: SPRK - EDU
---

The [OVM](/sprk-edu/oval-oval-virtual-machine) distinguished between robot-specific and robot-independent code. A robot-specific symbol binds names to robot functionality. The robot is able to export built-in "functions" and "variable" names. The functions are translated directly into machine op-codes. The variables are actually properties with behavior determined by hard coded setter and getter functions in the firmware. 

```
controlSystemIsOn = false;
leftMotorPwm = 2000;
float x = 2 * (5 + imuYawAngle);
redLed = 255;
...
```

To see all the Oval built-ins see: [List of Oval Built-ins](/sprk-edu/oval-list-of-oval-built-ins)