### ping(callback : Function)

The Ping command verifies the Sphero is awake and receiving commands.

**Params:**

- `callback` (Function) triggered when Sphero has been pinged

### version(callback : Function)

The Version command returns a batch of software and hardware information
about Sphero.

**Params:**

- `callback` (Function) triggered with version information

### controlUARTTx(callback : Function)

The Control UART Tx command enables or disables the CPU's UART transmit
line so another client can configure the Bluetooth module.

**Params:**

- `callback` (Function) function to be triggered after write

### setDeviceName(name : String, callback : Function)

The Set Device Name command assigns Sphero an internal name. This value is
then produced as part of the Get Bluetooth Info command.

Names are clipped at 48 characters to support UTF-8 sequences. Any extra
characters will be discarded.

This field defaults to the Bluetooth advertising name of Sphero.

**Params:**

- `name` (String) what name to give to the Sphero
- `callback` (Function) function to be triggered when the name is set

### getBluetoothInfo(callback : Function)

Triggers the callback with a structure containing

- Sphero's ASCII name
- Sphero's Bluetooth address (ASCII)
- Sphero's ID colors

**Params:**

- `callback` (Function) function to be triggered with Bluetooth info

### setAutoReconnect(flag : Number, time : Number, callback : Function)

The Set Auto Reconnect command tells Sphero's BT module whether or not it
should automatically reconnect to the previously-connected Apple mobile
device.

**Params:**

- `flag` (Number) whether or not to reconnect (0 - no, 1 - yes)
- `time` (Number) how many seconds after start to enable auto reconnect
- `callback` (Function) function to be triggered after write

### getAutoReconnect(callback : Function)

The Get Auto Reconnect command returns the Bluetooth auto reconnect values
as defined above in the Set Auto Reconnect command.

**Params:**

- `callback` (Function) function to be triggered with reconnect data

### getPowerState(callback : Function)

The Get Power State command returns Sphero's current power state, and some
additional parameters:

- **RecVer**: record version code (following is for 0x01)
- **Power State**: high-level state of the power system
- **BattVoltage**: current battery voltage, scaled in 100ths of a volt
  (e.g. 0x02EF would be 7.51 volts)
- **NumCharges**: Number of battery recharges in the life of this Sphero
- **TimeSinceChg**: Seconds awake since last recharge

Possible power states:

- 0x01 - Battery Charging
- 0x02 - Battery OK
- 0x03 - Battery Low
- 0x04 - Battery Critical

**Params:**

- `callback` (Function) function to be triggered with power state data

### setPowerNotification(flag : Number, callback : Function)

The Set Power Notification command enables sphero to asynchronously notify
the user of power state periodically (or immediately, when a change occurs)

Timed notifications are sent every 10 seconds, until they're disabled or
Sphero is unpaired.

**Params:**

- `flag` (Number) whether or not to send notifications (0 - no, 1 - yes)
- `callback` (Function) function to be triggered when done writing

### sleep(wakeup : Number, macro : Number, orbBasic : Number, callback : Function)

The Sleep command puts Sphero to sleep immediately.

**Params:**

- `wakeup` (Number) the number of seconds for Sphero to re-awaken after. 0x00 tells Sphero to sleep forever, 0xFFFF attemps to put Sphero into deep
sleep.
- `macro` (Number) if non-zero, Sphero will attempt to run this macro ID when it wakes up
- `orbBasic` (Number) if non-zero, Sphero will attempt to run an orbBasic program from this line number
- `callback` (Function) function to be triggered when done writing

### getVoltageTripPoints(callback : Function)

The Get Voltage Trip Points command returns the trip points Sphero uses to
determine Low battery and Critical battery.

The values are expressed in 100ths of a volt, so defaults of 7V and 6.5V
respectively are returned as 700 and 650.

**Params:**

- `callback` (Function) function to be triggered with trip point data

### setVoltageTripPoints(vLow : Number, vCrit : Number, callback : Function)

The Set Voltage Trip Points command assigns the voltage trip points for Low
and Critical battery voltages.

Values are specified in 100ths of a volt, and there are limitations on
adjusting these from their defaults:

- vLow must be in the range 675-725
- vCrit must be in the range 625-675

Shifting these values too low can result in very little warning before
Sphero forces itself to sleep, depending on the battery pack. Be careful.

**Params:**

- `vLow` (Number) new voltage trigger for Low battery
- `vCrit` (Number) new voltage trigger for Crit battery
- `callback` (Function) function to be triggered when done writing

### setInactivityTimeout(time : Number, callback : Function)

The Set Inactivity Timeout command sets the timeout delay before Sphero
goes to sleep automatically.

By default, the value is 600 seconds (10 minutes), but this command can
alter it to any value of 60 seconds or greater.

**Params:**

- `time` (Number) new delay before sleeping
- `callback` (Function) function to be triggered when done writing

### jumpToBootloader(callback : Function)

The Jump To Bootloader command requests a jump into the Bootloader to
prepare for a firmware download.

All commands after this one must comply with the Bootloader Protocol
Specification.

**Params:**

- `callback` (Function) function to be triggered when done writing

### runL1Diags(callback : Function)

The Perform Level 1 Diagnostics command is a developer-level command to
help diagnose aberrant behaviour in Sphero.

Most process flags, system counters, and system states are decoded to
human-readable ASCII.

For more details, see the Sphero API documentation.

**Params:**

- `callback` (Function) function to be triggered with diagnostic data

### runL2Diags(callback : Function)

The Perform Level 2 Diagnostics command is a developer-level command to
help diagnose aberrant behaviour in Sphero.

It's much less informative than the Level 1 command, but is in binary
format and easier to parse.

For more details, see the Sphero API documentation.

**Params:**

- `callback` (Function) function to be triggered with diagnostic data

### clearCounters(callback : Function)

The Clear Counters command is a developer-only command to clear the various
system counters created by the L2 diagnostics.

It is denied when the Sphero is in Normal mode.

**Params:**

- `callback` (Function) function to be triggered when done writing

### assignTime(time : Number, callback : Function)

The Assign Time command sets a specific value to Sphero's internal 32-bit
relative time counter.

**Params:**

- `time` (Number) the new value to set
- `callback` (Function) function to be triggered when done writing

### pollPacketTimes(time : Number, callback : Function)

The Poll Packet Times command helps users profile the transmission and
processing latencies in Sphero.

For more details, see the Sphero API documentation.

**Params:**

- `time` (Number) a timestamp to use for profiling
- `callback` (Function) function to be triggered when done writing