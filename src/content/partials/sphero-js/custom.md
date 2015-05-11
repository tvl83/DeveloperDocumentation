### hexToRGB(num : Number)

Converts a hex color number to RGB values

**Params:**

- `num` (Number) color value to convert

### color(color : Number|String|Object, callback : Function)

The Color command wraps Sphero's built-in setRGB command, allowing for
a greater range of possible inputs.

**Params:**

- `color` (Number|String|Object) what color to change Sphero to
- `callback` (Function) function to be triggered with response

### detectCollisions()

The Detect Collisions command sets up Sphero's collision detection system,
and automatically parses asynchronous packets to re-emit collision events
to 'collision' event listeners.

**Params:**



### startCalibration()

The Start Calibration command sets up Sphero for manual heading
calibration.

It does this by turning on the tail light (so you can tell where it's
facing) and disabling stabilization (so you can adjust the heading).

When done, call #finishCalibration to set the new heading, and re-enable
stabilization.

**Params:**



### finishCalibration()

The Finish Calibration command ends Sphero's calibration mode, by setting
the new heading as current, turning off the back LED, and re-enabling
stabilization.

**Params:**