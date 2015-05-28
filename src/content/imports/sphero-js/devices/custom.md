### color(color, callback)

The Color command wraps Sphero's built-in setRGB command, allowing for
a greater range of possible inputs.

**Params:**

- `color` (Number|String|Object) what color to change Sphero to
- `callback` (Function) function to be triggered with response

```
device.color = function(color, callback) {
  switch (typeof color) {
    case "number":
      color = hexToRGB(color);
      break;

    case "string":
      if (colors[color]) {
        color = hexToRGB(colors[color]);
        break;
      }

      if (color[0] === "#") {
        color = color.slice(1);
      }

      if (hexRegex.test(color)) {
        var matches = hexRegex.exec(color);
        color = hexToRGB(parseInt(matches[0], 16));
      } else {
        // passed some weird value, just use white
        console.error("invalid color provided", color);
        color = hexToRGB(0xFFFFFF);
      }

      break;

    case "object":
      // upgrade shorthand properties
      ["red", "green", "blue"].forEach(function(hue) {
        var h = hue[0];

        if (color[h] && typeof color[hue] === "undefined") {
          color[hue] = color[h];
        }
      });

      break;
  }

  device.setRGBLed(color, callback);
};
```

### randomColor(callback)

The Random Color command sets Sphero to a randomly-generated color.

**Params:**

- `callback` (Function) function to be triggered with response

```
device.randomColor = function(callback) {
  device.setRGBLed(utils.randomColor(), callback);
};
```

### getColor(callback)

Passes the color of the sphero RGB LED to the callback (err, data)

**Params:**

- `callback` (Function) function to be triggered with response

```
device.getColor = function(callback) {
  device.getRGBLed(callback);
};
```

### detectCollisions(callback)

The Detect Collisions command sets up Sphero's collision detection system,
and automatically parses asynchronous packets to re-emit collision events
to 'collision' event listeners.

**Params:**

- `callback` (Function) function to be triggered with response

```
device.detectCollisions = function(callback) {
  device.configureCollisions({
    meth: 0x01,
    xt: 0x40,
    yt: 0x40,
    xs: 0x50,
    ys: 0x50,
    dead: 0x50
  }, callback);
};
```

### startCalibration(callback)

The Start Calibration command sets up Sphero for manual heading
calibration.

It does this by turning on the tail light (so you can tell where it's
facing) and disabling stabilization (so you can adjust the heading).

When done, call #finishCalibration to set the new heading, and re-enable
stabilization.

**Params:**

- `callback` (Function) function to be triggered with response

```
device.startCalibration = function(callback) {
  device.setBackLed(127);
  device.setStabilization(0, callback);
};
```

### finishCalibration(callback)

The Finish Calibration command ends Sphero's calibration mode, by setting
the new heading as current, turning off the back LED, and re-enabling
stabilization.

**Params:**

- `callback` (Function) function to be triggered with response

```
device.finishCalibration = function(callback) {
  device.setHeading(0);
  device.setBackLed(0);
  device.setStabilization(1, callback);
};
```

### streamOdometer([sps=5], [remove=false])

Starts streaming of odometer data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `odometer` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

```
device.streamOdometer = function(sps, remove) {
  device.streamData({
    event: "odometer",
    mask2: 0x0C000000,
    fields: ["xOdometer", "yOdometer"],
    sps: sps,
    remove: remove
  });
};
```

### streamVelocity([sps=5], [remove=false])

Starts streaming of velocity data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `velocity` event to get the velocity values.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

```
device.streamVelocity = function(sps, remove) {
  device.streamData({
    event: "velocity",
    mask2: 0x01800000,
    fields: ["xVelocity", "yVelocity"],
    sps: sps,
    remove: remove
  });
};
```

### streamAccelOne([sps=5], [remove=false])

Starts streaming of accelOne data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `accelOne` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

```
device.streamAccelOne = function(sps, remove) {
  device.streamData({
    event: "accelOne",
    mask2: 0x02000000,
    fields: ["accelOne"],
    sps: sps,
    remove: remove
  });
};
```

### streamIMUAngles([sps=5], [remove=false])

Starts streaming of IMU angles data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `imuAngles` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

```
device.streamIMUAngles = function(sps, remove) {
  device.streamData({
    event: "imuAngles",
    mask1: 0x00070000,
    fields: ["pitchAngle", "rollAngle", "yawAngle"],
    sps: sps,
    remove: remove
  });
};
```

### streamAccelerometer([sps=5], [remove=false])

Starts streaming of accelerometer data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `accelerometer` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

```
device.streamAccelerometer = function(sps, remove) {
  device.streamData({
    event: "accelerometer",
    mask1: 0x0000E000,
    fields: ["xAccel", "yAccel", "zAccel"],
    sps: sps,
    remove: remove
  });
};
```

### streamGyroscope([sps=5], [remove=false])

Starts streaming of gyroscope data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `gyroscope` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

```
device.streamGyroscope = function(sps, remove) {
  device.streamData({
    event: "gyroscope",
    mask1: 0x00001C00,
    fields: ["xGyro", "yGyro", "zGyro"],
    sps: sps,
    remove: remove
  });
};
```

### streamMotorsBackEmf([sps=5], [remove=false])

Starts streaming of motor back EMF data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `motorsBackEmf` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

```
device.streamMotorsBackEmf = function(sps, remove) {
  device.streamData({
    event: "motorsBackEmf",
    mask1: 0x00000060,
    fields: ["rMotorBackEmf", "lMotorBackEmf"],
    sps: sps,
    remove: remove
  });
};
};
```