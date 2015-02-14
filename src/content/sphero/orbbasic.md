---
word: OrbBasic
title: OrbBasic
order: 4
---
# OrbBasic

## Hello, OrbBasic!

![orbBasic App](http://a5.mzstatic.com/us/r30/Purple3/v4/25/75/78/25757812-83f2-62db-e538-9d5e21f7e96b/screen568x568.jpeg)

With OrbBasic you can create more complex programs using a text-based programming language.

Run basic programs, create and prototype autonomous behaviour, and explore the inner workings of Sphero.

Sphero MacroLab is a really cool app to give the Sphero commands, but it’s limited in what it can do.
You give it a list of commands and it starts at the top and goes to the bottom, but it can’t do anything fancier than that.
To make programs that can do more, you need an app called OrbBasic.
OrbBasic uses a text-based programming language and really increases what you can do with a Sphero.

### Install OrbBasic

* [iOS](https://itunes.apple.com/us/app/orbbasic-for-sphero/id647306205?mt=8)
* [Android](https://play.google.com/store/apps/details?id=com.orbotix.orbbasic&hl=en)

### What is OrbBasic?

OrbBasic is a programming language.
A programming language is a list of instructions that tells a computer what to do.
Although MacroLab allowed you to create programs, it was done using a graphic interface, meaning that you tapped buttons on the screen, slid sliders, and filled in boxes.
Most programming languages use text instead, and this is what OrbBasic does.

### Why Do We Call It a Language?

Usually a language is used for two people to communicate something.
For a programing language, it’s a person communicating with a computer.
One of the big differences between a programming language and a human language is that when you communicate to a computer, you have to get the words exactly right.
If you make a small mistake, either the computer won’t understand it, or it won’t do what you want it to do.

Most commands in OrbBasic look like this:
￼
![orbBasic syntax](http://new.tinygrab.com/089df54f8f9397f89248545cc45b59d7e90d256cb5.png)

Let's go over this in a bit more detail:

**Line Number:**
The first thing you'll see is the line number.
This is needed for `goto` ("go to") commands.
These tell the computer to jump to that line number and execute that command.

Usually, lines are numbered `10`, `20`, `30`, etc.
You could number them `1`, `2`, `3`, etc., but that makes it more difficult to add additional commands in-between lines later.

**Command:**
The second part of the line is the command.
This will tell Sphero to perform a particular action.

**Parameters:**
The last bit of the line are 'parameters' to the command.
These give the command more information on what it should do.
There will sometimes be one parameter, and sometimes many.
If there's more than one parameter, there must be a comma in between, separating them.

Next, you're going to be using Sphero to learn about some important concepts for programming Sphero.

* **goroll** – Makes Sphero roll at a given speed and heading. Also makes it stop.
* **delay** – Makes Sphero wait an amount of time before doing the next command
* **goto** – Makes Sphero go to a certain place in the program
* **variables** – Used to store a number

### Making the Sphero Roll and Stop

![goroll]({{assets}}/images/roll-and-stop.png)

To make Sphero roll or stop, you use the `goroll` command followed by three numbers:

* First number: `heading`.
  From 0 to 359, it is the number of degrees from straight ahead (see diagram).
* Second number: `speed`.
  In MacroLab, the speed value went from 0% to 100%.
  In OrbBasic it goes from 0 to 255.
  (Why 255? It has to do with how computers store numbers.)
* Third number: `type` of rolling.
  It can be 0 (to stop), 1 (normal), or 2 (fast rotation)

---

So, for example, this command means roll at `heading` 90 degrees, at a `speed` of 128 (about 50%), expecting to change direction quickly.
`30` is the line number, which means it is most likely the third command in the program.

    30 goroll 90, 128, 2

Notice that unlike MacroLab, there is no delay.
Sphero will keep rolling at that heading and speed until you tell it to do something else.
So we typically add a delay after that step.
The delay command has one number after it, which is the number of msec (1/1000 of a second) to wait for.

This command tells the Sphero to wait for 5000 milliseconds (5 seconds) to do the next command.

    40 delay 5000

The line number of 40 means that this command is probably the line after the goroll line.

Finally, when you want the Sphero to stop, you should use the `goroll` command with zeroes for `speed` and `type`.

This code tells Sphero to point in the `heading` direction of 0 degrees and stop:

    50 goroll 0, 0, 0

### Jumping to a New Place in the Program

The `goto` command is used to jump to a new place in the program.
('goto' is a combination of the words “go” and “to”.)
It has one number after it, which is the line number to jump to.

This instruction will tell the Sphero to go to line `20` and perform the command at that line.

    60 goto 20

Once Sphero is done with that command, it should do the next one.

This program will roll and stop the Sphero over and over, until you stop the program it manually.

### Variables

Variables are a place in memory where a computer stores a number.
Every variable has a name, and in OrbBasic, the variable names are one letter long, and can be anything in the alphabet except `z`.
(`z` is used for something else.)

This command will store the number `35` in the variable named `b`.

    50 b = 35

Then, you can use the variable just like you would a number.

For example this command will roll the Sphero with a heading of 35 degrees:

    60 goroll b, 128, 2

---

The cool thing about variables is that they can change what number they hold.

This command takes what’s stored in the `b` variable, add `5`, and then store the new number in the `b` variable.

    70 b = b + 5

If `b` were `35`, then after this line, it would be `40`.

Don’t worry if this doesn’t make sense just yet.
You’ll learn how to piece it all together next, so let’s get started!

### Your First OrbBasic program

Let’s write your first OrbBasic program.
It’s going to simply roll a distance and then roll back and stop.

![new](http://new.tinygrab.com/089df54f8fae2bad4f723791d0f034c7edbdef87b6.png)

Tap the + button at the bottom to create a new program.

In the space where it says Program Name, give your program a name.
Click the ‘+ New Program’ button under it.

![tap](http://new.tinygrab.com/089df54f8f67f4e03053a30049332876e44822e13d.png)

Tap in the big white space.
A keyboard will appear at the bottom of the screen.

    10 goroll 0,50,2
    20 delay 2000
    30 goroll 180,50,2
    40 delay 2000
    50 goroll 0,0,0

Type this code to roll Sphero forward at speed `50` for 2 seconds, then roll it back (180 degrees heading) at speed `50` for 2 seconds, and then stop.
We’ll use a roll type of `2` (last number), so that it can switch directions quickly.

![done](http://new.tinygrab.com/089df54f8fda84aeaabfe1d033bf76ce1965b4234b.png)

Tap the Done button in the upper right hand corner.

Now, you need to aim Sphero.
Use the aiming button at the bottom of the screen.

![goplay](http://new.tinygrab.com/089df54f8f0de652bd55df501a4fe17de982691ab1.png)

Tap the Play button to see the Sphero move back and forth.

**Congratulations! You wrote your first OrbBasic program!**

#### Goto

So far, that program would have been easier to write in MacroLab.
But now let’s do something that we couldn’t do in MacroLab.
Let’s make Sphero roll back and forth, over and over.
To do this, add a goto command at the end to jump back to the beginning.

Change line `50` to be:

    50 goto 10

Your new code should look like this:

    10 goroll 0,50,2
    20 delay 2000
    30 goroll 180,50,2
    40 delay 2000
    50 goto 10

* Now we should see the ball rolling back and forth.
  Tap the Play button to see it work.

* Tap the Stop button when you’ve seen it roll back and forth enough times.

#### Variables

Variables are a powerful way to make Sphero do things.
As mentioned in the introduction, variables store numbers in Sphero’s memory.
Let’s use a variable called `d` (for delay), and have that store the delay value.
We need to set it up before we start rolling, so we will take advantage of the fact that we start at line `10`, and add a new line `5` at the top.

Add this line at the very beginning:

    5 d = 2000

**Warning:**
When adding a line at the top, it can be easy to accidentally tap orbBasic and end up back at your list of programs.
If that happen, just tap on line to get back to your program and very carefully tap at the top of the program.
Once you are at the top, tap Return to add a new line.

* We have now stored the number `2000` in the variable `d`.
Let’s use it by replacing the `2000`s in the delay line with `d`.
Your code should look like this now:

    5 d=2000
    10 goroll 0,50,2
    20 delay d
    30 goroll 180,50,2
    40 delay d
    50 goto 10

* Tap on Done and Play.
The Sphero will roll the same way as before.

**So what’s the use of that?**
Well, having something stored in memory can be very powerful.
Let’s say we wanted to change it to roll 3 seconds instead of 2.

Instead of changing all the `2000`s to `3000`s in the delay command, we just need to change our first line:

    5 d = 3000

Change that first line from `2000` to `3000`.
Run the program, and you’ll see that the Sphero goes farther now.

So that was convenient, but not very exciting.
Let’s really make use of variables by adding a line that adds half a second to the delay time.
Then each time, it will roll a little longer and a little farther.

First, set the value back to `2000` in the first step.
Then add a new line between `40` and `50`, that will add `500` milliseconds (half a second) to `d` each time.

Using a step number of `45` lets us put it between `40` and `50`.

    45 d = d + 500

Your code should look like this now:

    5 d = 2000
    10 goroll 0,50,2
    20 delay d
    30 goroll 180,50,2
    40 delay d
    45 d = d + 500
    50 goto 10

---

Tap the Play button.

**The Sphero will roll back and forth, slightly farther each time.**

Check out the [SPRK lessons](http://www.gosphero.com/education/) for further exercises with OrbBasic.
