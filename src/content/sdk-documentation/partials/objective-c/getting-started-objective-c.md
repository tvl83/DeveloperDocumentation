There are two ways to get started with the RobotKit SDK, simply exploring samples in the [RobotKit SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master) or by integrating the RobotKit SDK into your own project.  The steps below are for integrating into your own project.

#### iOS Prerequisites

- The iOS RobotKit SDK is compatible with iOS 7.0+
- RobotKit SDK applications *will not work in the emulator* due to the dependency on Bluetooth

#### 1. Install [Xcode](https://macappsto.re/us/Bk9QD.m)
- If you don't have Xcode installed use the install link above.

#### 2. Download [RobotKit SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master)
- Keep up to date by watching our [GitHub Repository](https://github.com/orbotix/Sphero-iOS-SDK)

#### 3. Add RobotKit SDK to your Xcode Project
- Add Frameworks
	- Navigate to your [RobotKit SDK](https://github.com/orbotix/Sphero-iOS-SDK/zipball/master) download
	- Drag and drop the following frameworks into the project (Note: Ensure the option **Copy files if needed** is checked before clicking **Add**):
		- Required 	
			- RobotKit.framework
		- Optional		
			- RobotUIKit.framework
			- RobotUIKit.bundle
- Set Deployment Target to **7.0+** in the **General** tab
- Set Background Capabilities
	- Open **Capabilities** tab
	- Enable **Background Modes** and check **Uses Bluetooth LE accessories**
	- note: this setting allows Robots to sleep + disconnect while the app is closing
- Update Build Settings
	- Open **Build Settings** tab
	- Search for **"Other Linker Flags"**
	- Add ```-ObjC -lc++```
- Update Info.plist
	- Add **UISupportedExternalAccessoryProtocols** key
	- Add **com.orbotix.robotprotocol** entry
- Build Project
	- Change the device target from iOS Simulator to iOS Device (or the name of the connected iOS device)
	- Press the play button or CMD+B


#### 4. Integrate Connection and Commands

- [Connection Management](/sdk-documentation/connection-management)
- [Basic Commands](/sdk-documentation/basic-commands)
