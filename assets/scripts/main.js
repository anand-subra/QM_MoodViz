// Import visualisation controller and particle generator script
$.getScript("../assets/scripts/vizController.js");
$.getScript("../assets/scripts/confetti.js");

// Variables for p5.Main and visualisation controls
var centerX = $(window).width()/2,
centerY = $(window).height()/2,
radius,
angle = 0,
speed,
x, y, sizePath,
windowHeight = $(window).height(),
windowWidth = $(window).width(),
ampRadius,
c,
vertices,
emitter,
burst = 0,
confettiSwitch,
EDAvalue = 1,
sensorValue;

// Variables for p5.Sound processes
var mySound, amplitude, beat, bass, lowmid, mid, highmid, treble, level;


// Callback for sound object - after track loading is complete, get rid of loading div
var loadingOverlay = function(){
  window.setTimeout(200);
  $(".loading").hide();
};

function preload(){
  mySound = loadSound('../assets/audio/'+ song + '.mp3', loadingOverlay);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100); // Set colour mode to hue-saturation-brightness-(alpha) and value upperbounds

  // Set some p5.Sound variables
  mySound.setVolume(1.0);
  fft = new p5.FFT();
  beat = new p5.PeakDetect(); // Beat detection
  smooth();
  amplitude = new p5.Amplitude(); // Retrieve amplitude

  // Set some sketch/visualisation variabls
  frameRate(fr); // Set sketch frame rate based on input
  c = changeColour(type, EDAvalue); // Set a colour
  vertices = 20;
  speed = 0.1;
  emitter = new ConfettiEmitter(createVector(windowWidth/2, windowHeight/2));
}

function draw() {
  // Add semi-transparent rectangle on every run of draw, creates fading visuals effect
  noStroke();
  fill(0, 0, 0, 8);
  rect(0, 0, windowWidth, windowHeight);


  // Get amplitude and map to radius variable - higher amplitude = larger Lissajous curve path radius
  level = amplitude.getLevel();
  ampRadius = map(level, 0, 1, 0, 300);
  radius = ampRadius * 3; // Scale up Lissajous curve path radius


  // Lissajous algorithm implementation
  fill(c);
  x = centerX + cos(angle)*radius; // Set frequency on x-axis
  y = centerY + sin(angle)*radius; // Set frequency on y-axis
  noStroke();
  ellipse(x, y, ampRadius, ampRadius); // Larger circles with higher amplitude - (high amplitude = large circles + wider spread of circles)
  angle += speed;


  var spectrum = fft.analyze();
  beat.update(fft);
  emitter.run();
  // If beat is detected, change the global colour value
  if (beat.isDetected) {
    c = changeColour(type, EDAvalue);
    // If confetti is enabled in settings/debug panel and if radius is over threshold (250, relatively-high volume), trigger confetti burst
    if(confettiSwitch == "ON" && radius > 250){
      burst = 1;
      burstConfetti();
    }
  }

  // Get a round-down value for the energy in each of the main frequency bands
  bass = floor(fft.getEnergy("bass"));
  lowmid = floor(fft.getEnergy("lowMid"));
  mid = floor(fft.getEnergy("mid"));
  highmid = floor(fft.getEnergy("highMid"));
  treble = floor(fft.getEnergy("treble"));

  // Calculate average energy across the bands
  var avrgFreqEnergy = (bass + lowmid + mid + highmid + treble)/5;
  var spikes = map(avrgFreqEnergy, 0, 255, 0, vertices); // Map energy value against geometry complexity variable (vertices)

  // Set visual characteristics, colour to match rest of visual elements
  noFill();
  stroke(c);
  strokeWeight(1);
  push();
  translate(width*0.5, height*0.5);
  rotate(frameCount/60.0); // Rotate geometry
  geometry(0, 0, (ampRadius/4)+10, ampRadius-5, spikes); // Create instance of geometry object, scale radiuses according to amplitude
  pop();

}//end of draw



function keyPressed() {
  // Pause-play functionality
  if (keyCode == RETURN && mySound.isPlaying())
  {
    noLoop();
    mySound.pause();
  }
  else if ((keyCode == RETURN && !mySound.isPaused()) || (keyCode == ENTER && !mySound.isPlaying()) )
  {
    loop();
    mySound.play();
  }

  // Stop functionality
  if (keyCode == ESCAPE)
  {
    if(mySound.isPaused())
    {
      mySound.play();
      mySound.stop();
    }

    else if(mySound.isPlaying())
    {
      mySound.stop();
    }
  }
  return false;
}


// Create geometry based on variables
function geometry(x, y, radius1, radius2, points) {
  var angle = TWO_PI / points;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


// Trigger confetti burst
function burstConfetti(){
  while(burst==1){
    for(var i = 0; i<30; i++){
      emitter.addConfetti();
    }
    burst = 0;
  }
}


function changeSong(track){

  if(mySound.isPaused())
  {
    mySound.play();
    mySound.stop();
  }

  else if(mySound.isPlaying())
  {
    mySound.stop();
  }
  $(".loading").show();
  preload();
}

// Switch colour based on scheme/theme, use EDA sensor value (0-1) as a multiplication factor to control saturation and brightness of viz (or energy of visualisation)
function changeColour(set, sensorValue){
  var c;
  switch(set){
    case "IceBlue":
    c = color(random(170,210), random(80,95)*sensorValue, random(60,70)*sensorValue, 90);
    break;
    case "Multi":
    c = color(random(1,360), random(70,95)*sensorValue, random(80,100)*sensorValue, 90);
    break;
    case "Pinks":
    c = color(random(300,350), random(70,95)*sensorValue, random(75,100)*sensorValue, 90);
    break;
    case "HotFireMixTape":
    c = color(random(1,60), random(90,100)*sensorValue, random(80,100)*sensorValue, 90);
    break;
  }
  return c;
}


// Dynamically set frame rate based on control/debug settings
function setFrameRate(fps){
  frameRate(fps);
}


// Dynamically set geometry complexity based on control/debug settings
function setGeomComplexity(vert){
  vertices = vert;
}


// Dynamically set Lissajous curve path speed based on control/debug settings
function setCycleSpeed(cspeed){
  speed = cspeed;
}


// Dynamically switch confetti overlay on/off based on control/debug settings
function coffettiSwitch(cSwitch){
  confettiSwitch = cSwitch;
}
