---
title: Oval - Advanced Oval Concepts
order: 7
section: SPRK - EDU
subsections:
 - Yield and Yielding Functions
 - Atomic Execution
 - Wait
 - Inline Assembly
---


### Yield and Yielding Functions<a name="yield-and-yielding-functions"></a>
Consider the following Oval script to control the RGB LED.
```
void setBrightness(float x) {
    redLed = x;
    greenLed = x;
    blueLed = x;
}
 
void lightShow(float speed) {
    float brightness = 0;
    while (true) {
        brightness = brightness + speed;
        if (brightness > 255) { brightness = 0; }
        setBrightness(brightness);
    }
}
 
lightShow(0.25);
... 
```
The robot's lights will gradually wave from dark to light over and over again. One problem with this implementation is lightShow never returns. The OVM us spending all of its time in an infinite loop, which means if you send more code to the stream it won't be executed. For instance, if you wanted to make the robot drive...
```
controlSystemTargetYaw = 56;
controlSystemTargetSpeed = 200;
...
```
... nothing would happen. To fix this problem without resetting the OVM the only option is to make lightShow return, but then you would have to call it repeatedly to keep the light show going. This is inefficient bandwidth-wise and doesn't really work anyway because of latency.


#### Keyword ```yield```
To get around these difficulties Oval uses the ```yield``` keyword. Let's rewrite ```lightShow```.
```
yield lightShow(float speed) {
    float brightness = 0;
    while (true) {
        brightness = brightness + speed;
        if (brightness > 255) { brightness = 0; }
        setBrightness(brightness);
        yield;
    }
}
...
```
A function can only use ```yield``` if it declares its return type as ```yield```. We call sucha a function a *yielding function*. As a "return type" ```yield``` is the same as ```void```. But, it is important for the programmer to distinguish between functions that might yield and functions which do not. For that reason, when calling a yielding function you must precede the call with the keyword ```yield```.
```
yield lightShow(0.25);
...
```
In out example, if you were to append
```
controlSystemTargetYaw = 56;
controlSystemTargetSpeed = 200;
...
```
as soon as the [OVM](/sprk-edu/oval-oval-virtual-machine) hits the ```yield;``` statement, it stops executing ```lightShow``` and skips to the two assignment statements we just added to the strea. It then executes them (causing the robot to drive off in some direction) and then returns to ```lightshow``` and its endless ```while``` loop.

#### What ```yield``` Does in the Virtual Machine
1. Remember where it was in the process of executing the library function.
2. Starts executing stream code after the initial function call.
3. When it runs into the end of the stream it return to immediately after the ```yield``` statement and continues executing the function as if nothing happened.
4. All of the stream code that was executed during the yield operation is garbage collected.


#### Rules to Remember When Using ```yield```
1. In order to use ```yield``` in a function you must declare the return type as ```yield```.
2. To call a yielding function you must precede it with the keyword ```yield```.
3. Do not call a yielding function from an ordinary function.
4. Do not use ```yield``` inside a ```while``` loop in the stream. 
5. Do not call a yielding function from the stream when yielding.


#### Using ```yield``` to Return From Infinite Loops
Let's go back to our example. It still leaves something to be desired. Although ```yield gets aroung the fact that the infinite loop ties up the OVM, ```lightShow``` still doens't return. You can send all the stream code you want and ```lightShow``` may yield but never truly exit. Let's try again.
```
float speed = 0.25;
int continueLightShow = true;
 
yield lightShow() {
    float brightness = 0;
    while(continueLightShow) {
        brightness = brightness + speed;
        if (brightness > 255) { brightness = 0; }
        setBrightness(brightness);
        yield;
    }
}
 
yield lightShow();
...
```
Now ```lightShow``` continues only as long as ```continueLightShow``` is true. So we can make ```lightShow``` exit simple by appending:
```
continueLightShow = false;
...
```
When ```lightShow``` hits the ```yield``` statement the OVM executes the rest of the stream causing ```continueLightShow``` to be set to false. When the ```yield``` completes, execution ends up back in the ```while``` loop. The test now fails, the ```while``` loop exits and ```lightShow``` return.<br>
You should also notice that we moved ```speed``` from an argument to a global variable. This allows us to access it from the stream. Now, while ```lightShow``` is running we can append
```
speed = 2; // to speed it up or...
speed = 0.1; // to slow it down.
...
```
This is the basic mechanism for communicating with a running Oval program: the program yields, you change various settings via the stream, and when the yield statement returns the function behaves differently.


#### Start & Stop Multiple Yield Functions
This is quite a bit better than our original ```lightShow```. Still, we can get ourselves into trouble. Let's imagine we have two similarly architected yielding functions ```lightShow``` and ```motorBoat```. Each one is designed to take over the robot. Previously we called:
```
yield lightShow();
...
```
But now we want to stop ```lightShow``` and start ```motorBoar```. The first instince is to do this:
```
continueLightShow = false;
yield motorBoat();
...
```
This actually causes an error. When ```lightShow``` executes its ```yield``` statement it jumps to the stream and executes all the code there. First it sets the flag to turn off ```lightShow```. It also calls ```motorBoar```. Remember from the rules that you cannot call a yielding function while yielding.<br><br>
What we really want is to tell ```lightShow``` to quit by setting the flag and then somehow "return from the yield" to allow ```lightShow``` to return. Then we are free to call ```motorBoat```. Oval allows you to do this by using yield in the stream.
```
continueLightShow = false;
yield;
yield motorBoat();
...
```
A ```yield``` statement in the stream has one of two effects:
1. If the OVM is in the process of yielding it "unyields" back the library function just as if it ran out of code.
2. If the OVM is not in the process of yielding, it is a no op.


