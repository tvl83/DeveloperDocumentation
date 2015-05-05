## hexToRGB(num : Number)

Converts a hex color number to RGB values

**Params:**

- `num` (Number) color value to convert

## color(color : Number|String|Object, callback : Function)

The Color command wraps Sphero's built-in setRGB command, allowing for
a greater range of possible inputs.

**Params:**

- `color` (Number|String|Object) what color to change Sphero to
- `callback` (Function) function to be triggered with response

## detectCollisions(callback : Function)

The Detect Collisions command sets up Sphero's collision detection system,
and automatically parses asynchronous packets to re-emit collision events
to 'collision' event listeners.

**Params:**

- `callback` (Function) function to be triggered with response