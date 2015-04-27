---
word: Code Examples
title: Code Examples
order: 2.3
published: false
---
# Code Examples

## iOS ButtonDriver Sample App

WE NEED TO PROVIDE EXAMPLES USING THE NEW SDK

### Install Xcode

**Notice**: The Sphero iOS SDK works with iOS 7.0+.

Before you begin developing applications to interface with Sphero on iOS, you'll need to install the iOS developer tools.
This guide assumes you're using the latest version of OS X.

Our software is designed to take advantage of the latest technologies offered, but it's possible it will work on older setups.

- Download and install the latest version of [Xcode](http://developer.apple.com/technologies/xcode.html)

### Download Sphero SDK and Sample Application

* Download the latest [Sphero iOS SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master)
* Download the [ButtonDriver Sample app]()

TODO: Add link to ButtonDriver app and update sdk...

### Run the Application

Open the `ButtonDrive.xcodeproj` Xcode project.

Once it's open, drag `RobotKit.framework` into your project's framework folder.

If it isn't already, change the Deployment Target to 7.0.

Click **Run** to build and run the application.
If your Sphero is paired with your phone, you'll be able to control it with the on-screen d-pad buttons.

### How It Works

```
#import "ButtonDriveViewController.h"
#import <RobotKit/RobotKit.h>

@interface ButtonDriveViewController()

@property (strong, nonatomic) RUICalibrateGestureHandler *calibrateHandler;
@property (strong, nonatomic) RKConvenienceRobot* robot;
```

The `ButtonDriverViewController` imports dependencies, and defines required
properties.

```
-(void)appDidBecomeActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent startDiscovery];
}
```

When the app recieves the `appDidBecomeActive` event, it tells RobotKit to start looking for Spheros.

```
[[RKRobotDiscoveryAgent sharedAgent] addNotificationObserver:self selector:@selector(handleRobotStateChangeNotification:)];
```

The RobotKit discovery agent is then told to add an observer to trigger event when a robot's state changes.

```
-(void) handleRobotStateChangeNotification:(RKRobotChangedStateNotification *) n{
  switch(n.type){
    case RKRobotConnecting:
      break;
    case RKRobotConnected:
      _robot = [[RKConvenienceRobot alloc] initWithRobot:n.robot ];
      [_calibrateHandler setRobot:n.robot];
      break;
    case RKRobotFailedConnect:
      break;
    case RKRobotDisconnected:
      _robot = nil;
      [_calibrateHandler setRobot:nil];
      break;
  }
}
```

Then, inside the handler, specific actions are defined for different possible robot states.

```
-(IBAction)twoSeventyPressed:(id)sender {
  [_robot driveWithHeading:270.0 andVelocity:0.5];
}

-(IBAction)stopPressed:(id)sender {
  [_robot stop];
}
```

Two methods then tell the robot to drive or stop the sphero when buttons are pressed.

```
-(void)appWillResignActive:(NSNotification*)notification {
  [RKRobotDiscoveryAgent stopDiscovery];
  [_robot disconnect];
}
```

Finally, when the app is closed, it will stop looking for new robots.

## Stream Data with PhoneGap App

This example will walk through using the Sphero Android SDK, through PhoneGap.

### Setup PhoneGap

First, follow the instructions in the PhoneGap ["Getting Started" guide](http://phonegap.com/start#android).
This will install the Cordova JavaScript and Java libraries, and configure your project for Cordova/PhoneGap.

Get the Sphero Android SDK at https://github.com/Orbotix/SPHERO-ANDROID-SDK

Add `RobotLibrary` and `RobotUILibrary` to your project.

### Setting Dependencies

<a class="img-popup" href="https://github.com/orbotix/Sphero-Android-SDK/raw/master/assets/image003.png">
  ![QSG-jar-depend.png](https://github.com/orbotix/Sphero-Android-SDK/raw/master/assets/image003.png)
</a>

Inside your project's properties, set the dependencies.
This panel is found in **Properties** -> **Java Build Path** -> **Libraries**.

This will allow your project access to public methods in `RobotLibrary.jar`.

    <activity android:name="orbotix.robot.app.StartupActivity" />

After `RobotLibrary` and `RobotUILibrary` are in your project's build path, add this to your project manifest:

This will allow the `StartupActivity` to run, which is needed to connect to the Sphero.

Next, download the [Sphero Cordova plugin for Android](https://github.com/Orbotix/SPHERO-PHONEGAP-SDK).

Place the `spheroplugin.js` file into your `assets/www` folder.

Then, place the `SpheroPlugin.java` file into your project's source folder.

If you have followed the PhoneGap "Getting Started" guide, you should have an Android Activity in your project that extends the DroidGap class.

    startActivity(new Intent(this, StartupActivity.class));

In this Activity, add this line to your onCreate method.
This will initiate the connection to Sphero.

    @Override
    public void onDestroy() {
        super.onDestroy();

        RobotProvider.getDefaultProvider().disconnectControlledRobots();
    }

Add the following onDestroy implementation:

This will disconnect from Sphero after exiting the app.

### Activity

Your main Activity should look something like this.

```java
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
```

---

You're now ready to code to Sphero with JavaScript!

### Streaming From JavaScript

```javascript
mySphero
  .stream()
  .withGyro()
  .withListener(function(data) {

    // use the streamed data
    var x = data.gyro_filtered[0];
    var y = data.gyro_filtered[1];
    var z = data.gyro_filtered[2];

    console.log("x:" + x + ", y:" + y + ", z:" + z);
  })
  .start();
```

To start streaming, use the `stream` method on the `mySphero` object.
Chain together config methods to configure the streaming object, and then use the "start" method at the end.

The `stream()` method returns a StreamingConfig object.
The chained configuration methods configure the configuration object, then the `start()` method tells the mySphero object to start streaming.
Streaming is done using the options set in the StreamingConfig object.

The plugin will trigger the callback included in the `withListener` method when streaming data is received.

## Hacking Sphero With Node.JS

To get started, first [Install Node.JS](http://nodejs.org/).

With `node` and `npm` installed, install the `spheron` package:

    $ npm install spheron

Next, let's find your Sphero's serialport.
The port will look something like `/dev/tty.Sphero-BBP-AMP-SPP`.

    $ ls /dev/tty.Sphero*


Now, create an `app.js` file with this content.

```javascript
// app.js
var sphero = require('spheron').sphero();
var COLORS = spheron.toolbelt.COLORS;
var spheroPort = 'YOUR_SPHERO_PORT_HERE';

sphero.on('open', function() {
  sphero.setRGB(COLORS.BLUE, false);
});

sphero.open(spheroPort);
```

Don't forget to replace `YOUR_SPHERO_PORT_HERE` with the port you got in step 2!

---

Now, you're ready to run the example code.
Run the program with this command:

    $ node app.js

Once it's started, Sphero will turn blue.

If you'd like to play around with this some more, you could use another color from [toolbelt.COLORS](https://github.com/alchemycs/spheron/blob/master/lib/toolbelt.js#L12-L22).

* [More examples](https://github.com/alchemycs/spheron/tree/master/examples)
* [Package information](https://www.npmjs.org/package/spheron)

## Ruby Controlled Spheros

First, install the `sphero` RubyGem with the `gem` command:

    $ gem install sphero

Next, let's find your Sphero's serialport.
The port will look something like `/dev/tty.Sphero-BBP-AMP-SPP`.

    $ ls /dev/tty.Sphero*

Now, create an `app.rb` file with this content:

```ruby
# app.rb
Sphero.start 'YOUR_SPHERO_PORT_HERE' do
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

Don't forget to replace `YOUR_SPHERO_PORT_HERE` with the port you got in step 2!

---

Now you're ready to start.
Run the script:

    $ ruby app.rb

Sphero will move forward for 3 seconds, then right, back and finally left.

* [More examples](https://github.com/hybridgroup/sphero#synopsis)
* [Further information](https://github.com/hybridgroup/sphero)

## Detect Sphero Collisions <br /> with Cylon.js

To get started, first [install Node.JS](http://nodejs.org/)

Then run this command, installing the **cylon** package with Sphero support:

    $ npm install cylon cylon-sphero

Next, let's find your Sphero's serialport.
The port will look something like `/dev/tty.Sphero-BBP-AMP-SPP`.

    $ ls /dev/tty.Sphero*

Now, create a `collision.js` file with this script:

```javascript
// collision.js
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    sphero: { adaptor: sphero', port: 'YOUR_SPHERO_PORT_HERE' }
  },

  device: {
    sphero: { driver: 'sphero' }
  },

  work: function(me) {
    var color = 0x00FF00,
        bitFilter = 0xFFFF00;

    after((1).seconds(), function() {
      console.log("Setting up Collision Detection...");
      me.sphero.detectCollisions();
      me.sphero.setRGB(color);
      me.sphero.stop();
    });

    me.sphero.on('collision', function(data) {
      console.log("Collision:");
      color = color ^ bitFilter;
      console.log("Color: " + (color.toString(16)) + " ");
      me.sphero.setRGB(color);
      me.sphero.roll(90, Math.floor(Math.random() * 360));
    });
  }
}).start();
```

Don't forget to replace `YOUR_SPHERO_PORT_HERE` with the port you got in step 2!

---

With that done, run the program with the `node` command:

    $ node collision.js

Sphero will start moving on a random direction and will change color and direction.

* [More examples](https://github.com/hybridgroup/cylon-sphero/tree/master/examples)
* [Package information](http://cylonjs.com/)
