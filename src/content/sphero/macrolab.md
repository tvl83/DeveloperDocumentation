---
word: MacroLab
title: MacroLab
order: 2
---
#MacroLab

## Playing with Sphero and MacroLab

In the next few minutes, we're going to learn how to create simple macros for Sphero.
These are a series of instructions for Sphero to follow, created through an easy-to-use interface.

### 1. Install Macrolab

* [iOS](https://itunes.apple.com/us/app/sphero-macrolab/id519917219?mt=8)
* [Android](https://play.google.com/store/apps/details?id=com.orbotix.macrolab&hl=en)

### 2. Create A Macro

![Add Command](http://i.imgur.com/98OTydO.png)

Inside MacroLab, tap the + button at the bottom to create a new Macro.

Where it says **Macro Name**, type "my first macro".
When you're done, click **Create Macro**.

We're going to add a few commands to this macro.
One to roll the Sphero, one to stop it.
One to wait, and one to change the Sphero's LEDs.

First, let's add a command by clicking the + button in the bottom right.

---

#### 2a. Roll

![Roll](http://i.imgur.com/IFRMfTC.png)

Tap on **Roll**, the first command in the list.

Change the **Speed** to `20`, and the **Delay** to `3000`.

It may be easier to use the keyboard than try to get the right values with the
slider.

Leave the **Heading** at zero.

Click the **Create** button up top when you're done.

---

#### 2b. Stop

![Stop](http://i.imgur.com/qLSDlyZ.png)

With the roll command in place, let's tell Sphero when it should stop.

Add a new command using the + key at the bottom.

From the list of available commands, choose **Stop**.
This will stop Sphero from rolling immediately.

Move the bar all the way to the right to create a **Delay** of 255 and tap **Create**.

---

#### 2c. Delay

![Delay](http://i.imgur.com/xMhJiCQ.png)

Now let’s add a one second delay so that you can see the color for one second.

Tap the + button to add a new step.

Tap the **Delay** button.

Choose 1000 ms delay - this should be the default.

Tap **Create**.

---

#### 2d. RGB

![RGB](http://i.imgur.com/8oiMAWG.png)

Next up, we'll tell the Sphero to turn red.

Tap the + button at the bottom of the screen.

Tap on **RGB** (which stands for "Red, Green, Blue"), the third command in the list.

Drag the slider for **red** to the right for 100% in order to make a red color.

Slide the **green** and **blue** sliders to the left for 0%.

Slide the **delay** to 0.

Click **Create**.

You’ve now written your first program!

---

### 3. Play

![Commands](http://i.imgur.com/X51P32g.png)

You will see all the created commands listed.

Click the Play button on the bottom.

* The Sphero will roll slowly for 3 seconds
* Then it will stop
* Then it will wait for 1 seconds
* And finally, change its color to red

We recommend you keep exploring other commands.
Create more of your own macros by combining commands!
