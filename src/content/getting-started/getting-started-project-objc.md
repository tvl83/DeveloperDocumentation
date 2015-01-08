
# Project Setup

## Importing the Sample Project

### Open the Sample Project
 - Open Xcode
 - Select the "**Open another project**" option on the main menu
 - Navigate to the "**Samples**" directory that was unzipped when you downloaded the Robot SDK
 - Select a sample folder to open
 - Double click on the "xcodeproj" file

### Build the project
 - Change the device target from iOS Simulator to iOS Device (or the name of the connected iOS device)
 - Press the play button or CMD+B

 *Note: Robot applications will not work in the emulator due to the dependency on Bluetooth*

## Create a New Project in <br /> Xcode

### Making a new project
 - Create a new iOS application as normal
 - Move on to the next step

### Integrating the Robot SDK Into Your Project

 - Open your project
 - Navigate in Finder to the **RobotKit.framework**
 - Drag and drop the framework into the project. Ensure the option **Copy files if needed** is checked before clicking **Add**
 - In the project navigator, click the name of your project to open the project options
 - Open the **General** tab
 - Change the **Deployment Target** to "7.0"
 - Open the **Capabilities** tab
 - Enable **Background Modes** and check **Uses Bluetooth LE accessories** this is to allow the robot to disconnect while the app is backgrounding
 - Open the **Build Settings** tab
 - Use the search bar to find "Other Linker Flags"
 - Add the linker flags "-ObjC" and "-lstdc++"

You are now ready to use the Robot SDK!