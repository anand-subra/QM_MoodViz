//Import visualisation controller and particle generator script
$.getScript("vizController.js");
$.getScript("confetti.js");

//Variables for p5.Main and lissajous processes
var centerX = $(window).width()/2,
centerY = $(window).height()/2,
radius,
angle = 0,
speed,
x, y, sizePath,
windowHeight = $(window).height(),
windowWidth = $(window).width(), c, vertices, emitter, burst = 0, confettiSwitch, EDAvalue;

//Variables for p5.Sound processes
var mySound, amplitude, beat, ellipseWidth;

function preload(){
  mySound = loadSound('assets/audio/GetHyperDroideka.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  amplitude = new p5.Amplitude();
  textAlign(CENTER);
  frameRate(fr);
  mySound.setVolume(1.0);
  fft = new p5.FFT();
  beat = new p5.PeakDetect();
  smooth();
  c = colourS(type);
  vertices = 40;
  speed = 0.1;
  accountForEDA(EDAvalue);
  emitter = new ConfettiEmitter(createVector(windowWidth/2, windowHeight/2));
}


function draw() {
  //Add semi-transparent rectangle on every run of draw, creates fading effect
  noStroke();
  fill(0, 0, 0, 8);
  rect(0, 0, windowWidth, windowHeight);


  accountForEDA(EDAvalue);

  //get amplitude and map to ellipse radius variable
  var level = amplitude.getLevel();
  sizePath = map(level, 0, 1, 0, 300);
  radius = sizePath * 3;

  //lissajous drawing
  //fill(255, 75, 75, 150); the nice red colour
  fill(c);
  x = centerX + cos(angle)*radius;
  y = centerY + sin(angle)*radius;
  noStroke();
  newRadius = sizePath * sin(frameCount * 0.05); //
  ellipse(x, y, newRadius, newRadius);
  angle += speed;


  var spectrum = fft.analyze();
  beat.update(fft);
  emitter.run();
  //if beat is detected, randomly change the color of the ellipses
  if (beat.isDetected) {
    c = colourS(type);
    if(confettiSwitch == "ON" && radius > 250){
      burst = 1;
      burstConfetti();
    }
  }

  var bass = floor(fft.getEnergy("bass"));
  var lowmid = floor(fft.getEnergy("lowMid"));
  var mid = floor(fft.getEnergy("mid"));
  var highmid = floor(fft.getEnergy("highMid"));
  var treble = floor(fft.getEnergy("treble"));

  var avrgFreqEngery = (bass + lowmid + mid + highmid + treble)/5;
  var spikes = map(avrgFreqEngery, 0, 255, 0, vertices);

  noFill();
  stroke(c);
  strokeWeight(1);

  push();
  translate(width*0.5, height*0.5);
  rotate(frameCount / 120.0);
  star(0, 0, (newRadius/4)+10, newRadius-5, spikes);
  pop();

  //document.getElementById("audio-data").innerHTML = "radius:" + radius;
}//end of draw


function burstConfetti(){
  while(burst==1){
    for(var i = 0; i<30; i++){
      emitter.addConfetti();
    }
    burst = 0;
  }
}


function accountForEDA(value){

  if (value == 0 || value == null){
      value = 1;
    }

}


function colourS(set){
  var c;
  switch(set){
    case "IceBlue":
    c = color(random(170,210), random(80,95)*EDAvalue, random(60,70)*EDAvalue, 90);
    break;
    case "Multi":
    c = color(random(1,360), random(70,95)*EDAvalue, random(80,100)*EDAvalue, 90);
    break;
    case "Pinks":
    c = color(random(300,350), random(70,95)*EDAvalue, random(75,100)*EDAvalue, 90);
    break;
    case "HotFireMixTape":
    c = color(random(1,60), random(90,100)*EDAvalue, random(80,100)*EDAvalue, 90);
    break;
  }
  return c;
}


function setFrameRate(fps){
  frameRate(fps);
}

function setGeomComplexity(vert){
  vertices = vert;
}

function setCycleSpeed(cspeed){
  speed = cspeed;
}

function coffettiSwitch(cSwitch){
  confettiSwitch = cSwitch;
}


function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
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

function keyPressed() {
  //pause-play functionality
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

  //stop functionality
  if (keyCode == ESCAPE)
  {
    if(mySound.isPlaying())
    {
      mySound.stop();
    }
  }

  // //seek functionality +/- 15secs
  // if (keyCode == RIGHT_ARROW)
  // {
  //   mySound.jump(songNow+5);
  // }
  // if (keyCode == LEFT_ARROW)
  // {
  //   mySound.jump(songNow-5);
  // }

  return false;

}
