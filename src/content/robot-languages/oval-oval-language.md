---
title: Oval - Language
order: 4
section: Robot Languages
---

### Overview
Oval is a subset of the computer language C with a few extra features to support streaming and asynchronous communication. It provides 32-bit floating point and signed integer types but does not include pointers, structs, or unions
### The Ellipsis
Since Oval programs are intended to be streamed, they never really "end". Every Oval fragment to be compiled and sent to the [Oval Virtual Machine ([OVM](/robot-languages/oval-oval-virtual-machine))](/robot-languages/oval-oval-virtual-machine) must end with:

```
...
```
In order to actually turn off the [Oval Virtual Machine ([OVM](/robot-languages/oval-oval-virtual-machine))](/robot-languages/oval-oval-virtual-machine) use the statement

```
end;
```

### Language Basics
#### Supported Types
In order to keep the type system simple, there are no pointer types, structs, or unions in Oval. The type system currently supports these two primitive types (both are 32-bit).  Addresses of variables and functions are expressed as integers.

```
float
int
```
Oval also includes the boolean keywords as shortcuts to an integer.

```
true = 0 = 0.0 // zero bit pattern
false = !true // any bit pattern that is not zero
```

#### Variable Declaration and Assignment
A variable declared outside of any function is global.  It can be accessed from the stream or from any function defined afterward.

```
float radius;
int myVariable_2 = 2; // <-- What a stupid variable name
...
```
Variables can be assigned to just as in C.

```
float radius = 3.5;
int myVariable_2 = 5;
float radius = 7;
...
```
Numbers with decimal places are treated as 32 bit floats, numbers without are treated as signed 32 bit integers. In the last example, 7 is automatically cast to a float.

#### Arithmetic Operators
There are the usual arithmetic operators from C ``` + - * / ```
Whether they represent the integer or float varieties is dependent on the types of the operands. If both arguments are integers, then the integer operation is performed. If at least one of the arguments is a float, any integer arguments are cast to float and the floating point operation is performed.
Oval also offers floating point exponentiation as the carrot operator ```^``` which maps to the C function ```powf()```
Oval directly supports trigonometry and logarithms in the form of built-in functions ``` cos sin tan atan2 ln ```

These functions take floats as parameters and return floats

```
float area = 3.5 + 2*3.14159265 * radius^2 + cos(myVariable_2 + ln(x));
...
```
Parentheses work as in C and there is no bound on expression complexity.


##### Compression Note
Most floating point literals go uncompressed. Whereas numbers like 0 and 1 take only 2 and 4 bits to represent, a number like 3.14159265 takes roughly 35 bits. It is better to declare a variable over using the floating point more than once. For comparison, a variable access usually takes about 8-12 bits of compressed code.

```
float pi = 3.14159265;
float area = pi * radius^2;
...
```
#### Logical Operators
The logical operators in Oval are the words representing their actions

```
a and b
b or c
not a
!a      // ! is a shorthand for not and is the exception to the rule
```
#### Comparison Operators
Comparison operators are as they are in C and are implemented using the C implementation

```
a == b
a != b
a < b
a <= b
a > b
a >= b
```

#### Bitwise Operators
Bitwise operators act on integers and are mostly similar to the C counterparts. They are also implemented with the C implementation.

```
|  // Bitwise OR
&  // Bitwise AND
*| // Bitwise XOR (this is the one that is different from C)
<< // Bitwise Left shift (sign extension)
```
#### Flow Control
Oval includes these flow control statements

```
if (expression) {
    // statements...
}
else if (expression) {
    // statements...
}
else {
    // statements...
}
while (expression) {
    // statements...
}
...
```
Per usual, "else if" and "else" are optional. Note that there is no for loop. This may be implemented in a later version.

#### Library and Stream Code
Code arrives in the [OVM](/robot-languages/oval-oval-virtual-machine) in the stream. When a function is sent to the stream, the [OVM](/robot-languages/oval-oval-virtual-machine) reads the function declaration, copies it to the library, and recompresses it. Subsequent calls to the declared function executes from the library.

##### Functions
Oval allows you to define functions with arguments, return values, and local variables.

```
void doSomething(float arg, int otherArg) {
    int someLocalVariable;
    // statements...
}

float addFloats(float x, float y) {
    return x + y; // Don't write pointless code.
}

int get2() {
    return 2; // This isn't Java.
}
...
```

##### Imperative Code
In order to write a complete C program you must supply a "main" function. Oval does not require this. Instead, it allows you to put imperative code at the top level (in the stream).

```
float decr(float x) {
    return x - 1;
}

float counter = 100;

while (counter) {
    // statements...
    counter = decr(counter);
}
...
```

The [OVM](/robot-languages/oval-oval-virtual-machine) will save the function, initialize, the variable, and then execute the while loop (which calls the function). In this case, the ellipses is included because it indicates the end of a submission to the [OVM](/robot-languages/oval-oval-virtual-machine). This allows us to send more code that later references that same function.

```
int finalCount = decr(counter);
...
```

For interfacing with the Robot from Oval see: [Interfacing With the Robot](/robot-languages/oval-interfacing-with-the-robot)

For more advanced Oval information see: [Advanced Oval Concepts](/robot-languages/oval-advanced-oval-concepts)
