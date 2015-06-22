---
title: Macros
order: 2
section: Robot Languages
---

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


