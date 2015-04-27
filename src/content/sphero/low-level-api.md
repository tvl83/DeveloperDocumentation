---
word: Low-Level API
title: Low-Level API
order: 4
---
# Low-Level API

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

# API Packets

## Packet Structures

### Client Command Packets

Packets are sent from Client → Sphero in the following byte format:

SOP1 | SOP2 | DID | CID | SEQ | DLEN | <data> | CHK
-----|------|-----|-----|-----|------|--------|----

### Description of the fields

       |                      |
-----  | -------------------- | -----------
SOP1   | Start of Packet #1   | Always FFh
SOP2   | Start of Packet #2   | F8 to FFh encoding 4 bits of per-message options (see below)
DID    | Device ID            | The virtual device this packet is intended for
CID    | Command ID           | The command code
SEQ    | Sequence Number      | This client field is echoed in the response for all synchronous commands (and ignored by Sphero when SOP2 has bit 0 clear)
DLEN   | Data Length          | The number of bytes following through the end of the packet
<data> | Data                 | Optional data to accompany the Command
CHK    | Checksum             | The modulo 256 sum of all the bytes from the DID through the end of the data payload, bit inverted (1's complement)

### SOP2 bitfield encoding

bits 7-4  | bit 3   | bit 2   | bit 1           | bit 0
--------- | ------- | ------- | --------------- | -----
1111      | 1       | 1       | Reset timeout   | Answer

* Answer – When set to 1, act upon this command and send a reply.
  When 0, act but do not reply.
* Reset timeout – When set to 1, reset the client inactivity timeout after executing this command.
  When 0, do not reset the timer.

The Answer bit has essentially existed since FW 0.99; the remainder of the bit definitions came into existence with FW 1.26 in late 2012.
￼
## Sphero Response Packets

Commands are acknowledged from Sphero → Client in a similar format:

SOP1  | SOP2   | MRSP   | SEQ   | DLEN   | <data>   | CHK
----- | ------ | ------ | ----- | ------ | -------- | ----

### Description of the fields

       |                      |
-----  | -------------------- | -----------
SOP1   | Start of Packet #1   | Always FFh
SOP2   | Start of Packet #2   | Set to FFh when this is an acknowledgement, FEh when this is an asynchronous message
MRSP   | Message Response    ￼| This is generated by the message decoder of the virtual device (refer to the appropriate appendix for a list of values)
SEQ    | Sequence Number      | Echoed to the client when this is a direct message response (set to 00h when SOP2 = FEh)
DLEN   | Data Length          | The number of bytes following through the end of the packet
<data> | Data                 | Optional data in response to the Command or based on "streaming" data settings
CHK    | Checksum             | Packet checksum (as computed above)

## Few things to note

* Asynchronous (aka "streaming") packets are implemented by changing the value of SOP2 and clearing the Answer bit.
  This can improve responsiveness (and decrease command latency) but through non-guaranteed delivery.
  The packet format is slightly different in the Sphero → Client direction.
* DLEN is always at least 01h since the CHK byte follows.
  In some special cases it is set to FFh to signify a fixed <data> length greater than 254 bytes.
  This is specific to certain DID/CID combinations.
* The SOP1/SOP2 and CHK fields are used to identify correctly formed packets before they're submitted to a DID for processing.
* Here is an example of computing a checksum to transmit a Ping packet.
  The bytes for the packet (with a sequence number of 52h) are: `FFh FFh 00h 01h 52h 01h <chk>`.
  The checksum equals the sum of the underlined bytes (54h) modulo 256 (still 54h) and then bit inverted (ABh).

Commands are grouped into two categories: set and get.
Set commands assign a defined variable in Sphero and include a non-zero data payload that contains the assignment.
Responses are in the most simple form, without a data payload.
Rather than duplicate them all through the document.

Here is the Simple Response to a successful set command:

P1   | SOP2   | MRSP   | SEQ        | DLEN   | CHK
---- | ------ | ------ | ---------- | ------ | -----
FFh  | FFh    | 00h    | <echoed>   | 01h    | <computed>

Get commands request settings, status or the current value of dynamic values.
The formats of these responses are detailed in each CID.

## Sphero Asynchronous Packets

As mentioned previously, the format of asynchronous packets originating from Sphero is slightly different:

There are no MRSP or SEQ bytes, since they don't make sense in this context.
The ID CODE field identifies what type of data is arriving in this packet and as you can see, the DLEN field has been expanded to (clearly) permit payloads exceeding 254 bytes.
The following is a list of the currently defined ID codes and the DID/CID commands that control generation of those packets where applicable.

ID CODE  | Description                                      | Generating DID   | CID
-------- | -------------                                    | ---------------- | ----
01h      | Power notifications                              | 00h              | 21h
02h      | Level 1 Diagnostic response                      | 00h              | 40h
03h      | Sensor data streaming                            | 02h              | 11h
04h      | Config block contents                            | 02h              | 40h
05h      | Pre-sleep warning (10 sec)                       | n/a              | n/a
06h      | Macro markers                                    | n/a              | n/a
07h      | Collision detected                               | 02h              | 12h
08h      | orbBasic PRINT message                           | n/a              | n/a
09h      | orbBasic error message, ASCII                    | n/a              | n/a
0Ah      | orbBasic error message, binary                   | n/a              | n/a
0Bh      | Self Level Result                                | 02h              | 09h
0Ch      | Gyro axis limit exceeded (FW ver 3.10 and later) | n/a              | n/a
0Dh      | Sphero's soul data                               | 02h              | 43h
0Eh      | Level up notification                            | n/a              | n/a
0Fh      | Shield damage notification                       | n/a              | n/a
10h      | XP update notification                           | n/a              | n/a
11h      | Boost update notification                        | n/a              | n/a

Power notification (01h) details are included with “Set Power Notification”.

Level 1 diagnostic response details are included with “Perform Level 1 Diagnostics”.

Sensor data streaming details are included with “Set Data Streaming”.

Config block contents details are included with “Get Configuration Block”.

The Pre-Sleep warning is sent once, 10 seconds prior to Sphero entering sleep due to client inactivity.
Macro markers come from special macro commands and optionally at the end of a macro.

Collision detection messages are based on the accelerometer, measured speed, etc.

The orbBasic PRINT ID 08h is akin to STDOUT, 09h to STDERR and 0Ah a machine readable version of STDERR.

Self Level Result is sent after the self level routine completes, but only if the routine was initiated by an API call.

The Gyro Axis Limit Exceeded message contains one byte of data where the bits signify the axes that exceeded the limit: bit 0 = X positive, bit 1 = X negative, bit 2 = Y+, bit 3 = Y-, bit 4 = Z+ and bit 5 = Z-.
The message is emitted when one threshold is exceeded and all of the max measurements are cleared upon receipt of a Set Heading API command (DID 02h, CID 01h).

The level up notification contains two 16-bit unsigned integers.
The first is the new robot level.
The second is the total number of attribute points the user has to spend.

The Shield damage notification contains one unsigned byte representing the portion of shield left (out of 255).
The shields are damaged when Sphero collides with other objects.
The shields are regenerate automatically over time.
Both collisions and regeneration generate asynchronous updates.

The XP update notification contains one byte representing how much experience Sphero has gained toward the next robot level.
The scale is from 0=0% to 255=100%.

The boost update notification contains one byte representing how much boost capability Sphero has.
The value goes down when boost is used and automatically regenerates over time.
Regeneration and use both generate asynchronous updates.
The scale is from 0=0% to 255=100%.

## Data Packing

Multi-byte numbers are sent MSB first in both directions.
Here are two examples of how the data looks "on the wire."

22h     | 78h      | 00h   | 41h
------- | -------- | ----- | -------
byte 0  |          |       | byte 3

= 22780041h (unsigned 32-bit integer)

40h     | 49h      | 0Fh   | DBh
------- | -------- | ----- | -------
byte 0  |          |       | byte 3

= 3.1415927 (single precision IEEE-754)

# Macros

## Introduction

Beginning in August 2011, firmware builds of the Sphero Main Application contained a facility to execute macros, which are sequences of commands that perform actions locally on Sphero without additional client interaction.
This system was intended as a way to automate and accurately reproduce actions and behaviors, with both high and low client interaction.

The Sphero macro system consists of the Executive which interprets the commands and performs the actions and the macros themselves which are linear sequences – more or less a "to-do" list.
The Sphero macro system was never intended to be able to evaluate equations or make decisions, as those features are better supported in orbBasic.
However they were expected to be called from orbBasic and to run in parallel as rote sequencing is a poor use of a full-blown programming language.
As it is, I think you'll find macros to be a very powerful feature for games, apps and testing.

This document covers the format and behavior of the First Generation Executive (versioned as 2-4).
I learned a lot from building this and seeing how our smartphone programmers used it, so major deficiencies and upgrades will be reflected in the next generation product.

## Macro Format

Ultimately a macro is a linear string of bytes that is processed from beginning to end.
There is no concept of jumping around in a macro (though the commands goto and gosub are implemented between macros).
Symbols in all caps like MAC_END replace the underlying numerical codes that the Executive uses.

Here is the general form of a macro, with the elements explained over the next sections.

    ID | Flags | ExtFlags | CMD | CMD | CMD | etc. | END

### Macro IDs

This single byte is the identifier that is passed to external commands like Execute and Kill, internal commands like goto and gosub, and included in asynchronous marker messages sent to the client.
The 256 ID possibilities are broken down as follows:

* 0 -  Signals that no macro is currently executing so its use is illegal.
* 1-31  - System macros that are compiled in to the Main App for normal use. You can also call these externally under certain circumstances – some may have unexpected side effects!
* 32-253 -  User macros that are stored persistently in Flash for reuse during a single power-up session. The index table is held in RAM so they are lost once Sphero goes to sleep. These are useful for games and apps that may want to call 1 of 15 different macros on the fly without paying the latency of a temporary download.
* 254 - Stream macro – explained below
* 255 - Temporary macro – also explained below

### User Macros

The V2 Executive maintains a block in Flash called the macro heap, indexed by an external RAM table.
The heap is 2K in size and the indexing table supports 16 entries.
Adding a user macro will fail if either the heap or the index is full.
Since there is no provision to delete any single macro from the heap the only recourse is to reset both by reinitializing the Executive.

### The Temporary Macro

This is a quick and dirty way for a client to execute a macro as it's stored in a RAM buffer and sending it also implies that you want to immediately run it.
You don't need to kill the temporary macro if you send another one, the system handles that seamlessly for you.
This permits lengthy behaviors to be sent as a temporary macro and then to be repurposed on the fly by sending a new temporary macro to replace it on the fly.

### The Stream Macro

Since macros need to fit within the data payload space of our standard API commands, their length is limited to 254 bytes (255 is the maximum for the data length field and one byte is reserved for the packet checksum).
That might seem like plenty of space but if you're sending a lot of drive and RGB LED commands, it goes quickly.
Thus the creation of stream macro support.

The stream macro buffer is a full 1K bytes and has the ability to execute those of unlimited length by repeatedly accepting additional chunks.
If there is space in the buffer, the new chunk is appended.
If not, the remaining live command stream is shifted down to make as much room as possible to append the new chunk.
If there still isn't enough room, an error code is returned which essentially means "try again in a little while."

Stream macros use the same RAM buffer as the temporary macro so executing one terminates the other.
Every chunk of a stream macro that is sent is automatically terminated with a MACSTREAMPAUSE command in case a new chunk doesn't arrive before the macro ends.
When a stream macro is active, the MACEND command is ignored; send it if you wish.
You can terminate a stream macro with the special MACSTREAM_END command.
Or you can kill it.

The byte format of a stream macro is exactly the same as all of the rest ID byte, flag(s), commands, and optionally an end.
The flags in chunks 2..N are ignored however.

An unobvious behavior of starting a stream macro is that until the MACSTREAMEND command is encountered, the macro is still considered "running" even if it is out of commands to process.
If the MF_STEALTH flag isn't set, this will have the effect of preventing Sphero from automatically going to sleep after the client inactivity time is met.

### Flags

The flags byte is a bitfield that turns on or off certain useful behaviors.
These flags are modal only to the macro being executed.
This means gosub overrides the flags of the caller (temporarily) and goto overrides them permanently.

Bit  | Hex value   | Symbolic Name      | Description
---- | ----------- | ------------------ | --------
0    | 01h         | MF_MOTOR_CONTROL   | Kills the drive motors automatically on exit or abort. If the stabilization system is enabled, this executes a "stop roll" command, otherwise zero PWMs are sent to the motor drivers.
1    | 02h         | MF_EXLUSIVE_DRV    | Gives the macro exclusive control of driving, excluding commands from the Bluetooth client and orbBasic.
2    | 04h         | MF_ALLOW_SOD       | Allow Stop on Disconnected behavior if a macro is running; normally macros are immune to this
3    | 08h         | MF_INH_IF_CONN     | Inhibit execution of this macro if a smartphone client is connected.
4    | 10h         | MF_ENDSIG          | Emit a macro marker with parameter 00h when the end of the macro is reached.
5    | 20h         | MF_STEALTH         | Macro execution does NOT reset the client inactivity (sleep) timer.
6    | 40h         | MF_UNKILLABLE      | This macro cannot be aborted (killed). This is only valid for system macros and ignored for all other macro ID types.
7    | 80h         | MF_EXT_FLAGS       | The extended flags byte is present and follows this one. (I ran out of bits in this flag, so there is an extended one.)

### Extended Flags

More bits for cool behaviors.
None of the bits are currently assigned.

Bit  | Hex value   | Symbolic Name   | Description
---- | ----------- | --------------- | ------------
all  | n/a         | n/a             | Unassigned

## Commands

These are the meat of the macro system and although each is explained in detail below, a few basic concepts are important to know.

* The V2 macro executive works on a 1 millisecond granularity.
  All times are measured in ms.
  Depending on how things play out, I may move this to a 10 ms granularity in the next version of the executive to save CPU time.

* Macros run in parallel with everything else in the system and as such, are non-blocking.
  Some macro commands even run in parallel with each other!

* Most macro commands have parameters and are followed by a post-command delay (PCD) byte.
  But not all.

* There is a concept of two modal system delays, SD1 and SD2.
  These are 16-bit times in milliseconds that special versions of certain commands can inherit.
  This saves space by omitting the explicit PCD byte, increases delays to over 255 ms, and also offers a flexibility where the timing of an entire macro can be changed in one place.

* There are two modal system speeds, SPD1 and SPD2 that apply to special versions of the roll command.

* There is a SystemLoops variable that is accessed by Loop Start System; it behaves exactly like usual LoopStart but the number of loops must be set via API call (see below).

* In addition to setting SD1, SD2, SPD2 and SPD2 in the macro itself, these four system modals plus SystemLoops can be set via API call (DID 02h, CID 57h).
  Refer to the Sphero API document for complete documentation.
  Note that this API call can be made while the macro is executing; the altered parameters will be reflected in the next command that inherits one of the values.

## Tips and Tricks

* Put a Gosub command at the end of your macro and Gosub yourself.
  It will have the ultimate effect of running your macro to the depth of the call stack + 1 before exiting, which would currently be twice.

* Consider implementing an often-used motion in a game using the system variables and place it in a User macro ID.
  Then form a Temp macro that assigns these settings and uses Goto to chain to the User macro.
  You can easily scale the motion in both space and time.

# OrbBasic

## Introduction

Back in April 2011 when I was laying out the memory map of Sphero, co-founder Adam Wilson asked me to set aside some sort of "overlay area" in which temporary routines could be dynamically dropped in for execution.
I considered various options and weighed their risk against implementation in a sealed robot.
Eventually I pulled out my old copy of Microsoft Basic Decoded book to take a look at how Bill Gates had written his BASIC language on the 8-bit TRS-80.

After a weekend of review and a lot of coffee, I settled on using Adam Dunkel's source code for Basic and bolted it into Sphero.
It worked!
I mothballed the project until the remainder of the Sphero firmware was well underway and stable, then in February 2012 I began reworking the Basic code into what I call orbBasic, a stand-alone Basic interpreter suitable for Sphero.

I fixed a number of inherent bugs, extended the language greatly by adding new intrinsic variables, operators and verbs while optimizing the tokenizer, verb dispatcher and adding a line number cache.

orbBasic, like the macro executive, is another powerful resource that Sphero provides for autonomous behavior and integration with smart phone applications.
It runs as another thread in the main system in parallel with driving and macros.

With execution rates of well over 3000 lines/second and support for both a helper program (resident in RAM) and a permanent one (resident in Flash), orbBasic adds an entirely new dimension to gaming and apps.
It is the ultimate helper app.

This document covers the first generation interpreter and its minor revisions.
Although I refer to tokens, the program stream itself is not tokenized and still resides as ASCII in the execution area.
If the demand for orbBasic takes off and we need more power – or to store longer programs – then I will implement a second generation interpreter that operates on a tokenized stream: Level II orbBasic.
My guess is this would more than double the execution speed from 9,000 lines/sec to 18,000.

March 16, 2012 Boulder, CO

## Program Format

Ultimately an orbBasic program is a sequence of program lines ending with a NULL (00h) character.

    <program> := <line(s)> <NULL>

Each line begins with a line number, some whitespace, a program statement and a terminating LF (10h) character:

    <line> := <line number> <space(s)> <statement> <LF>

The interpreter is given a starting line number when invoked as programs do not need to start from the first line in the program.
Once the statement on a line is complete, execution continues at the next line in the program stream which may not actually be the next line numerically in the program.
Although this is a side effect of a less than well-formed program, it is entirely legal.
Good practice is to send down programs where the line numbers are in ascending order.

Statements are covered in detail below but currently only one statement per line is supported.
A future enhancement to the interpreter will be to add the colon ":" token which separates multiple statements on a line.

## Specification and Limitations

As of version 0.9

Constraint                       | Value
-----------                      | -------
Program size, RAM                | 1K
Program size, Flash              | 4K
User variables, direct access    | 25
User variables, indexed access   | 25
User data, sequentially accessed | 25
Variable data type               | 32-bit signed integer
Maximum For..Next nesting depth  | 4
Maximum Gosub nesting depth      | 4
Maximum expression complexity    | 4 levels
Print string length              | ￼￼32 bytes

## Known Issues

As of version 0.9

* There is no handling of negative literal numbers, like "A = -9".
  The workaround is to form an expression, "A = 0 - 9".
* There is no support for an "input" statement.
  I'm working on how best to abstract this.
* You can send down programs with unsorted line numbers and it will run top to bottom.
  But I don't recommend this.
* There is no support for REM; it would burn up important program space anyway.
  Just write self-documenting code and you'll be fine.
* I suggest coding simple expressions until orbBasic 1.4 is released.
  It's still easy to blow up.

## Errors Reference

Since orbBasic isn't tokenized during download both syntactic and runtime errors can occur.
ASCII versions are sent via asynchronous message ID 09h in the format:

Line xx: <error message><LF>

or as a 4-byte binary message through ID 0Ah in the format:

Line #  | Line #   | Error #   | Error #
------- | -------- | --------- | --------
<msb>   | <lsb>    | <msb>     | <lsb>

The following error messages are currently defined:

Error Message          | Code   | Description
--------------         | ------ | ------------
Syntax error           | 01h    | This is somewhat of a catch all, indicating something unexpected was encountered during interpretation of a statement or expression(versus during execution of the said element).
Unknown statement      | 02h    | An unknown keyword was encountered, perhaps due to a capitalization error (i.e. "rgb" was entered instead of "RGB").
GOSUB depth exceeded   | 03h    | Too many nested gosub statements were encountered.
RETURN without GOSUB   | 04h    | A return statement was encountered but there was no previous gosub command that matched it.
NEXT without FOR       | 05h    | A next statement couldn't be matched with an appropriate for.
FOR depth exceeded     | 06h    | Too many nested for statements.
Bad STEP value         | 07h    | This really only comes up if the step value in a for...next statement is evaluated to zero. You're never going to get from A to B if the step is zero.
Divide by zero         | 08h    | Bad math.
Bad line number        | 09h    | The target of a goto or gosub wasn't found.
Illegal index          | 0Ah    | Either the value of Y is outside the boundary of 1..25 when dereferencing the Z variable or there aren't enough target line numbers in an indexed goto/gosub.
Expression too complex | 0Bh    | The expression evaluator is recursive and it must be bounded for safety. To get around this error either use fewer levels of parenthesis or break up the expression across a few lines.
Bad numeric parameter  | 0Ch    | This is like the Illegal index error but when a parameter would like to be used as something non-indexing (like for the rnd() function)
User abort             | 0Dh    | This isn't really an error message but an alert if an abort command terminated execution.
Out of data            | 0Eh    | The sequential data set wasn't large enough for the number of reads performed upon it.


# White List Approval

## Introduction

The Sphero white list approval process was created to manage the external submissions in relation to the Apple App Store.
Orbotix must approve the app before it may be published to the App Store.
While the Google Play Store and Amazon Marketplace do not have a whitelist approval process for release to their stores, we at Orbotix request that third party app submissions go through us at the very minimum as a “courtesy” to us.
Even though Orbotix might not produce the app, it may still reflect poorly on the Sphero brand.
External developers who adhere to the extension of this “courtesy” to us likewise, may expect the same level of courtesy from Orbotix to them in the form of QA analysis of the app, feedback on the gameplay, and advice and assistance from our development team.

## Guidelines

There are two primary areas that our whitelist evaluation focuses on primarily.

App Store Review Guidelines, which are areas that Apple reviews when an App is submitted.
If it is an area that Apple would likely fail an App for developers can count on us failing it or at the very least, raising a concern to the developer before submission.
Like any assessment process there are shades of grey however, we look at the most logical offenses, bad or defaming language, controversial subject matter, or other areas that are specifically cited violations to App Store guidelines.

The second area is in relation to items that affect our branding, product reputation, or company reputation.
Most of these test case steps will look for anything that might cause a customer to believe there is a problem with their Sphero.
This includes not disconnecting properly (one of our number one failure cases), improper use of the company logos, distorting logos, and improperly or unsafely using a Sphero in a manner that could harm a person, pet, or property.

## The Process

Once an app is ready for submission and testing, the developers will begin interacting with the Quality Assurance department at Orbotix Inc.
Most of this communication is handled by email.

For iOS apps, the developer is usually requested to submit an IPA build to a free hosting service such as Test Flight or Hockey App.
The QA department will provide a small list of UUID’s for devices that they test on.
Usually, and iPhone 4s and iPad3 are sufficient, but in rare cases Orbotix might request additional devices for more complex apps or the release of an app “scheduled out” in the future with Apple such that download codes can be issued for additional testing.

Android apps are generally simpler.
The developer may upload the APK file to Spheroverse, or simply email the APK file to the QA contact as long as under 25MB.
If larger, a hosting service such as Hockey App or sharing via a DropBox folder might be necessary.

The QA department will review the app against the whitelist checklist criterion.
A report will be sent to the external developer once testing is complete.

**Note**: Depending on the number of apps in process, internal developments, and seasonal business spikes, a developer may get a response the same day, or in some rare cases it might take a week or two to get the app scheduled into the test plan.
In either case, a communication will be sent to the external developer to let them know what is happening.

The report sent to the developer will include all pass and failed items or items that require more information.
When possible, the QA department will provide crash logs, screenshots with redlines, or any other steps to reproduce to aid the developer in identifying the problem area.

As a courtesy, the QA department will also offer feedback on the Quality of the app such as graphical UI, sound fx, music, clarity of instructions, suggestions on game play, use case assessments for UI issues, etc.
In the majority of cases, these items are “suggestive” in nature and often are not showstoppers for a release but are items that if improved, would result in a higher quality app or game.
In contests, contestants that acted on this advice have seen greater consideration in placement in the final awards and higher awards for their efforts.
Likewise, Orbotix is more likely to promote an app of higher quality than an app that demonstrates the bare minimum in functionality.

Contest rules, deadlines, and prize awards are all handled by the Developer Relations Department.
The quality of the app submitted plays a significant factor in that department’s review of an app submission.
However, questions regarding such contests should be directed to that department.
QA only aids in assessing if the app is ready for release to the appropriate platform stores.
