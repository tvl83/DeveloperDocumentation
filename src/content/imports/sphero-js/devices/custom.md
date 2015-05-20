### color(color, callback)

The Color command wraps Sphero's built-in setRGB command, allowing for
a greater range of possible inputs.

**Params:**

- `color` (Number|String|Object) what color to change Sphero to
- `callback` (Function) function to be triggered with response

### randomColor(callback)

The Random Color command sets Sphero to a randomly-generated color.

**Params:**

- `callback` (Function) function to be triggered with response

### getColor(callback)

Passes the color of the sphero RGB LED to the callback (err, data)

**Params:**

- `callback` (Function) function to be triggered with response

### detectCollisions(callback)

The Detect Collisions command sets up Sphero's collision detection system,
and automatically parses asynchronous packets to re-emit collision events
to 'collision' event listeners.

**Params:**

- `callback` (Function) function to be triggered with response

### startCalibration(callback)

The Start Calibration command sets up Sphero for manual heading
calibration.

It does this by turning on the tail light (so you can tell where it's
facing) and disabling stabilization (so you can adjust the heading).

When done, call #finishCalibration to set the new heading, and re-enable
stabilization.

**Params:**

- `callback` (Function) function to be triggered with response

### finishCalibration(callback)

The Finish Calibration command ends Sphero's calibration mode, by setting
the new heading as current, turning off the back LED, and re-enabling
stabilization.

**Params:**

- `callback` (Function) function to be triggered with response

### streamOdometer([sps=5], [remove=false])

Starts streaming of odometer data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `odometer` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamVelocity([sps=5], [remove=false])

Starts streaming of velocity data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `velocity` event to get the velocity values.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamAccelOne([sps=5], [remove=false])

Starts streaming of accelOne data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `accelOne` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamIMUAngles([sps=5], [remove=false])

Starts streaming of IMU angles data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `imuAngles` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamAccelerometer([sps=5], [remove=false])

Starts streaming of accelerometer data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `accelerometer` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamGyroscope([sps=5], [remove=false])

Starts streaming of gyroscope data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `gyroscope` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop

### streamMotorsBackEmf([sps=5], [remove=false])

Starts streaming of motor back EMF data

It uses sphero's data streaming command. User needs to listen
for the `dataStreaming` or `motorsBackEmf` event to get the data.

**Params:**

- `[sps=5]` (Number) samples per second
- `[remove=false]` (Boolean) forces velocity streaming to stop