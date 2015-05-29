### color(color, callback)

```
orb.color("#00ff00", function(err, data) {
  console.log(err || "Color Changed!");
});

orb.color(0xff0000, function(err, data) {
  console.log(err || "Color Changed!");
});

orb.color({ red: 0, green: 0, blue: 255 }, function(err, data) {
  console.log(err || "Color Changed!");
});
```

The Color command wraps Sphero's built-in setRgb command, allowing for
a greater range of possible inputs.

**Params:**

- `color` (Number|String|Object) what color to change Sphero to
- `callback` (Function) function to be triggered with response

### randomColor(callback)

```
orb.randomColor(function(err, data) {
  console.log(err || "Random Color!");
});
```

The Random Color command sets Sphero to a randomly-generated color.

**Params:**

- `callback` (Function) (err, data) to be triggered with response

### getColor(callback)

```
orb.getColor(function(err, data) {
  if (err) {
    console.log("error: ", err);
  } else {
    console.log("data:");
    console.log("  color:", data.color);
    console.log("  red:", data.red);
    console.log("  green:", data.green);
    console.log("  blue:", data.blue);
  }
});
```

Passes the color of the sphero Rgb LED to the callback (err, data)

**Params:**

- `callback` (Function) function to be triggered with response

### detectCollisions(callback)

```
orb.detectCollisions();

orb.on("collision", function(data) {
  console.log("data:");
  console.log("  x:", data.x);
  console.log("  y:", data.y);
  console.log("  z:", data.z);
  console.log("  axis:", data.axis);
  console.log("  xMagnitud:", data.xMagnitud);
  console.log("  yMagnitud:", data.yMagnitud);
  console.log("  speed:", data.timeStamp);
  console.log("  timeStamp:", data.timeStamp);
});
```

The Detect Collisions command sets up Sphero's collision detection system,
and automatically parses asynchronous packets to re-emit collision events
to 'collision' event listeners.

**Params:**

- `callback` (Function) (err, data) to be triggered with response

### startCalibration(callback)

```
orb.startCalibration();
```

The Start Calibration command sets up Sphero for manual heading
calibration.

It does this by turning on the tail light (so you can tell where it's
facing) and disabling stabilization (so you can adjust the heading).

When done, call #finishCalibration to set the new heading, and re-enable
stabilization.

**Params:**

- `callback` (Function) (err, data) to be triggered with response

### finishCalibration(callback)

```
orb.finishCalibration();
```

The Finish Calibration command ends Sphero's calibration mode, by setting
the new heading as current, turning off the back LED, and re-enabling
stabilization.

**Params:**

- `callback` (Function) function to be triggered with response

### streamOdometer([sps=5], [remove=false])

```
orb.streamOdometer();

orb.on("odometer", function(data) {
  console.log("data:");
  console.log("  xOdomoter:", data.xOdomoter);
  console.log("  yOdomoter:", data.yOdomoter);
});
```

Starts streaming of odometer data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `odometer` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamVelocity([sps=5], [remove=false])

```
orb.streamVelocity();

orb.on("velocity", function(data) {
  console.log("data:");
  console.log("  xVelocity:", data.xVelocity);
  console.log("  yVelocity:", data.yVelocity);
});
```

Starts streaming of velocity data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `velocity` event to get the velocity values.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamAccelOne([sps=5], [remove=false])

```
orb.streamAccelOne();

orb.on("accelOne", function(data) {
  console.log("data:");
  console.log("  accelOne:", data.accelOne);
});
```

Starts streaming of accelOne data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `accelOne` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamImuAngles([sps=5], [remove=false])

```
orb.streamImuAngles();

orb.on("imuAngles", function(data) {
  console.log("data:");
  console.log("  pitchAngle:", data.pitchAngle);
  console.log("  rollAngle:", data.rollAngle);
  console.log("  yawAngle:", data.yawAngle);
});
```

Starts streaming of IMU angles data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `imuAngles` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamAccelerometer([sps=5], [remove=false])

```
orb.streamAccelerometer();

orb.on("accelerometer", function(data) {
  console.log("data:");
  console.log("  xAccel:", data.xAccel);
  console.log("  yAccel:", data.yAccel);
  console.log("  zAccel:", data.zAccel);
});
```

Starts streaming of accelerometer data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `accelerometer` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamGyroscope([sps=5], [remove=false])

```
orb.streamGyroscope();

orb.on("gyroscope", function(data) {
  console.log("data:");
  console.log("  xGyro:", data.xGyro);
  console.log("  yGyro:", data.yGyro);
  console.log("  zGyro:", data.zGyro);
});
```

Starts streaming of gyroscope data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `gyroscope` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamMotorsBackEmf([sps=5], [remove=false])

```
orb.streamMotorsBackEmf();

orb.on("motorsBackEmf", function(data) {
  console.log("data:");
  console.log("  rMotorBackEmf:", data.rMotorBackEmf);
  console.log("  lMotorBackEmf:", data.lMotorBackEmf);
});
```

Starts streaming of motor back EMF data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `motorsBackEmf` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### stopOnDisconnect([remove=false], callback)

```
orb.stopOnDisconnect(function(err, data) {
  console.log(err || "data" + data);
});
```

Starts streaming of motor back EMF data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `motorsBackEmf` event to get the data.

**Params:**

- `[remove=false]` (Boolean) triggered on complete
- `callback` (Function) triggered on complete