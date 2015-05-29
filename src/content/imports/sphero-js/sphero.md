### sphero(address, [opts])

```
var orb = sphero("/dev/rfcomm0");

var orb = sphero("/dev/tty.Sphero-OGB-AMP-SPP", { timeout: 300 });
```

Creates a new Sphero instance with the provided options.

**Params:**

- `address` (String) port/UUID/address of the connected Sphero
- `[opts]` (Object) options for sphero setup
- `[opts.adaptor]` (Object) if provided, a custom adaptor used for Sphero communication
- `[opts.sop2=0xFD]` (Number) SOP2 value to be passed to commands
- `[opts.timeout=500]` (Number) delay before a command is considered dead

### connect(callback)

```
orb.connect(function() {
  // Sphero is connected, tell it to do stuff!
  orb.color("magenta");
});
```

Establishes a connection to Sphero.

Once connected, commands can be sent to Sphero.

**Params:**

- `callback` (Function) function to be triggered once connected

### disconnect(callback)

```
orb.disconnect(function() {
  console.log("Now disconnected from Sphero");
});
```

Ends the connection to Sphero.

After this is complete, no further commands can be sent to Sphero.

**Params:**

- `callback` (Function) function to be triggered once disconnected