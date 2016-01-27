import bitalino



#/dev/tty.bitalino-DevB
#macAddress = "98:D3:31:30:28:81"
print "Looking for a device..."
print bitalino.find()




macAddress = "/dev/tty.bitalino-DevB"
batteryThreshold = 30
acqChannels = [0,3]
samplingRate = 1000
nSamples = 10
digitalOutput = [0,0,1,1]

print "Connecting..."
bitBoard = bitalino.BITalino(macAddress)
print "Connection complete"
print bitBoard.version()
print "This is the version boys!"

bitBoard.start(samplingRate, acqChannels)

print bitBoard.read(nSamples)

# Turn BITalino led on
bitBoard.trigger(digitalOutput)
