---
title: Oval - Concepts
order: 7
section: SPRK - EDU
subsections:
 - Yield
 - Atomic Execution
 - Wait
---

## Yield
### Motivating Example
### How it works
### Rules
### Breaking Infinite Loops
### Start & Stop Multiple Yield Functions

## Atomic Execution
An Oval programmer has no direct control over how much CPU time is given to the OVM. As a result, some seemingly innocuous tasks can behave strangely. Suppose you set the LED to white using the ```setBrightness``` function defined in Yield.  This function sets the red, green, and blue LEDs one at a time. If these instructions do not happen in rapid succession it is possible that the user will be able to briefly see saturated red or yellow before all the assignments are complete. This could happen if the OVM's time slice ends in the middle of the call to ```setBrightness```.
### Keyword 'atomic'

The ```atomic``` keyword requests that the robot fit a sequence of operations into the same time slice. A better implementation of ```setBrightness``` looks like this.

```
void setBrightness(float x) {
    atomic {
        redLed = x;
        greenLed = x;
        blueLed = x;
    }
}
```

Now the OVM will execute the entire atomic block at once (within reason). Another feature of an atomic block is that the OVM will wait until the end of the atomic block has been loaded to begin executing it. Otherwise it will obviously be able to deliver contiguous execution.

#### Limitations
There is a limit to the total number of instructions the OVM will execute in a given time slick regardless of whether or not an atomic block is in effect. This is a safety feature to protect against abusive code like this:  (TODO - do we want to show this?)

```
atomic {
    while (true) {}
}
```

### Keyword 'wait'
The opposite of ```atomic``` is ```wait```, which gives up execution until the next time slice. The following example shows an intended use of wait.

```
yield delay(float duration) {
    float finishTime = currentRobotTime + duration;
    while (currentRobotTime < finishTime) {
        yield;
        wait;
    }
}
```