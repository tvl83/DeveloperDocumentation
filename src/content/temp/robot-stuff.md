# Bluetooth API

## Introduction

![Bluetooth diagram](https://s3.amazonaws.com/ksr/assets/000/813/645/c74cae08dca728aac50b621eb363baf0_large.jpg?1375950346)

Welcome to the wide world of robot control over Bluetooth.
What follows is a description of our lightweight command and control protocol which you can use to build up applications offering a higher level of functionality.
But before we expose you to all the gory details there are some concepts and limitations you'll need to become familiar with.

## Expectations

This documemntation doesn't expect you to be a nuclear genius but some familiarity with programming and data communications will help.
It also expects you to be able to move between decimal and hexadecimal numbering bases seamlessly, though numbers in the latter have an 'h' suffix for clarity.

## Bluetooth

You've heard about this for years (mostly with hands-free headsets) but what is it?
In short, it's a low- cost, easily configurable data radio link that smartphones natively support (along with some desktops).

Bluetooth implements what is called a stream interface – that is, data is sent and received in a constant stream of bytes.
This is in contrast to a packetized data format which Ethernet, Wi-Fi and other communications protocols implement.

One advantage to a stream interface is its simplicity: just open the port and start sending data.
The disadvantage is in synchronizing the two ends of the link.
Without an inherent packet structure, you may suddenly be listening in on the middle of a transaction and the data won't make any sense.

So, some extra effort must be placed in constructing a packet framework that has a resilient boundary sequence and detection method.
More on that later.

## Client/Server

This relationship describes the order of information movement between your app and Sphero.

![sphero client](http://winblog.blob.core.windows.net/win/sites/2/2014/06/wp_5F00_ss_5F00_20140602_5F00_0002_5F00_thumb_5F00_7FF3BE8D.png)

In 95% of all cases your app is the initiator (the client) and Sphero acts on the command (as a server).
This is also known as synchronous communication and other than for a special mode Sphero can be placed in, he never asynchronously sends data back to the client (that is, without being specifically asked).

## Virtual Devices

Sphero is an actual device (obviously) but in his core software, many virtual devices are implemented.
This makes the separation of tasks more clear:

- the control system accepts direction and speed commands
- the Bootloader device handles firmware downloads
- the orbBasic device manages downloaded user programs
- etc

# Sphero Overview

Before you can start talking to Sphero, you should probably know the extents of what he can offer.
At the most basic level he's electronically a collection of raw inputs and outputs.

## Raw Inputs

![axis]({{assets}}/images/motor-axis.png)
![accelerometer]({{assets}}/images/accelerometer.png)

* Three axis rotation rate gyro
* Three axis accelerometer
* Approximate ground speed
* Data from radio link
* Battery voltage

## Raw Outputs

![led](http://2nfex6k1mez4cl96p1r5a3u8mt.wpengine.netdna-cdn.com/wp-content/uploads/2012/01/sphero2.jpg)

* Power to left and right drive wheels
* RGB LED color value
* Back LED intensity
* Data to radio link

Internal software builds up more useful data constructs from these raw hardware I/Os: heading control systems, distance measurement, data integrators/differentiators and more.

You'll be surprised at what you can do if you tie these basic elements together with some cleverness.

# Collision Detection

Sphero collision detection is a firmware feature that generates a collision async message when an impact is detected.
The detection criteria is based on threshold parameters set via the phone.

## Detection Features

The collision detection feature detects impacts on the X and Y axis of Sphero.

The Y axis runs through the forward/backward line of Sphero.
The X axis runs from side to side.
The Z axis run up and down, but is not a factor in the current FW implementation.

This feature detects collisions by measuring the accelerometer values and calculating the power (energy) of the signal in real time.
When the power exceeds a threshold value, a collision is reported.

NB: This feature relies on the default accelerometer range setting of ±8Gs; if altered to one of the other settings this feature will exhibit indeterminate results.

## Detection Thresholds

The X and Y axis impact thresholds are controlled independently.
Each axis has two threshold values, based on the speed of the ball.

Xt is the threshold for the X axis at a speed of zero.
The Xspd setting is added to Xt and becomes the threshold at the maximum speed.

![Collision detection graph]({{assets}}/images/collision.png)

## Enabling Collision Detection

The feature is enabled via the Configure Collision Detection (12h) API command.

The Method field should be set to non-zero, and the X and Y axis impact thresholds should be set.
Typical values are in the 100-140 range.

The Deadtime value should be set to a typical value of around 1 second (a value of 100).

## Reporting

An impact is reported via an asynchronous API message to the phone.

The impact report contains data expressed in two different methodologies.

First, the actual power impact value is given in xMagnitude and yMagnitude.
These values are the power that was detected in the impact and were compared to the threshold to determine a reportable collision.
The Axis field indicates which (or both) axis crossed the threshold and is being reported.

Second are the impact values read from the accelerometer at the highest peak of impact.
X and Y are the "flattened" values given by the accelerometer, and are calculated by removing the Z axis influence.
In other words, they represent impact values only on the plane of the surface that Sphero is running on.
X and Y have both positive and negative values.

Positive values are based on the front (Y) and right (X) side of the ball.
The Z reported value is always zero.
The speed of the ball at the time of the reported impact is given by the Speed output.

The Timestamp can be used to synchronize collisions in a multi-ball scenario.

## Interpreting the Reported values

An example of a front impact against a still ball is:

    X = 1450, Y = 5018, Z = 0, Axis = Y,
    xMagnitude = 43, yMagnitude = 146,
    Speed = 0. TimeStamp = Days:0, Hours:0,
    Minutes:4, Seconds:58, Milliseconds:186

The X and Y values show a front impact.
The X value is non-zero due to the coupling of the sensor axis in the package.
All hard impacts affect both axis due to the sensor mechanics.

The power magnitudes indicate a significant higher value for the Y axis and is a good indicator of where the impact occurred.

An example of a right impact against a still ball is:

    X = 4322, Y = -1015, Z = 0, Axis = X,
    xMagnitude = 130, yMagnitude = 75,
    Speed = 0, TimeStamp = Days:0, Hours:0,
    Minutes:12, Seconds:40, Milliseconds:443

The X and Y values show a right side impact.

An example of a front impact of a driving ball against a wall is:

    X = 2220, Y = 6100, Z = 0, Axis = Y,
    xMagnitude = 80, yMagnitude = 215,
    Speed = 106, TimeStamp = Days:0, Hours:0,
    Minutes:18, Seconds:46, Milliseconds:763

# Roll Command Parameters

The roll command takes three parameters: heading, speed and a state variable (internally referred to as the "go" value).
The heading parameter is self explanatory and always acted upon by the control system but the other two bear additional explanation.

As of the 1.13 Sphero firmware their relationship is as follows:

Go | Speed | Result
---|-------|-------
1  | >0    | Normal driving
1  | 0     | Rotate in place for setting heading if speed is very small. (If sent when Sphero is driving then it plugs the pitch controller for a far too aggressive stop. This should be avoided.)
2  | X     | Force fast rotation to this heading independent of speed.
0  | X     | Commence optimal braking to zero speed

Note that beginning in the 1.16 firmware, there are two different rotation speeds employed when acting upon the heading parameter.
The first is the value set with the Set Rotation Rate command in the Sphero DID and is used for normal driving.
The second is a much faster rate used to improve performance while rotating in place and setting the heading.
It defaults to 1,000 degrees sec but can be accessed through the shell commands hss and hgs.

Beginning in the 1.21 firmware the "go" parameter will also act on a value of 2 to override the speed- dependent nature of fast turning.

#
