# Mood Visualiser

The aim of this UG project is to design a system which makes use of wireless devices, web technologies and biometric sensors to present data in the form of a visualisation that is easily accessible and interpretable by both performer and audience in quasi real time.

Technologies used in this project:
- [Node.js](https://nodejs.org/en/)
- [p5.js](http://p5js.org/) (a JavaScript library based on the Processing language)
- [BITalino Plugged](http://www.bitalino.com/index.php/plugged-kit) health platform
- [BITalino Python API] (https://github.com/BITalinoWorld/python-api)
- [socketIO JS](http://socket.io)
- [socketIO-client(Python)](https://github.com/invisibleroads/socketIO-client)
- JQuery
- Bootstrap
- Bower


**Tested on a MacBook Pro/Air**
*(Some commands may require **sudo**)*


How to setup:
- Install **Node.js** through binary package
- Open Terminal
- Run `npm install live-server -g`, followed by `npm install nodemon -g`
- Download [pyBluez](https://github.com/karulis/pybluez)
- Change directory to root of extracted pyBluez folder
- Run `python setup.py install`
- Exit out of directory
- Run `pip install socketIO-client`
- Run `pip install numpy`


How to run:
- Change directory to project root
- Run `npm install`
- Run `live-server` in one Terminal process
- Run `nodemon server.js` or `node server.js` in another Terminal process
- Run `python MoodVizBit.py` in another Terminal process

Please note: Bluetooth connectivity with Python seems to be quite buggy on Mac throughout the implementation process. I have not been able to identify the root cause nor find a complete fail-safe solution. In the mean time, a single variable `self.macAddress` in `MoodVizBit.py` may need to be changed in order to connect to the board. This may be `"/dev/tty.bitalino-DevB"` or `"98:d3:31:30:28:81"`. Mood Visualiser is able to work without the sensor integration, just don't run the `python MoodVizBit.py` command.

Created by **Anand Subramaniam**

Lead & Supervised by **Mathieu Barthet**

*Centre for Digital Music,* **Queen Mary University of London**
