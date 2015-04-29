---
word: Getting Started
title: Getting Started
order: 0
---
# Intro to Sphero

## What is Sphero?

Sphero is a robot ball with several features that can be controlled through mobile apps.
This includes computer programs students or other developers can build.
Its main features are:

* **Rolling** - The Sphero can roll at a given speed and heading for a given amount of time.
* **Colors** - The Sphero can light up in any color.
* **Bluetooth** - Sphero connects to devices such an iPads, iPhones, and Android phones and tablets through Bluetooth.
  This allows the Sphero to be controlled by a number of apps.

For more information, watch the [Sphero Guided Tour](https://www.youtube.com/watch?v=uHvZWcqjxrs)

## Heading and Aiming

One of the things that makes Sphero so unique is that its heading is relative to the user, not relative to the ball.
This makes it much easier to get Sphero rolling in the direction you want.

![Heading and Aiming]({{assets}}/images/heading-aiming.png)

The diagram shows how the heading works.

Note that only 90 degree increments are shown in the diagram, but you can specify the heading down to 1 degree.

---

Each time Sphero is turned on, it needs to be "aimed".
This means setting the direction that Sphero will treat as a heading of 0 degrees.

This is accomplished via Sphero's "tail light".

The tail light is a small blue light inside the Sphero.

![tail light](http://i.imgur.com/HY7KNKS.jpg)

Each Sphero app has a button that lets you set the tail light, which looks like this:

To use this button, tap and hold on it, and then slowly move your finger around the circle.
You will see the blue tail light rotate.

When it's pointing directly at you, remove your finger.

Now, if you tell the Sphero to move at a heading of 0 degrees, it will move directly away from you.

The student guides for all of the MacroLab lessons lead you through how to do this.

For an interactive introduction on how to aiming, use the [Sphero app](https://itunes.apple.com/mx/app/sphero/id468699619).

## Connect Your Sphero

Pick up Sphero from its charging station, and tap it twice on the logo to wake it up.
You may have to tap it hard.
It will start flashing colors when it is awakened out of its “sleep” state.

On your device, make sure Bluetooth is enabled.
From the home page, click on Settings at the bottom.
Then choose Bluetooth.

You will be shown a list of Spheros.
Connect to the appropriate Sphero by tapping it.
You can tell which Sphero is which by the names, which relate to the colors the ball is flashing.
For example, if it flashes purple, then yellow, then green, then that is ball PYG.
Select the one you want.

Once successfully connected, it will say “Connected”.

* [Video on how to connect sphero to iPhone](https://www.youtube.com/watch?v=I4TKvZOhKCY)

## Aim Your Sphero

To aim your Sphero, first go to your device's home screen and open the MacroLab
or OrbBasic app.

![tail light](http://i.imgur.com/HY7KNKS.jpg)

You'll see a circle with two arrows at the bottom of the screen:

Tap on this icon and hold it.

![light](http://i.imgur.com/yllDTsh.jpg)

A white circle will appear, move your finger slightly to rotate the internals of the Sphero.

You'll see a blue light inside the ball - this is the tail light.

Continue rotating the Sphero' insides until the tail light is facing you directly.
The Sphero's "back" is now to you.

## Feedback

If you have any issues, you can search for answers, or ask a question on [StackOverflow][].

The documentation is hosted in our [DeveloperDocumentation][repo] repository.

Let us know how we can improve it by [creating an issue][issue].

Alternatively, you can click on the "Edit this page" button in the top right corner.
This will let you fork [DeveloperDocumentation][repo], edit the content, and submit a pull request.

[StackOverflow]: http://stackoverflow.com/questions/tagged/sphero-api?sort=newest
[repo]: https://github.com/orbotix/DeveloperDocumentation
[issue]: https://github.com/orbotix/DeveloperDocumentation/issues/new