### Atomic Execution<a name="atomic-execution"></a>
An Oval programmer has no direct control over how much CPU time is given to the OVM. As a result, some seemingly innocuous tasks can behave strangely. Suppose you set the LED to white using the ```setBrightness``` function defined in [Yield and Yielding Functions](#yield-and-yielding-functions).  This function sets the red, green, and blue LEDs one at a time. If these instructions do not happen in rapid succession it is possible that the user will be able to briefly see saturated red or yellow before all the assignments are complete. This could happen if the OVM's time slice ends in the middle of the call to ```setBrightness```.<br><br>

The ```atomic``` keyword requests that the OVM fit a sequence of operations into the same time slice. A better implementation of ```setBrightness``` looks like this.

```
void setBrightness(float x) {
    atomic {
        redLed = x;
        greenLed = x;
        blueLed = x;
    }
}
...
```

Now the OVM will execute the entire atomic block at once (within reason). Another feature of an atomic block is that the OVM will wait until the end of the atomic block has been loaded to begin executing it. Otherwise it will obviously not be able to deliver contiguous execution.

**Note: There is a limit to the total number of instructions the OVM will execute in a given time slice regardless of whether or not an atomic block is in effect. This is a safety feature to protect against abusive code.**


### Wait
The opposite of ```atomic``` is ```wait```, which gives up execution until the next time slice. The following function shows a possible use of ```wait``` for the purpose of a non-blocking wait function.

```
yield delay(float duration) {
    float finishTime = currentRobotTime + duration;
    while (currentRobotTime < finishTime) {
        yield;
        wait;
    }
}
...
```


### Inline Assembly
Oval supports inline OVM Assembly. Specif the type of the assembly expression (```void```, ```int```, or ```float```) and the wrap the assembly code in braces. For instance:
```
int var;
void {
    push 1  // Push the integer 1 onto the stack
    push 2  // Push the integer 2 onto the stack
    addi    // Pop the two values, add as ints, and push result
    push 0  // Push the integer 0 onto the stack (it's an address)
    popto   // Pop address and value and store value at address
}
...
```
Assuming var is the first variable declared, it will end up in memory location 0. The inline assembly pushes a 1 and a 2 on the stack, adds them (leaving 3 on the stack), and then stores the result in address 0. This accomplishes the same thing as:
```
int var = 1 + 2;
...
```


#### Addresses
Having to correctly guess the address of ```var``` is a little hacky. Oval lets you obtain the address/ids of global variables, local variables, functions, and op codes using the @ operator. A less error prone way to write the previous code would be:
```
int var;
void {
    push 1
    push 2
    addi
    push @var // Push the address of var
    popto
}
...
```
Using the ```@``` operatior, one can read and write variables and call functions safely from assembly. Another example:
```
int var;
 
float fancyFunction() {
    return bestAnswerEvar;
}
 
void {
    push @fancyFunction
    call    // Pop function id/address and jump to it
    ftoi    // cast float to int
    push @var
    popto
}
...
```
This ```void``` block is equivalent to:
```
int var;
var = fancyFunction();
...
```
**There are a lot of nuances when addressing in inline assembly that can cause strange things to happen. See Addressing for a more in depth explanation of addressing from inline assembly.**


#### Returning Values From Assembly Blocks
In the previous case, the assembly expression has no value: it is a statement, not an expression. This is why it is labeled ```void```. When you put assembly code into a ```void``` block, you're promising the compiler that you won't leave anything on the stack. If you say:
```
void {
    push 1 // DON'T DO THIS! HONESTY IS ALL WE HAVE!
}
...
```
you are being very naughty. You lied to the compiler when you claimed the assembly block was ```void```. You might get away with it, but you could easily overflow the stack by not managing your return types properly.<br><br>
If you want an assembly block to represent an expression (i.e. have a value) the declare it as ```int``` or ```float```. For instance:
```
float e = float { push 2.718281828};
 
int x = int {
    push 1
    push 2
    addi
}; // Semicolon is only here because it ends the assignment
...
```
Such expressions play nicely with the type system just as if they were generated by the compiler. For instance:
```
float y = 2.0 + int { push 1 };
...
```
Is equivalent to:
```
float y;
void {
    push 2.0
    push 1
    itof // Up-cast the int to a float
    addf // Add the floats
    push @y
    popto // Assign to y
}
...
```
Notice that the compiler knows to promote the 1 to a float because you promised that what you left on the stack was an int.


#### Invoking Op Codes
To invoke an op code by number instead of using its name you can use the ```op``` keyword.
```
int x = int {
    push 1
    push 2
    op 21 // addi is opcode 21
}
...
```
You must use this feature if you want to invoke platform-specific op codes (which are intentionally not known by the compiler). For instance, the following code sets the RGB LED to green.
```
void {
    push 0
    push 255
    push 0
    op -2
}
...
```


#### Push is Optional
The word ```push``` is optional. Simply putting a numeric literal or identifier id into an assembly block is interpreted as a push instruction. Here is a previous example rewritten in this style:
```
float y;
void {
    2.0
    1
    itof  // Up-cast the int to a float
    addf  // Add the floats
    @y
    popto // Assign to y
}
...
```