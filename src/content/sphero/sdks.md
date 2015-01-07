---
word: SDK's
title: SDK's
order: 1
---

# SDK's

# Android

This guide walks you through the basics of creating mobile apps for Android that leverage the Orbotix Sphero SDK.
The examples in this guide were built using Java and although we strive to support **ALL** the various Android devices available, but there are a few that are known to cause problems.
Visit our developer forum for more information.
The goal of this developer guide along with sample code is to give the developer a taste of the wide variety of things Sphero can do, respond to, and keep track of.

*In general this guide will walk you through:*

 - [Installing the SDK](https://github.com/orbotix/Sphero-Android-SDK#installing-the-sphero-android-sdk)
 - [Changing Sphero's Color](https://github.com/orbotix/Sphero-Android-SDK#add-code-to-blink-the-rgb-led)
 - [Using the Roll Command to move Sphero](https://github.com/orbotix/Sphero-Android-SDK#sendings-roll-commands)

### Before We Begin - Installing Eclipse

Notice: The Sphero Android SDK works with Android 2.2+ and Java Compiler Level 6.0(1.6)+

Before you begin to develop applications that interface with Sphero on Android, you will need to install the Android developer tools.
We often use Eclipse but there are many other well written Android IDEs out there and these same basic steps are most often still applicable.

 - Install the [Android SDK](http://developer.android.com/sdk/index.html) and the [Eclipse Plugin](http://developer.android.com/sdk/eclipse-adt.html)

## Installing the Sphero Android SDK

 - Download the latest version of the [Sphero Android SDK](https://github.com/orbotix/Sphero-Android-SDK/zipball/master)

**You can always keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-Android-SDK)**

## Importing a Sphero Sample Project

To import a sample into Eclipse, right-click in the project explorer, or click the File menu and select "**Import…**"

   ![QSG-libs.png](https://github.com/orbotix/Sphero-Android-SDK/raw/master/assets/image004.png)

Select the 'Existing Project into Workspace' option under the 'General' tab.
Then browse to the folder that holds the HelloWorld Sample.
It will be in the directory where you downloaded the Sphero SDK.

   ![QSG-libs.png](https://github.com/orbotix/Sphero-Android-SDK/raw/master/assets/image005.png)

At this point there should be no "red X's" or "red !'s" next to the sample project you just imported.
If there aren't any, you are now ready to run it on an Android device.
Keep in mind that **Sphero projects cannot run inside of the emulator and will fail compilation**.
If you have problems try these fixes.

1. Right click the project, and go to Properties.
   Under the **Android** tab on the left, the check box next to Android 2.2 (or above) should be checked.
   If you don't see any Android options, you need to download the Eclipse ADT plugin.

![QSG-libs.png](https://github.com/orbotix/Sphero-Android-SDK/raw/master/assets/image006.png)

2. Right click the project, and go to Properties.
   Under the **Java Compiler** tab on the left, the compiler level should be 1.6 or above.

3. If the problem still persists, try a "Project -> Clean" in the file menu.
   60% of the time, this works all the time.

## Create a New Android Project <br /> in Eclipse With Sphero

If you are creating a new project it is important to take special notice to the Android API Level and the Java compliance level.
The Sphero SDK currently supports:

 - Android API level 8 (Android 2.2) or greater.
 - Java language compliance level 6.0(1.6) or greater.

### Integrating the Sphero Libraries Into Your Project

You can start a new Sphero project using the libraries in the library folder or start a project using one of the sample projects from the samples folder.
This quick start guide describes how to start a new project.

To start, create a new Android project in your Eclipse workspace.
Then, place the libs folder from the SDK's library folder into your Android project's folder.

![QSG-libs.png](https://github.com/orbotix/Sphero-Android-SDK/raw/master/assets/image002.png)

### Setting the Dependency To RobotLibrary.jar

Eclipse should automatically add RobotLibrary.jar to the Android Dependencies folder.
But, if it does not, set the dependency in the project's properties in the Properties->Java Build Path-> Libraries dialog.
This will allow your project access to all the public method names in RobotLibrary.jar.

 ![QSG-jar-depend.png](https://github.com/orbotix/Sphero-Android-SDK/raw/master/assets/image003.png)

## Using the Sphero Android SDK

### Add Code to Connect to a Sphero

The RobotLibrary includes a view called `SpheroConnectionView` which will handle connecting to a Sphero.
When the view sends an `onRobotConnected` event you are ready to send commands.

- To use the `SpheroConnectionView` add the following code to your Activity's xml layout file

```
<LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="fill_parent"
      android:layout_height="fill_parent"
      android:background="#ff888888" >

      <orbotix.view.connection.SpheroConnectionView
          android:id="@+id/sphero_connection_view"
          android:layout_width="fill_parent"
          android:layout_height="fill_parent"
          android:background="#FFF" />

</LinearLayout>
```

- This will show the `SpheroConnectionView` when the Activity starts.
- It is important to put the view last in a frame layout, so when you hide the rest of your layout will be visible.
- Also, you must create the listener for the `SpheroConnectionView`.
- This will fire events to let you know the user's interaction with the `SpheroConnectionView` and then you can do what you please.

This code snippet shows how to create the listener and how to hide the connection view when a Sphero is connected.

```
// Find Sphero Connection View from layout file
mSpheroConnectionView = (SpheroConnectionView) findViewById(R.id.sphero_connection_view);

// This event listener will notify you when these events occur, it is up to you what you want to do during them
ConnectionListener mConnectionListener = new ConnectionListener() {

  @Override
  // The method to run when a Sphero is connected
  public void onConnected(Robot sphero) {

    // Hides the Sphero Connection View
    mSpheroConnectionView.setVisibility(View.INVISIBLE);

    // Cache the Sphero so we can send commands to it later
    mSphero = (Sphero) sphero;

    // You can add commands to set up the ball here, these are some examples
    // Set the back LED brightness to full
    mSphero.setBackLEDBrightness(1.0f);
    // Set the main LED color to blue at full brightness
    mSphero.setColor(0, 0, 255);
  }

  // The method to run when a connection fails
  @Override
  public void onConnectionFailed(Robot sphero) {
  // let the SpheroConnectionView handle or hide it and do something here...
  }

  // Ran when a Sphero connection drops, such as when the battery runs out or Sphero sleeps
  @Override
  public void onDisconnected(Robot sphero) {
    // Starts looking for robots
    mSpheroConnectionView.startDiscovery();
  }
};

// Add the listener to the Sphero Connection View
mSpheroConnectionView.addConnectionListener(mConnectionListener);
```

### Events

- These events are useful feedback from the user.
  For example, you could use the `onConnectionFailed(Robot sphero)` method to prompt the user to check that the Sphero is eligible for connection then retrying the connection.

- You must also prepare the bluetooth adapter on each start of the app, so that the app is aware of Sphero's nearby so that it can display them and connect to them.
  It is best practice to do this inside of the `onResume()` method.

```
@Override
protected void onResume() {
  // Required by android, this line must come first
    super.onResume();
    // This line starts the discovery process which finds Sphero's which can be connected to
    mSpheroConnectionView.startDiscovery();
}
```

- You must ensure that the robot is cleaned up properly by ensuring discovery is cancelled, and disconnecting the robot.
  This is best done in the `onPause()` method in your activity.
  **Do not forget to stop discovery as this consumes a lot of resources on the device!**

```
@Override
protected void onPause() {
    super.onPause();
    BluetoothAdapter.getDefaultAdapter().cancelDiscovery();
    if (mSphero != null) {
        mSphero.disconnect(); // Disconnect Robot properly
    }
}
```

### Add Code to Blink the RGB LED.

Now it is time to add code that sends a command to Sphero.
In this case we will blink the RGB LED blue.
As opposed to previous versions of the SDK, commands are now sent via the Sphero object that you cached in the previous step.
Commands are now sent using the dot method notation, as all objects in Java.
Here is the code for the `blink()` method sends the SetRGBLEDCommand to blink LED.

```java
private void blink(final boolean lit){

    if(mSphero != null){

        //If not lit, send command to show blue light, or else, send command to show no light
        if(lit){
          mSphero.setColor(0, 0, 0);                               // 1
        }else{
          mSphero.setColor(0, 0, 255);                             // 2
        }

        //Send delayed message on a handler to run blink again
        final Handler handler = new Handler();                       // 3
        handler.postDelayed(new Runnable() {
            public void run() {
                blink(!lit);
            }
        }, 1000);
    }
}
```

1. This line will send a command to turn off the LED.
   `mSphero` is the Robot object that will receive the command, and last three parameters turn of the red, green, and blue components of the LED.
   A 0 value for the color component will set the LED components brightness off.
2. This line will send a command to turn on the blue LED at full brightness.
   255 is full brightness, and is only set for the blue component of the LED.
3. This line creates a Handler that is used to post a delayed call to the `blink()` method after 1 second with the lit parameter inverted, so the next call toggles the LED on or off.

### Modify the AndroidManifest.xml File.

Before running the application, you will need to add permissions to use bluetooth,

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

### Run On a Device.

- Run the Application on a supported Android Device.
  **Turn Bluetooth ON**.

- At this point in time you will want to Pair your Android Device to Sphero from within the settings.

### Sending Roll Commands

- Using Roll Commands to **Move** Sphero.

- Using Roll Commands to **Stop** Sphero.

So, you got the LED to blink… that's Awesome!
But let's also take advantage of the amazing technology inside Sphero and drive the ball around a little bit.
In order to move Sphero you will need to send a RollCommand.
The RollCommand takes two parameters.

1.  Heading in degrees from 0° to 360°
2.  Speed from 0.0 to 1.0.

For example, a heading of 90° at a speed of 0.5 will tell Sphero to turn clockwise 90° at half speed (1.0 is full speed).
Once this command is issued Sphero will continue at this heading and speed until it hits something or runs out of range, so you will need to stop the ball using the RollCommand and `sendStop()`.

Now, it's time to modify the code.
Let's send Sphero forward at full speed for 2 seconds.
So, add the following method to the main activity.

```java
private void drive() {
  if(mRobot != null) {
    // Send a roll command to Sphero so it goes forward at full speed.
    mSphero.drive(0.0f, 1.0f);                                           // 1

    // Send a delayed message on a handler
    final Handler handler = new Handler();                               // 2
    handler.postDelayed(new Runnable() {

        @Override
        public void run() {
          // Send a stop to Sphero
          mSphero.stop()                                               // 3
        }

    }, 2000);
  }
}
```

1. This line sends the heading of 0° and the maximum speed of 1.0 to Sphero.
2. This line creates the handle that is used to send the delayed stop command.
3. This line tells the ball to stop

Next add a call to `drive()` in the `onActivityResult()` below the call to `blink()`.

**Run the application on an Android Device, if all went well Sphero should have moved forward just a little.**

**Where is Sphero going?**:
If you have successfully completed the quick start guide then Sphero should have moved after running the modified code.
What is interesting to note here is that Sphero just went in a *random* direction.
The direction was not random at all, Sphero believe it or not has a *front* and a *back*.
It is necessary for the application to determine what direction forward is for the user from the point of view of the ball.
We call this step `Calibration` and it is **required** to properly drive Sphero in a predictable direction.
To learn more about calibration and using the `BackLED` to set Sphero's orientation please check out the `UISampler` Sample project.

# iOS

## Resources - Class Documentation

The class documentation is located in api/ as DocSets for use with Xcode.
It can be installed by following the Sphero SDK installation steps below.
If that does not work or you would like to install the DocSets manually you can simply copy them into the DocSets directory used by Xcode.
It is located at

        ~/Library/Developer/Shared/Documentation/DocSets/

Once the DocSets have been copied, restart Xcode and they will then appear in the Documentation section of the Organizer.

## Installing Xcode

    Notice: The Sphero iOS SDK works with iOS 7.0+

Before you begin to develop applications that interface with Sphero on iOS, you will need to install the iOS developer tools.
There is a general assumption that you are using the latest version of Mac OSX, our software is designed to take advantage of all the most current technologies that are offered but it is possible that it will work on older frameworks and technologies.

- Download and Install the current version of [Xcode](http://developer.apple.com/technologies/xcode.html)

## Installing the Sphero iOS SDK

- Download the current [Sphero iOS SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master).
- Simply Drag `RobotKit.framework` into your project's framework folder.
- Change your Deployment Target to 7.0

**!NOTICE: There are some linker changes that also must be made:** Change Build Settings -> Linking -> Other Linker Flags

- lstdc++
- all_load
- ObjC

The HelloWorld sample has all the necessary code needed to create and maintain a connection to Sphero, and can be used as a guide in best practices.
In general you will need to:

Make sure to import RobotKit.h and define required properties:

```
#import <RobotKit/RobotKit.h>

@property (strong, nonatomic) RKConvenienceRobot* robot;
```




```
-(void)appDidBecomeActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent startDiscovery];
}
```

Call `startDiscovery` to look for connections:

```
[[RKRobotDiscoveryAgent sharedAgent] addNotificationObserver:self selector:@selector(handleRobotStateChangeNotification:)];
```

Listen for robot state changes:

```
-(void) handleRobotStateChangeNotification:(RKRobotChangedStateNotification *) n{
  switch(n.type){
    case RKRobotConnecting:
      break;
    case RKRobotConnected:
      _robot = [[RKConvenienceRobot alloc] initWithRobot:n.robot ];
      break;
    case RKRobotFailedConnect:
      break;
    case RKRobotDisconnected:
      _robot = nil;
      break;
  }
}
```

Create a method to handle robot state changes:

```
-(void)appWillResignActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent stopDiscovery];
  [_robot disconnect]; // will sleep Ollie as well
}
```

Do not forget to Disconnect from the Robot when the app closes, otherwise next time you start a connection it will already be in use.

```
  [_robot driveWithHeading:0.0 andVelocity:0.5];
```

You are now ready to start controlling and receiving information from your Sphero, simply add the following to move the sphero forward:

**Run the application on an iOS Device, if all went well Sphero should have moved forward just a little.**

#### Where is Sphero Going?

If you have successfully completed the quick start guide then Sphero should have moved after running the modified code.
What is interesting to note here is that Sphero just went in a *random* direction.
The direction was not random at all, Sphero believe it or not has a *front* and a *back*.

It is necessary for the application to determine what direction forward is for the user from the point of view of the ball.
We call this step `Calibration` and it is **required** to properly drive Sphero in a predictable direction.

To learn more about calibration to set Sphero's orientation please check out the `RobotUISample` Sample project.

# PhoneGap

## Setting up for Android

First, follow the directions in the PhoneGap "Getting Started" guide, at http://phonegap.com/start#android to install the Cordova JavaScript and Java libraries, and to configure your project for Cordova (aka PhoneGap).

Get the Sphero Android SDK at https://github.com/Orbotix/SPHERO-ANDROID-SDK and follow the directions in the readme to add RobotLibrary and RobotUILibrary to your project.

    <activity android:name="orbotix.robot.app.startupactivity" />

After RobotLibrary and RobotUILibrary are in your project's build path, add this line to your project manifest.
This will allow the StartupActivity to run, which is needed to connect to the Sphero.

Download the Sphero Cordova plugin for Android at https://github.com/Orbotix/SPHERO-PHONEGAP-SDK

Place the spheroplugin.js file into your assets/www folder, and place the SpheroPlugin.java file into your project's source folder.

If you have followed the PhoneGap "Getting Started" guide, you should have an Android Activity in your project that extends the DroidGap class.

In this Activity, add the line to your onCreate method.
This will initiate the connection to Sphero.

    startActivity(new Intent(this, StartupActivity.class));

Add the following onDestroy implementation:

    @Override
    public void onDestroy() {
        super.onDestroy();

        RobotProvider.getDefaultProvider().disconnectControlledRobots();
    }

This will disconnect from Sphero after exiting the app.

### Activity

Your main Activity should look something like this:

    import android.content.Intent;
    import android.os.Bundle;
    import orbotix.robot.app.StartupActivity;
    import orbotix.robot.base.RobotProvider;
    import org.apache.cordova.DroidGap;

    public class MainActivity extends DroidGap
    {
      /** Called when the activity is first created. */
      @Override
      public void onCreate(Bundle savedInstanceState)
      {
          super.onCreate(savedInstanceState);
          loadUrl("file:///android_asset/www/index.html");

          startActivity(new Intent(this, StartupActivity.class));
      }

      @Override
      public void onDestroy() {
          super.onDestroy();

          RobotProvider.getDefaultProvider().disconnectControlledRobots();
      }
    }

You're now ready to code to Sphero with JavaScript.

## Sphero PhoneGap Javascript

Most interaction with Sphero in the plugin is done with the mySpehro object.
mySphero has the following methods for basic commands

* mySphero

* setupRobot -

* setHeading - heading (int) [0-359]

* backLED - brightless (float) [0.0 - 1.0]

* stabilization - state (bool) [0 / 1]

* roll - heading (int) [0-359], speed (float) [0.0 - 1.0]

* rotationRate - rate (float) [ 0.0 - 1.0 ]

* rgb - red (float) [0.0-1.0], green (float) [0.0-1.0], blue (float) [0.0-1.0]

* sleep -

* ping -

* rawMotors -
  * leftMode (int) [0 = off, 1= forward, 2=reverse, 3=brake, 4=ignore ]
  * leftPower (float) [0.0 - 1.0]
  * rightMode  (int) [0 = off, 1= forward, 2=reverse, 3=brake, 4=ignore ]
  * rightPower (float) [0.0 - 1.0]

* stream (explained below)

For example, to make Sphero drive forward, you would do this:

    mySphero.roll(0, 1);

Which would tell Sphero to roll at 0 degrees heading (directly forward) at a speed of 1 (full speed).

## Further information

https://github.com/rossingram/Sphero-Phonegap-SDK

# Mac

## Overview

This guide walks you through the basics of creating Mac apps that leverage the Orbotix Sphero SDK.
The examples in this guide were built using Objective-C and have been tested with the current released OSX and current version of Xcode.
The goal of this developer guide along with sample code is to give the developer a taste of the wide variety of things Sphero can d , respond to, and keep track of.

The Mac SDK is a direct port from the iOS SDK.
Therefore, we tried to keep the syntax identical to it's iOS counterpart.

*In general this guide will walk you through:*

- Using our SDK Samples
- Integrating into an existing project
- Changing Sphero's Color
- Using the Roll Command to move Sphero

#### Class Documentation

 * [RobotKit Class Documentation](http://docs.gosphero.com/ios/robot_kit/hierarchy.html)

#### Samples

The first step to using our SDK is to run the samples we have included.
It is the easiest way to get started.
Simply open the .xcodeproject file of any of our samples and run in Xcode to see a few examples of what Sphero can do.
Currently, we have these samples:

* [HelloWorld](https://github.com/orbotix/Sphero-Mac-SDK/tree/master/Sample/HelloWorld) - Connect to Sphero and blink the LED.
  This is the most compact and easy to follow sample for dealing with Sphero.

* [SensorStreaming](https://github.com/orbotix/Sphero-Mac-SDK/tree/master/Samples/SensorStreaming) - If you want to use the sensor data from Sphero, you should check this sample out.
  Just simply register as an observer to the data, Pay attention to starting and stoping streaming during the application life cycle.

* [KeyDrive](https://github.com/orbotix/Sphero-Mac-SDK/tree/master/Samples/KeyDrive) - This sample demonstrates how to use keyboard input to drive Sphero.
  It also demonstrates how to calibrate Sphero.

* [MouseController](https://github.com/orbotix/Sphero-Mac-SDK/tree/master/Samples/MouseController) - This sample show how you can make sense of the data streaming from Sphero to control behavior, like your computer mouse.
  It allows you to move the mouse with IMU values of roll and pitch, and left click and right click with the yaw angle.

* [MacroSample](https://github.com/orbotix/Sphero-Mac-SDK/tree/master/Samples/MacroSample) - This sample shows you how to build macros programmatically and send them to Sphero.

### Integrating Into an Existing Project

Notice: The Sphero Mac SDK should work for OSX 10.6+

There are always those cases where you already developed an awesome game or app and want to integrate Sphero functionality or controllability into the project.
For those cases we have made it possible to integrate our libraries into your existing project, including some nifty pre-built user interface tools.

- Download the current [Sphero Mac SDK](https://github.com/orbotix/Sphero-Mac-SDK/zipball/master).

## Build Phases

### Copy Files

You need to add the build phase "Copy Files" to your Xcode project, if it is not already there.
Once you add it, you must move it above "Link Binaries With Libraries" build phase.
This is so the dynamic library RobotKit.framework gets copied into the executable directory of our project before the app tries to find it at runtime.
Without this build phase you will get the runtime error "dyld: Library not loaded: RobotKit.framework… Reason: image not found".

### Link Binary With Libraries

To integrate the Sphero SDK into your project, you must add the RobotKit.Framework from the framework directory of the SDK into "Link Binary With Librarie " and make sure this Build Phase is below "Copy Files" build phase.

Build Phases tab of your project should now look like this:

![sendingIn.png](https://github.com/orbotix/Sphero-Mac-SDK/raw/master/assets/build_phases.png)

### Code to Connect to Sphero

The HelloSphero example has all the necessary code needed to create and maintain a connection to Sphero, and can be used as a guide in best practices.
In general you will need to:

You should define two methods in your `.h`, one to Setup the connection to Sphero and one to maintain the connection.

```
BOOL robotOnline;
-(void)setupRobotConnection;
-(void)handleRobotOnline;
```

Make sure to import RobotKit.h

```
#import <RobotKit/RobotKit.h>
```

Create a method to handle setting up the Connection to Sphero

```
-(void)setupRobotConnection {
  /*Try to connect to the robot*/
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleRobotOnline) name:RKDeviceConnectionOnlineNotification object:nil];
  if ([[RKRobotProvider sharedRobotProvider] isRobotUnderControl]) {
    [[RKRobotProvider sharedRobotProvider] openRobotConnection];
  }
}
```

Create a method to handle maintaining the Connection to Sphero

```
- (void)handleRobotOnline {
    /*The robot is now online, we can begin sending commands*/
    if(!robotOnline) {
        /* Send commands to Sphero Here: */

    }
    robotOnline = YES;
}
```

Overload the `applicationDidFinishLaunching:(NSNotification *)aNotification` method and initialize the connection to Sphero in the AppDelegate.m file

```
- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    [[NSNotificationCenter defaultCenter] addObserver:self
                   selector:@selector(appWillTerminate:)
                     name:NSApplicationWillTerminateNotification
                     object:nil];

    robotOnline = NO;

    // Insert code here to initialize your application
    [self setupRobotConnection];
}
```

Do not forget to Disconnect from the Robot when the app closes, otherwise next time you start a connection it will already be in use.

```
- (void)appWillTerminate:(NSNotification *)notification {

     if( !robotOnline ) return;

      /* When the application is entering the background we need to close the connection to the       robot*/
    [[NSNotificationCenter defaultCenter] removeObserver:self name:RKDeviceConnectionOnlineNotification object:nil];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:NSApplicationWillTerminateNotification object:nil];

    // Close the connection
    [[RKRobotProvider sharedRobotProvider] closeRobotConnection];

    robotOnline = NO;
}
```

You are now ready to start controlling and receiving information from your Sphero, simply add the following to change the LED Color of Sphero to red:

```
[RKRGBLEDOutputCommand sendCommandWithRed:1.0 green:0.0 blue:0.0];
```

---

## Using the Sphero Mac SDK

---

This command is described in section 3 in more detail but it is a good exercise at this point to change these values and try it out, play around a little bit.

**For example**, try changing the following command in `AppDelegate.m` from

    [RKRGBLEDOutputCommand sendCommandWithRed:0.0 green :0.0 blue :1.0];

to

    [RKRGBLEDOutputCommand sendCommandWithRed:0.0 green :1.0 blue :0.0];

Notice the change from green of 0.0 to a green of 1.0. Run it and you should have a Green Sphero!

### Sending Roll Commands

 - Using Roll Commands to **Move** Sphero.

 - Using Roll Commands to **Stop** Sphero.

So, you got the LED to blink… thats Awesome!
But let's also take advantage of the amazing technology inside Sphero and drive the ball around a little bit.

In order to move Sphero you will need to send a RollCommand.
The RollCommand takes two parameters.

   1. Heading in degrees from 0° to 360°
   2. Speed from 0.0 to 1.0.

For example, a heading of 90° at a speed of 0.5 will tell Sphero to turn clockwise 90° at half speed (1.0 is full speed).
Once this command is issued Sphero will continue at this heading and speed until it hits something or runs out of range, so you will need to stop the ball using the RollCommand and `sendStop()`.

Now, it's time to modify the code.
Let's send Sphero forward for 2 seconds.
Next we will create 2 new methods, one to Move Sphero, and Delay.
And another to Stop Sphero.

      - (void)stop {
          [RKRollCommand sendStop];
      }

      - (void)driveforward {
        [RKRollCommand sendCommandWithHeading:0.0 velocity:0.5];
        [self performSelector:@selector(stop) withDelay:2.0];
      }

Next add the following code in place of the RGB command that was sent before.


        [self driveforward];


**Run the application on an Mac, if all went well Sphero should have moved forward just a little.**


## Where is Sphero going?

If you have successfully completed the quick start guide then Sphero should have moved after running the modified code.
What is interesting to note here is that Sphero just went in a *random* direction.
The direction was not random at all, Sphero believe it or not has a *front* and a *back*.
It is necessary for the application to determine what direction forward is for the user from the point of view of the ball.
We call this step `Calibration` and it is **required** to properly drive Sphero in a predictable direction.
To learn more about calibration and using the `BackLED` to set Sphero's orientation please check out the `KeyDrive` Sample project.

## Further information

https://github.com/orbotix/Sphero-Mac-SDK

# Win

## Overview

This project shows Windows 8.1 developers how to integrate Sphero into their Apps and games!

## Contents

- Adding the RobotKit.dll to your Visual Studio solution
- Discovering & Connecting Sphero
- Changing Sphero's color
- Using the Sphero UI elements
- Driving Sphero
- Sensor Streaming

## Adding RobotKit.dll

From within your solution on Visual Studio 2013

    <ol>
      <li>Right click on References and "Add Reference"</li>
      <li>Choose "Browse" and select the RobotKit.dll</li>
    </ol>

## Update Manifest

    <wb:DeviceCapability Name="bluetooth.rfcomm">
      <wb:Device Id="any">
        <wb:Function Type="serviceId:00001101-0000-1000-8000-00805F9B34FB" />
      </wb:Device>
    </wb:DeviceCapability>

## Discovering & Connecting Sphero

    private void setupRobot(){
        RobotProvider provider = RobotProvider.GetSharedProvider();
        provider.DiscoveredRobotEvent += OnRobotDiscovered;
        provider.NoRobotsEvent += OnNoRobotsEvent;
        provider.ConnectedRobotEvent += OnRobotConnected;
        provider.FindRobots();
    }

Handle the Events...

    private void OnRobotDiscovered(object sender, Robot robot) {
        Debug.WriteLine(string.Format("Discovered \"{0}\"", robot.BluetoothName));

        if (m_robot == null) {
            RobotProvider provider = RobotProvider.GetSharedProvider();
            provider.ConnectRobot(robot);
            //...
        }
    }

    private void OnNoRobotsEvent(object sender, EventArgs e) {
      MessageDialog dialog = new MessageDialog("No Sphero Paired");
      //...
    }

## Changing Sphero's color

Sphero's main LED colors are controlled by web standard RGB.
Best practice is to use hex values to stay within the valid range of 0-255.

    public void turnSpheroWhite(){
        int red = 0xFF;
        int green = 0xFF
        int blue = 0xFF
        m_robot.SetRGBLED(red, green, blue);
    }

## Using the Sphero UI Elements

From within the BasicDriveApp sample, copy the RobotKitUI code for the Joystick and Calibration controls.
Sphero needs to be calibrated so that the 'back LED" is aimed toward the driver.
The easiest way to accomplish this is to use the 'CalibrateElement.cs'.

## Driving Sphero

Driving Sphero is super simple.
Just give it a direction in degrees where 0 is directly ahead and increases clockwise where 90 degrees is right and a velocity between 0.0 and 1.0.

    public void hangRightAtHalfSpeed(){
        int heading = 90; // right
        float velocity = .5; // half speed
        m_sphero.Roll(heading, velocity);
    }

## Sensor Streaming

Sphero is capable of being used as a simple game controller or other input device using it's embedded sensors.
Sphero has the following sensors.

- Accelerometer
- Gyrometer
- Location in X,Y from a relative starting point
- Velocity
- Attitude in both Quaternions and Euler angles

### Setup

The robot SensorControl manages the listeners for Accelerometer, Gyro, Location, Attitude in Eulers and Quaternion Attitude.
The `SensorControl.Hz` value is between 1 and 400 and affects all sensors.

    {
      m_robot.SensorControl.Hz = 60; // stream at 60Hz for ALL sensors that are enabled
      m_robot.SensorControl.AccelerometerUpdatedEvent += OnAccelerometerUpdated;
    }

### Data Handler

    private void OnAccelerometerUpdated(object sender, AccelerometerReading reading) {
    // expects AccelerometerX,Y,Z to be defined as fields
        AccelerometerX.Text = "" + reading.X;
        AccelerometerY.Text = "" + reading.Y;
        AccelerometerZ.Text = "" + reading.Z;
    }

## Further information

https://github.com/orbotix/Sphero-Win-SDK

# Node

## Quick Start

Install package:

    npm install spheron

Connect your [Sphero](http://gosphero.com) to your computer via bluetooth.

Add `spheron` to your code:

```
var spheron = require('spheron');
var sphero = spheron.sphero();
var spheroPort = '/dev/cu.Sphero-RGB';
var COLORS = spheron.toolbelt.COLORS;

sphero.on('open', function() {
  sphero.setRGB(COLORS.BLUE, false);
});

sphero.open(spheroPort);
```

Run that and your sphero will turn blue.
You can pass hex colours such as `sphero.setRGB(0xFF00FF)` for `PURPLE`.

There are some named colours in `toolbelt.COLORS`.

## Further information

https://github.com/alchemycs/spheron

# ruby

## Quick Start

A ruby gem for controlling your Sphero ball.
Sends commands over the TTY provided by the bluetooth connection.

REQUIREMENTS:

* A Sphero ball connected to your computer
* Supports MRI 1.9.2/1.9.3 and Rubinius 2.0rc1 for sure...

INSTALL:

    gem install sphero

You can easily start your Sphero and send it commands like this:

```ruby
Sphero.start '/dev/tty.Sphero-YBW-RN-SPP' do
  roll 60, FORWARD
  keep_going 3

  roll 60, RIGHT
  keep_going 3

  roll 60, BACKWARD
  keep_going 3

  roll 60, LEFT
  keep_going 3

  stop
end
```

## Further information

* http://github.com/hybridgroup/sphero

# Augmented Reality

This version of the AR SDK is designed to work with Unity version 4.5 and XCode 5.0.  Check the Unity_3.5.7 if you need to be compatible with Unity 3.x.

## Overview

The Sphero Augmented Reality (AR) SDK is used to overlay a live view of the real world with virtual content.
For gaming applications in particular, the goal is to render 3D content into the live scene so that it appears to be realistic and authentic.
That’s where Sphero rolls in.
Augmented reality gameplay with Sphero is simple and seamless for two reasons – Sphero is a robot, and Sphero is round.
This allows us to employ a robotic fiducial, which provides never-before-seen freedom in characterizing the visual environment (since by definition a robot is a reprogrammable machine).
With no auxiliary fiducial markers, Sphero can be effectively found and tracked at a distance, at any angle, and when partially obscured.
A ball is the same from every angle, after all.

Sphero AR also has the ability to impact the real world, whereas traditional augmented reality is limited to the screen.
Not only can we make Sphero interact with virtual objects (collect coins, run over monsters, etc.), but we can also make Sphero respond to these objects (bumping into invisible walls, hitting fictional oil slicks).
Just wait till you’re holding Sphero in your hand, looking at an augmented reality character through the screen of your device.
It’s pretty awesome.

At the end of the day, putting together all the sensor data from Sphero and your mobile device, analyzing the video feed, setting up the lighting, camera, and action takes some heavy-duty math.
Let’s break it down.

1. Data starts out in Sphero’s accelerometer and gyroscope (get the low-down on Sphero’s inner robot here) and is piped into a state of the art, sensor-fusion algorithm.
   This generates Sphero’s sense of orientation.
   The combination of theses sensors and software behaves very much like Sphero’s “inner ear”.
   It allows Sphero to know which way is up (literally) and which way it’s facing.
   You may get the spins on a merry-go-round, but Sphero can handle hundreds of RPM without getting dizzy.

2. Next, the camera feed from your mobile device is captured and combined with the device’s own sense of orientation.
  This gives us a rough understanding of the contents of the picture.
  Are we looking at the ground, or at the sky?

3. Here comes more math.
Custom vision algorithms tear the image apart, identifying Sphero, identifying the floor, analyzing the color of the lights, the ground, and any other data that might impact feedback.

4. Data from the motors is then combined with Sphero’s sense of orientation to generate a sense of position.
   Just like you can navigate parts of your house with your eyes closed, Sphero can combine its sensor data to figure out where it is.
   And you might be surprised how good this sense is.
   You can tell Sphero to drive a twisting path through a large room, and it still knows how to drive back to within inches of its starting location.
   I challenge you to try that blindfolded!

5. All of the sensory information is combined using a lot of geometry, statistics, and duct-tape to figure out the real-world location of Sphero, the height of the player, the position of virtual objects, and the direction and color of lights.

In the end, the fluid, responsive augmented reality experience with Sphero boils down to the accuracy of about a dozen numbers describing the real and virtual scene.
Even with carefully optimized code, it takes hundreds of millions of calculations per second to compute these.
If that seems like a lot of effort for a dozen numbers, just imagine what’s going on in the visual cortex of your own brain.
A not-so-simple process, resulting in seamless and intuitive gameplay with endless possibility.

## Further information

https://github.com/orbotix/Sphero-AR-SDK

# Unity

The Sphero robotic gaming system allows you to quickly add Sphero as an external controller in your existing game.
In addition to being used as a controller Sphero can be driven around through the Unity plugin.

The Sphero Unity Plugin is a group of C# classes that form a bridge between Unity and our native Android™ and iOS™ SDKs.
Unity can call down into each platform's native code for Sphero commands and receive asynchronous data callbacks from native code up into Unity.
The easiest way to get going with the plugin is by starting with one of the samples we have created.
If you have an existing project you want to integrate Sphero into, please continue reading.

Notice: The Sphero Unity Plugin only works with Android and iOS.

## Further information and download

https://www.assetstore.unity3d.com/en/#!/content/7015

# Internet of Things

## Cylon.js For Sphero

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an adaptor and driver for the Sphero robot from Orbotix (http://www.gosphero.com/).
It uses the Hybrid Group fork of the Spheron module (https://github.com/hybridgroup/spheron) originally created by [@alchemycs](https://github.com/alchemycs)

Install the module with: `npm install cylon-sphero`

Example:

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: {name: 'sphero', driver: 'sphero'},

  work: function(my) {
    every((1).second(), function() {
      my.sphero.roll(60, Math.floor(Math.random() * 360));
    });
  }
}).start();
```

Further information:

http://cylonjs.com/documentation/platforms/sphero/

## Gobot sphero

This package provides the [Gobot](http://gobot.io) adaptor and driver for Sphero.

Install the gobot package and sphero platform

```
go get github.com/hybridgroup/gobot && go install github.com/hybridgroup/gobot/platforms/sphero
```

Example:

```go
package main

import (
  "fmt"
  "time"

  "github.com/hybridgroup/gobot"
  "github.com/hybridgroup/gobot/platforms/sphero"
)

func main() {
  gbot := gobot.NewGobot()

  adaptor := sphero.NewSpheroAdaptor("sphero", "/dev/rfcomm0")
  driver := sphero.NewSpheroDriver(adaptor, "sphero")

  work := func() {
    gobot.Every(3*time.Second, func() {
      driver.Roll(30, uint16(gobot.Rand(360)))
    })
  }

  robot := gobot.NewRobot("sphero",
    []gobot.Connection{adaptor},
    []gobot.Device{driver},
    work,
  )

  gbot.AddRobot(robot)

  gbot.Start()
}
```

Further information:

http://gobot.io/documentation/platforms/sphero/

## Artoo Adaptor For Sphero

Artoo is a open source micro-framework for robotics using Ruby.

For more information abut Artoo, check out website http://artoo.io

Installing:

```
gem install artoo-sphero
```

Example:

```ruby
require 'artoo'

connection :sphero, :adaptor => :sphero, :port => '/dev/rfcomm0' #linux
device :sphero, :driver => :sphero

work do
  @rolling = false

  every(3.seconds) do
    puts "Rolling..."
    sphero.roll 90, rand(360)
  end
end
```

Further information:

http://artoo.io/documentation/platforms/sphero/

## Arduino-Sphero-Library

This is a -basic- Sphero Library for the Arduino.

Things needed:

* Bluetooth Modem (http://www.sparkfun.com/products/9358)
* * Arduino Mega 2560
* * Jumper Wires

Further information:

https://github.com/cmonr/Arduino-Sphero-Library
