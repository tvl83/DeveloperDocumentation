---
title: OrbBasic
order: 3
section: SPRK - EDU
---


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


