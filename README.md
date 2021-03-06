# Mood Visualiser

The aim of this UG project is to design a system which makes use of wireless devices, web technologies and biometric sensors to present data in the form of a visualisation that is easily accessible and interpretable by both performer and audience in quasi real time.

A paper for this project has been published in AudioMostly 2017, which can be read [here](https://dl.acm.org/citation.cfm?id=3123517&preflayout=flat).

Technologies used in this project:
- [Node.js](https://nodejs.org/en/)
- [p5.js](http://p5js.org/) (a JavaScript library based on the Processing language)
- [BITalino Plugged](http://www.bitalino.com/index.php/plugged-kit) health platform
- [BITalino Python API](https://github.com/BITalinoWorld/python-api)
- [socketIO JS](http://socket.io)
- [socketIO-client (Python)](https://github.com/invisibleroads/socketIO-client)
- JQuery
- Bootstrap
- Bower

----------

**Tested on a MacBook Pro/Air** *(Some commands may require* `sudo`*)*

DEVICE SPECIFICATIONS:
> **15" Macbook Pro Retina (Early 2013)**
>
> RAM: 16GB
>
> CPU: i7 2.7Ghz Quad Core
>
> SSD: 256GB
>
> GPU: NVIDIA GeForce GT 650M (1GB)
>
> OS: El Capitan (version 10.11.4)


> **13" Macbook Air Retina (Early 2013)**
>
> RAM: 4GB
>
> CPU: i5 1.3Ghz Dual Core
>
> SSD: 121GB
>
> GPU: Intel HD Graphics 5000 1536 MB
>
> OS: El Capitan (version 10.11.4)

----------

How to setup (single execution):
- Install **Node.js** through binary package
- Open Terminal
- Run `npm install live-server -g`, followed by `npm install nodemon -g`
- Download [pyBluez](https://github.com/karulis/pybluez)
- Change directory to root of extracted pyBluez folder
- Run `python setup.py install`
- Exit out of directory
- Run `pip install socketIO-client`
- Run `pip install numpy`

How to prepare project (single execution for every fresh project version download):
- Download and extract project
- Change directory to project root
- Run `npm install`

How to run:
- Change directory to project root
- Run `live-server` in one Terminal process
- Run `nodemon server.js` or `node server.js` in another Terminal process
- Run `python MoodVizBit.py` in another Terminal process

Please note: Bluetooth connectivity with Python seems to be quite buggy on Mac throughout the implementation process. I have not been able to identify the root cause nor find a complete fail-safe solution. In the mean time, a single variable `self.macAddress` in `MoodVizBit.py` may need to be changed in order to connect to the board. This may be `"/dev/tty.bitalino-DevB"` or `"98:d3:31:30:28:81"`. Mood Visualiser is able to work without the sensor integration, just don't run the `python MoodVizBit.py` command.

----------

Created by **Anand Subramaniam**

Lead & Supervised by **Mathieu Barthet**

*Centre for Digital Music,* **Queen Mary University of London**
